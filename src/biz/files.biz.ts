import config from 'config';
import { map } from "lodash";
import { v1 as uuidV1 } from "uuid";
import S3Proxy from "../proxy/s3.proxy";

import MediaFileEntityValidator from "../validators/entities/mediaFile.entity.validator";
import { getFileExtension } from "../utils/helper.utility";
import TransformerBiz from "./helpers/transformer.biz";
import { MEDIA_FILES_MYSQL_SCHEMA, VIRTUAL_EVENT_MEDIA_FILES_MYSQL_SCHEMA, VIRTUAL_EVENT_MEDIA_FILES_RESPONSE_SCHEMA } from "../constants/template";
import QueryBuilderBiz from "./helpers/query-builder.biz";
import SqlBiz from "./helpers/sql.biz";
import _ from  'lodash';

class MediaFileBiz {

    private mediaFileEntityValidator: MediaFileEntityValidator;
    private transformer: TransformerBiz;

    private sql: SqlBiz;

    constructor() {
        this.mediaFileEntityValidator = new MediaFileEntityValidator();
        this.transformer = new TransformerBiz()
        this.sql = new SqlBiz();
    }

    upload(payload: any = {}, fileDetails: any): object {
        return new Promise(async (resolve, reject) => {
            try {
                let { eventCode } = payload;
                let files = map(fileDetails, 'file');
                await this.mediaFileEntityValidator.validateCode(eventCode);

                let filePromise = [];
                for (let index = 0; index < files.length; index++) {
                    filePromise.push(this.uploadOnS3(files[index], eventCode))
                }

                let uploadedFileDetails: Array<any> = await Promise.all(filePromise);

                let query = [];
                for (let index = 0; index < uploadedFileDetails.length; index++) {
                    let element = uploadedFileDetails[index];
                    query.push(this.storeMediaFileDetails({ ...payload, ...element, type: fileDetails[index].type }));
                }

                let insertedPayload: Array<any> = await Promise.all(query);

                let virtualEventMedia = []
                for (let index: any = 0; index < insertedPayload.length; index++) {
                    let element = insertedPayload[index];
                    virtualEventMedia.push(this.storeVirtualMediaFileDetails({ ...payload, ...element }));
                }

                let mediaUploaded = await Promise.all(virtualEventMedia);
                console.log('mediaUploaded', mediaUploaded);

                // TODO return uploaded cdn
                const MEDIA_URL = config.get('MEDIA_CDN');
                const getUploadedFilePath: any = _.chain(mediaUploaded).find({type: 'frames'}).value();
                let response = await this.transformer.transform({ url: MEDIA_URL, ...getUploadedFilePath }, VIRTUAL_EVENT_MEDIA_FILES_RESPONSE_SCHEMA.RESPONSE)
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async uploadOnS3(file: any, prefix: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let {
                    name,
                    mimetype,
                    data: imageBuffer
                } = file;
                const s3Proxy = new S3Proxy();
                const extension = getFileExtension(name);
                let filename = `${prefix}/${uuidV1()}_${String(Date.now())}`;
                let s3Path = `${filename}${extension}`;
                await s3Proxy.putImageObject(s3Path, imageBuffer, mimetype);
                let payload = {
                    orginalFileName: name,
                    tempName: filename,
                    s3Path: s3Path,
                    ext: extension,
                    mimetype
                };
                resolve(payload);
            } catch (error) {
                console.log('error', error);
                reject(error);
            }
        });
    }
    async storeMediaFileDetails(payload: any) {
        return new Promise(async (resolve, reject) => {
            try {
                // inserting data in media table
                let query = await this.transformer.transform(payload, MEDIA_FILES_MYSQL_SCHEMA.QUERY);
                const mediaFileBuilder = new QueryBuilderBiz(MEDIA_FILES_MYSQL_SCHEMA.TABLE_NAME);
                let mediaFileQuery = await mediaFileBuilder.insert(query);

                // adding inserted media file id to virtual event payload
                let insertedMediaFileResponse: any = await this.sql.insert(mediaFileQuery, []);
                payload['mediaFileId'] = insertedMediaFileResponse.insertId;

                resolve(payload);
            } catch (error) {
                reject(error);
            }
        });
    }

    async storeVirtualMediaFileDetails(payload: any) {
        return new Promise(async (resolve, reject) => {
            try {
                // inserting data in virtual event table
                let virtualEventquery = await this.transformer.transform(payload, VIRTUAL_EVENT_MEDIA_FILES_MYSQL_SCHEMA.QUERY);
                const queryVirtualEventMedia = new QueryBuilderBiz(VIRTUAL_EVENT_MEDIA_FILES_MYSQL_SCHEMA.TABLE_NAME);
                let virtualMediaFileQuery = await queryVirtualEventMedia.insert(virtualEventquery);
                // console.log('payload media virtualMediaFileQuery', JSON.stringify(virtualMediaFileQuery, null, 2));
                await this.sql.insert(virtualMediaFileQuery, []);

                resolve(payload);
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default MediaFileBiz;

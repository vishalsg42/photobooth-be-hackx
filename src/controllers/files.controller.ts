import { NextFunction, Router, Request } from "express";
import { MissingParamException } from "../exceptions";
import CONSTANTS from '../constants/appConstants';
import MediaFile from "../biz/files.biz";
import RequestValidator from "../validators/request.validator";
import ResponseDecorator from "../validators/response.decorator";

import { uploadFileSchema } from "../schema/schema-suit";
import MediaFileEntityValidator from '../validators/entities/mediaFile.entity.validator'

class MediaFileController {

    register(app: Router) {

        app.route('/v1/:eventCode/files')
            .post(async (request: Request, response: any, next: NextFunction) => {
                try {

                    // validating payload
                    let {
                        eventCode
                    } = request.params;

                    if (!eventCode) {
                        throw new MissingParamException('event_code');
                    }

                    // new Schema
                    new RequestValidator(uploadFileSchema).create({ ...request.params, ...request.body, ...request.files });

                    let {
                        mainImage,
                        framedImage,
                    } = request.files;

                    let {
                        frameId,
                        clientCode
                    } = request.body;
                    const contentType = request.headers['content-type'];

                    const mediaFileEntityValidator = new MediaFileEntityValidator();
                    await Promise.all([
                        mediaFileEntityValidator.validateFile(mainImage, contentType),
                        mediaFileEntityValidator.validateFile(framedImage, contentType)
                    ]);

                    const mediaFileBiz = new MediaFile();
                    const _result = await mediaFileBiz.upload({ eventCode, clientCode, frameId }, [
                        { file: mainImage, type: 'original' },
                        { file: framedImage, type: 'frames' }
                    ]);

                    // const body = request.body;
                    const responseDecorator = new ResponseDecorator({ ...request.params, ...request.query });
                    const result = responseDecorator.decorate(_result);

                    response.json({
                        result,
                        // @ts-ignore
                    }, 'File uploaded successfully', {
                        services: [
                            CONSTANTS.LOGGING
                        ],
                        data: {
                            action: CONSTANTS.ACTION.MEDIA_FILE_UPLOADS,
                            headers: { ...request.headers },
                            request: { ...request.params, ...request.files },
                            // response: result
                        }
                    });
                } catch (error) {
                    next(error);
                }
            })
    }
}

export default MediaFileController;

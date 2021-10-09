import { isMimeTypeValid } from "../../utils/helper.utility";
import { InvalidParamException, MissingParamException, InvalidFileException } from "../../exceptions";
import MediaFilesRepositories from '../../repositories/mediafiles.repositories';

class MediaFileEntityValidator {
    public repo: MediaFilesRepositories;
    constructor() {
        this.repo = new MediaFilesRepositories();
    }
    validateCode(code: string) {
        return new Promise(async (reject, resolve) => {
            try {
                const count = await this.repo.fetchEventCode(code);
                if (count < 1) {
                    throw new InvalidParamException('event_code');
                }
                resolve(true)
            } catch (error) {
                reject(error);
            }

        })
    }

    validateFile(files: any, contentType: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            try {
                let file = null;
                if (contentType.indexOf('multipart/form-data') > -1) {
                    if (!files) {
                        throw new MissingParamException('file');
                    }

                    file = files;
                    const fileMimeType = files.mimetype;
                    if (!isMimeTypeValid(fileMimeType)) {
                        throw new InvalidFileException(file.name);
                    }
                }

                if (contentType === 'application/json') {
                    file = {
                        name: files.name,
                        data: Buffer.from(files.data, 'base64'),
                    };
                }

                if (!file) {
                    throw new MissingParamException('file');
                }

                resolve(true);
            } catch (error) {
                reject(error);
            }
        });

        // const fileName = `${typeString}_${loanCode}_${String(Date.now())}`;
        // const s3FileName = uploadedDocument.s3_path.split('/').slice(-1).pop();


    }
}

export default MediaFileEntityValidator;

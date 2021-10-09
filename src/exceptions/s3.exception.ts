import BaseException from "./base.exception";
class S3Exception extends BaseException {
    constructor(param: string) {
        super(`Bad S3 Request: Missing/Invalid request ${param} `, 'PARAM_ERROR', 401);
    }
}
export default S3Exception;
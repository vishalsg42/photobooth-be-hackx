import BaseException from "./base.exception";

class InvalidParamException extends BaseException {
    constructor(param: string) {
        super(`Bad request: Invalid param ${param} `, 'PARAM_ERROR', 400);
    }
}
export default InvalidParamException;
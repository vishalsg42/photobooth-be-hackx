import BaseException from "./base.exception";
export default class MethodNotImplemented extends BaseException {

    error: string;

    constructor(message: string) {
        super(message, "MTHD_NOT_IMPLEMENTED_ERR");
        this.error = message;
    }
}
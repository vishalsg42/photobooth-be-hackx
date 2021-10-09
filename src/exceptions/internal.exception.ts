import BaseException from "./base.exception";

export class InternalError extends BaseException {
    error: string;
    strackTrace: any;
    constructor(message: string, strackTrace: any) {
        super(message, 'INTERNAL_SERVER_ERR');
        this.strackTrace = strackTrace;
        this.error = message;

    }
}
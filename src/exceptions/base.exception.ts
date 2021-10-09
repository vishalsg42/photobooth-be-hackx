class BaseException extends Error {
    code: string;
    status: number;
    constructor(message: string, code = 'ERROR', status = 500) {
        if (!message) {
            message = 'Oops!!! Something went wrong';
        }
        super(message);
        this.status = status;
        this.code = code;
    }
}

export default BaseException;
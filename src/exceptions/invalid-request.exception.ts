import BaseException from "./base.exception";
class InvalidRequestException extends BaseException {
	constructor(param: string) {
		super(`Bad request: Invalid request ${param}`, 'PARAM_ERROR', 400);
	}
}
export default InvalidRequestException;
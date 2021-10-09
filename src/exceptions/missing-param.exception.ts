import BaseException from "./base.exception";
class MissingParamException extends BaseException {
	constructor(param: string) {
		super(`Bad query parameter: Missing/Invalid param ${param}`, 'MISSING_PARAM', 400);
	}
}
export default MissingParamException;
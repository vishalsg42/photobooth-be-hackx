import BaseException from "./base.exception";
class NotFoundException extends BaseException {
	constructor(param: string) {
		super(`Not Found resource for ${param}`, 'NOT_FOUND', 404);
	}
}
export default NotFoundException;
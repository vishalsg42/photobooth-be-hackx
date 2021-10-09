import { BaseException } from '.';

class MongoException extends BaseException {
	constructor(param: string) {
		super(`Bad request: ${param}`, 'PARAM_ERROR', 500);
	}
}
export default MongoException;
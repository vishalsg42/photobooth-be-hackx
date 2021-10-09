import BaseException from './base.exception';
class InvalidFileException extends BaseException {
	constructor(param: string) {
		super(`Bad request: Invalid file ${param}, File should be an image or a pdf `, 'FILE_ERROR', 400);
	}
}

export default InvalidFileException;
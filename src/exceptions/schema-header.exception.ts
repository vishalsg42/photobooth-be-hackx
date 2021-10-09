import BaseException from "./base.exception";

class SchemaHeaderException extends BaseException {
	fields: any;
	constructor(errors: any) {
		super('Bad Header Request', 'AUTH_ERROR', 400);
		this.fields = errors.details.map((error: any) => ({
			description: error.message,
		}));
	}
}

export default SchemaHeaderException;
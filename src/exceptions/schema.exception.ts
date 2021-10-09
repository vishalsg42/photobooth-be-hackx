import BaseException from "./base.exception";
class SchemaException extends BaseException {
	fields: any;
	constructor(errors: any) {
		super('Bad Schema', 'SCHEMA_ERROR', 400);
		this.fields = errors.details.map((error: any) => ({
			description: error.message,
		}));
	}
}
export default SchemaException;
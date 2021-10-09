import httpContext from 'express-http-context';
import BaseValidator from './base.validator';

class RequestValidator extends BaseValidator {
	schema: any;
	constructor(schema: any) {
		super();
		this.schema = schema;
	}
	create(data: any) {
		try {
			// super.prepareValidationErrorObj(schemaValidator.validate(data, this.schema));
			super.prepareValidationErrorObj(this.schema.validate(data, { abortEarly: false }));

			//GET SCHEMA DATA
			let SCHEMA_DATA = httpContext.get('SCHEMA_DATA') || {};
			Object.assign(SCHEMA_DATA, { ...data });
			//SCHEMA DATA STORE IN SESSION
			httpContext.set('SCHEMA_DATA', SCHEMA_DATA);
		} catch (error) {
			throw error;
		}
	}
}

export default RequestValidator;

import SchemaHeaderException from '../exceptions/schema-header.exception';
class BaseHeaderValidator {
    prepareValidationErrorObj(validatorResult: any) {
        try {

            if (validatorResult.error) {
                throw new SchemaHeaderException(validatorResult.error);
            }

        } catch (error) {
            throw error;
        }
    }
}
export default BaseHeaderValidator;

import { SchemaException } from '../exceptions';
class BaseValidator {
    prepareValidationErrorObj(validatorResult: any) {
        try {

            if (validatorResult.error) {
                throw new SchemaException(validatorResult.error);
            }

        } catch (error) {
            throw error;
        }
    }
}

export default BaseValidator;
const keysInObject = require('keys-in-object');
// const { SEARCH_LIST  } = require('../constants/appConstants');
import APP_CONSTANTS from '../constants/appConstants';
import { save as requestResponseLoggerSave } from '../models/mongo/request-response.logger';
import { save as serviceCallLoggerSave } from '../models/mongo/service-call.logger'
class MongoLogger {

    async log_service_call(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                serviceCallLoggerSave(data);
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async log_request_response(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                requestResponseLoggerSave(data);
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    search_key(data: any) {
        let identifier = null;
        try {
            let SEARCH = APP_CONSTANTS.SEARCH_LIST;
            for (let id in SEARCH) {
                let found = keysInObject(data, SEARCH[id]);
                identifier = found && (found[0]) ? found[0] : null;
                if (identifier) break;
            }
        } catch (err) {
            identifier = null;
        }
        return identifier;
    }
}

export default MongoLogger;
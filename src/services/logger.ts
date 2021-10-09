import httpContext from 'express-http-context';
import BOILERPLATE_CONFIG from "../constants/boilerplate.config";
import MongoLogger from './mongo.logger';

interface ILogData {
    uuid: any,
    event: any,
    identifier?: string

    level: string,
    statusCode: any,
    applicationName: string,
    methodName: string,
    data: any
}
class Logger extends MongoLogger {
    constructor() {
        super();
    }
    async error(data: any, statusCode: number = 500, methodName: string = "") {
        return new Promise(async (resolve, reject) => {
            try {

                let uuid = httpContext.get('uuid');
                let event = httpContext.get('event');
                let syslogs = httpContext.get('syslogs');

                switch (statusCode) {
                    case 200:
                        data.LEVEL = 'INFO';
                        break;
                    case 400:
                        data.LEVEL = 'WARNING';
                        break;
                    default:
                        data.LEVEL = 'ERROR';
                }

                const log_data: ILogData = {
                    uuid: uuid,
                    event: event,
                    level: data.LEVEL,
                    statusCode: data.code || statusCode,
                    applicationName: BOILERPLATE_CONFIG.APPLICATION_NAME,
                    methodName: methodName,
                    data: data
                }

                let identifier = super.search_key(data);
                const log_data_mongo = {
                    uuid: uuid,
                    event: event,
                    headers: data.headers,
                    request: data.request_data,
                    response: data.errorObj,
                    syslogs: syslogs,
                    action: "ERROR",
                }
                log_data['identifier'] = identifier;
                // this.error(log_data); //winston logging
                await super.log_request_response(log_data_mongo);
                resolve(true);

            } catch (error) {
                reject(error);
            }
        })

    }

    async request(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                //searching a key for identifier list in constant
                let identifier = super.search_key(data);

                //write a request response logger
                let uuid = httpContext.get('uuid');
                let event = httpContext.get('event');
                let syslogs = httpContext.get('syslogs');

                //logging
                const log_data = {
                    uuid: uuid,
                    event: event,
                    identifier: identifier,
                    headers: data.headers,
                    request: data.request,
                    response: data.response,
                    syslogs: syslogs,
                    action: data.action
                }
                await super.log_request_response(log_data);
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async service_calls(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                //searching a key for identifier list in constant
                let identifier = super.search_key(data);
                let uuid = httpContext.get('uuid');
                let event = httpContext.get('event');
                var log_data: any = { uuid, event, identifier };

                //logging
                for (var key in data) {
                    log_data[key] = data[key];
                }
                await super.log_service_call(log_data);
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}

export default Logger;
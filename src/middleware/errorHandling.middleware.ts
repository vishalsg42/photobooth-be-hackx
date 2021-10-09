import config from 'config';
import { Request } from "../http/request";
import { Response } from "../http/response";
import { BaseException, SchemaHeaderException } from '../exceptions/';
import Logger from '../services/logger';

const env = config.get('env');
const logger = new Logger();

// const Logger = require('../services/winston.logging');

interface errorObj {
    message: string,
    code: string,
    stack: any,
    fields?: any

}
/**
 * 
 * @param error 
 * @param request Response
 * @param response 
 * @param next 
 */
export default async (error: any, request: Request, response: Response, next: Function) => {
    try {

        let message = error && error.message ? error.message : error;
        message = error && error.error && error.error.message ? error.error.message : message;
        message = error && error.error && error.error.error && error.error.error.message ? error.error.error.message : message;
        const errorObj: errorObj = {
            message: message ? message : 'Oops! something went wrong',
            code: 'ERROR',
            stack: error && error.stack && env === 'debug' || env === 'dev' ? error.stack : '',
        };

        let status = 500;

        if (error instanceof Error) {
			// status = error. .statusCode || status;
			errorObj.message = error.message;
		}

        if (error instanceof BaseException) {
            status = error.status || status;
            errorObj.message = error.message;
        }

        if (error instanceof SchemaHeaderException) {
            status = error.status;
            errorObj.message = error.message;
            errorObj.fields = error.fields ? error.fields : [];
            errorObj.code = error.code;
        }

        const request_data = { ...request.body, ...request.params, ...request.query };
        const headers = { ...request.headers };

        // Added logging while error handling
        logger.error({ request_data, errorObj, headers }, status)

        return response.status(status).send(errorObj);
        // return response.status(500).send({'errorObj': 'asd'});
    } catch (error) {
        console.log('error ==>', error);
        response.status(500).send({
            "code": "INTERNAL_SERVER_ERR",
            "message": error.message || "Internal Server Error",
        });
    }
};

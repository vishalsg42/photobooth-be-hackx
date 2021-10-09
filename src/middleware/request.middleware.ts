const pathToRegexp = require('path-to-regexp');
import { v4 as uuidv4 } from "uuid";
import httpContext from "express-http-context";

import APP_CONSTANTS from "../constants/appConstants";
import _ from 'lodash';
// import { reqHeader } from '../schema/schema-suit';
import { NextFunction, Request, Response } from "express";

const requestMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let {
            EVENT,
            HEADER_VALIDATOR_EXCEPTOR
        } = APP_CONSTANTS;
        httpContext.set('uuid', uuidv4());

        let event: string = "";
        let url = request.url.split("?") && request.url.split('?')[0];
        for (const reg in EVENT) {
            let regex = pathToRegexp(reg);
            // let regex = /asas/;
            if (regex.test(url)) {
                try {
                    event = EVENT[reg][request.method];
                    break;
                } catch (error) {
                    break;
                }
            }
        }
        httpContext.set('event', event);

        // if (!HEADER_VALIDATOR_EXCEPTOR.includes(event)) {
        //     new HeaderValidator(reqHeader).create({ ...request.headers });
        //     const clientCode = _.get(request.headers, 'client_code', null);
        //     httpContext.set('client_code', clientCode);
        // }

        next();

    } catch (error) {
        next(error);
    }
}

export default requestMiddleware;
import { NextFunction, Response, Request } from "express";
import httpContext from 'express-http-context';
import BOILERPLATE_CONFIG from '../constants/boilerplate.config';
import ServiceHandler from '../services/handler';

const responseMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	try {
		let { HEADER_RESPONSE_KEY } = BOILERPLATE_CONFIG;
		const oldJson = response.json;

		// @ts-ignore
		response.json = (data: any, message: any, services: any = null) => {
			let uuid = httpContext.get('uuid');
			let event = httpContext.get('event');
			let newResponseData = {};
			if (!data || (data.code && data.code.indexOf('ERROR') > -1)) {
				newResponseData = {
					success: false,
					uuid: uuid,
					event: event,
					error: data
				};
			} else {
				newResponseData = {
					success: true,
					event: event,
					message: message || '',
					uuid: uuid,
					data: data.result || ''
				};
			}

			response.json = oldJson;

			// services - to be used for async calls
			const serviceHandler = new ServiceHandler();
			serviceHandler.execute(services);

			//set response headers
			response.header(HEADER_RESPONSE_KEY, uuid);

			return oldJson.call(response, newResponseData);
		};
		next();
	} catch (error) {
		next(error);
	}
};

export default responseMiddleware;

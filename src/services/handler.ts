import APP_CONSTANTS from '../constants/appConstants';
import Logger from '../services/logger';
const logger = new Logger();

const fs = require('fs');
const path = require('path');

class ServiceHandler {
	execute(data: any) {
		if (data && data.services) {
			data.services.forEach((service:any) => {
				switch (service) {
					case APP_CONSTANTS.LOGGING:
						// Call and async fucntions without await to avoid blocking of API response and execute services
						const log = data && data.data;
						const result = {
							action: log.action,
							headers: log.headers,
							request: log.request,
							response: log.response
						}
						logger.request(result);
						break;
					case APP_CONSTANTS.EVENT_EMIT:
						// Call and async fucntions without await to avoid blocking of API response and execute services
						const event = data && data.data;
						let payload = {
							...event.request,
							// ...event.response
						}
						if(typeof event.response === 'string') {
							payload['response'] = event.response
						} else {
							payload = {
								...payload,
								...event.response
							}
						}
						// const eventEmitter = new EventEmitter();
						// eventEmitter.emit(payload);
						break;

					default:
						break;
				}
			});
		}
	}
}

export default ServiceHandler;
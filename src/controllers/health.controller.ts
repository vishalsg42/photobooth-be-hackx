import { NextFunction, Router, Request } from "express";
import CONSTANTS from '../constants/appConstants';
class HealthController {
    register(app: Router) {

        app.route('/health')
            .get(async (request: Request, response: any, next: NextFunction) => {
                try {
                    const result = {
                        health: true
                    };
                    response.json({
                        result,
                        // @ts-ignore
                    }, 'Application is running...', {
                        services: [
                            CONSTANTS.LOGGING,
                            CONSTANTS.EVENT_EMIT
                        ],
                        data: {
                            action: CONSTANTS.ACTION.CHECK_APPLICATION_HEALTH,
                            headers: { ...request.headers },
                            request: { ...request.params },
                            response: result
                        }
                    });
                } catch (error) {
                    next(error);
                }
            })
    }
}

export default HealthController;

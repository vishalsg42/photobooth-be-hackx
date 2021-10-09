import { NextFunction, Router, Request, Response } from "express";
import { MissingParamException } from "../exceptions";
import CONSTANTS from '../constants/appConstants';
import ResponseDecorator from "../validators/response.decorator";
import FramesBiz from "../biz/frames.biz";

class FramesController {

    register(app: Router) {

        app.route('/v1/:eventCode/frames')
            .get(async (request: Request, response: any, next: NextFunction) => {
                try {

                    // validating payload
                    let {
                        eventCode
                    } = request.params;

                    if (!eventCode) {
                        throw new MissingParamException('event_code');
                    }

                    const framesBiz = new FramesBiz();
                    const _result = await framesBiz.fetch({ ...request.params, ...request.query });

                    const responseDecorator = new ResponseDecorator({ ...request.params, ...request.query });
                    const result = responseDecorator.decorate(_result);

                    response.json({
                        result,
                        // @ts-ignore
                    }, 'Frames fetched successfully', {
                        services: [
                            CONSTANTS.LOGGING
                        ],
                        data: {
                            action: CONSTANTS.ACTION.CHECK_APPLICATION_HEALTH,
                            headers: { ...request.headers },
                            request: { ...request.params, ...request.files },
                            // response: result
                        }
                    });
                } catch (error) {
                    next(error);
                }
            })
    }
}

export default FramesController;

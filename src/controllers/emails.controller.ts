import { NextFunction, Router, Request } from "express";
import { MissingParamException } from "../exceptions";
import CONSTANTS from '../constants/appConstants';
import MailBiz from "../biz/mail.biz";
import RequestValidator from "../validators/request.validator";
import ResponseDecorator from "../validators/response.decorator";
import {  emailValidSchema } from "../schema/schema-suit";

class EmailFileController {

    register(app: Router) {

        app.route('/v1/:eventCode/emails')
            .post(async (request: Request, response: any, next: NextFunction) => {
                try {

                    // validating payload
                    let {
                        eventCode
                    } = request.params;

                    if (!eventCode) {
                        throw new MissingParamException('event_code');
                    }

                    // new Schema
                    new RequestValidator(emailValidSchema).create({ ...request.params, ...request.body });

                    const mailBiz = new MailBiz();
                    const _result = await mailBiz.sendMail({ ...request.params, ...request.body });

                    const responseDecorator = new ResponseDecorator({ ...request.params, ...request.query });
                    const result = responseDecorator.decorate(_result);

                    response.json({
                        result,
                        // @ts-ignore
                    }, 'Email sent successfully', {
                        services: [
                            CONSTANTS.LOGGING
                        ],
                        data: {
                            action: CONSTANTS.ACTION.EMAIL_HEALTH,
                            headers: { ...request.headers },
                            request: { ...request.params, ...request.files },
                        }
                    });
                } catch (error) {
                    next(error);
                }
            })

    }
}

export default EmailFileController;
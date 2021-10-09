import { EMAIL_OPTIONS } from "../constants/template";
import APP_CONSTANTS from "../constants/appConstants";
import SESProxy from "../proxy/ses.proxy";
import { SUBSCRIBED_EMAIL_TEMPLATE_BODY } from '../constants/template';
import Handlebars from 'handlebars';

class MailBiz {
    sendMail(payload: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const sesProxy = new SESProxy();
                let parsedTemplate = await Handlebars.compile(SUBSCRIBED_EMAIL_TEMPLATE_BODY)(payload);
                if(payload.url) {
                    payload.attachments = [
                        {
                            filename: 'splashbooth-selfie.png',
                            href: payload.url, // URL of document save in the cloud.
                            contentType: 'image/png'
                         }
                    ]
                }
                await sesProxy.sendMail({ ...payload, body: parsedTemplate, ...APP_CONSTANTS.SUBSCRIBED_EMAIL_TEMPLATE }, EMAIL_OPTIONS);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default MailBiz;
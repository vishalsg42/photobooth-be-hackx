import config from 'config';
import nodemailer from 'nodemailer';
import TransformerBiz from "../biz/helpers/transformer.biz";
const AWS = require('@aws-sdk/client-ses');

class SESProxy {
	/**
	 * This is the default constructor of this class.
	 */
	ses: AWS.SES;
	transporter: nodemailer.Transporter;
	private transformer: TransformerBiz;
	constructor(conf: any = config.get('aws.ses')) {
		this.ses = new AWS.SES(conf);
		this.transporter = nodemailer.createTransport({
			SES: { ses: this.ses, aws: AWS },
		})
		this.transformer = new TransformerBiz();
	}

	sendMail(data: any, options: any) {
		return new Promise(async (resolve, reject) => {
			let emailOptions = await this.transformer.transform(data, options);
			try {
				this.transporter.sendMail(emailOptions, (err: any, info: any) => {
					if (err) {
						reject(err);
					}
					resolve(info);
				});

			} catch (error) {
				console.log('error sending while email', error);
				reject(error)
			}
		})
	}

}

export default SESProxy;
import config from 'config';
import AWS from 'aws-sdk';

/**
 * This is the proxy class for retrieving the document and its metadata from S3.
 */
class S3Proxy {
	/**
	 * This is the default constructor of this class.
	 */
	s3: AWS.S3;
	bucket: string;
	signedUrlExpireSeconds: number;
	constructor(conf: any = config.get('aws.s3')) {
		this.s3 = new AWS.S3(conf);
		this.bucket = conf.bucket;
		this.signedUrlExpireSeconds = 60 * 5;
	}
	/**
	 * Dumps the file object in S3 bucket
	 * @param {string} key 
	 * @param {buffer} content 
	 */
	async putObject(key: string, content: any) {
		return new Promise((resolve, reject) => {
			this.s3.putObject({
				Bucket: this.bucket,
				Key: key,
				Body: content
			}, (error: any, data: any) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

	async putBase64Object(key: string, content: any, contentType: string = 'application/pdf') {
		return new Promise((resolve, reject) => {
			this.s3.putObject({
				Bucket: this.bucket,
				Key: key,
				Body: content,
				ContentEncoding: 'base64',
				ContentType: contentType
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

	async putImageObject(key: string, content: any, type: any) {
		return new Promise((resolve, reject) => {
			this.s3.putObject({
				Bucket: this.bucket,
				Key: key,
				Body: content,
				ContentEncoding: 'base64',
				ContentType: type.indexOf('image') > -1 ? type : `image/${type}`
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}
	/**
   * Retrieves document from S3 for the the supplied bucket and key
   * @param {string} bucket
   * @param {string} key
   */
	async getObject(key: string) {
		return new Promise((resolve, reject) => {
			this.s3.getObject({
				"Bucket": this.bucket,
				"Key": key
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

	/**
	 * gets the signed url for passed key
	 * @param {string} key 
	 */
	async getSignedUrl(key: string) {
		return new Promise((resolve, reject) => {
			this.s3.getSignedUrl('putObject', {
				Bucket: this.bucket,
				Key: key,
				Expires: this.signedUrlExpireSeconds,
				// ACL: 'bucket-owner-full-control',
				ContentType: 'application/pdf'
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

}

export default S3Proxy;
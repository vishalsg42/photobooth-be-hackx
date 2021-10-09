import mongoose from 'mongoose';
import BOILERPLATE_CONFIG from '../../constants/boilerplate.config';
import { MongoException } from '../../exceptions';
export const ServiceCallLogger = new mongoose.Schema({
    uuid: {
        type: String
    },
    event: {
        type: String
    },
    identifier: {
        type: String
    },
    action: {
        type: String
    },
    API: {
        type: String,
        default: null
    },
    service: {
        type: String,
        default: null
    },
    query_param: {
        type: JSON,
        default: null
    },
    request: {
        type: JSON,
        default: null
    },
    response: {
        type: JSON,
        default: null
    },
    raw_request: {
        type: JSON,
        default: null
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
const Model = mongoose.model(`${BOILERPLATE_CONFIG.SERVICE_CALL_LOGGER}`, ServiceCallLogger);

ServiceCallLogger.static.prototype.save = () => {}
export const save = (params: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!params) {
                throw new MongoException(`no paramaters passed to save in ${BOILERPLATE_CONFIG.SERVICE_CALL_LOGGER} model`);
            }
            Model.create(params, function (err: any, record: any) {
                if (err) {
                    return reject(err);
                }
                resolve(record);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
import mongoose from 'mongoose';
import { MongoException } from '../../exceptions';
import BOILERPLATE_CONFIG from '../../constants/boilerplate.config';

export const RequestResponseLogger = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
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
    headers: {
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
    syslogs: {
        type: JSON,
        default: null
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
const Model = mongoose.model(`${BOILERPLATE_CONFIG.REQUEST_RESPONSE_LOGGER}`, RequestResponseLogger);

export async function save(params: any) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!params) {
                throw new MongoException(`no paramaters passed to save in ${BOILERPLATE_CONFIG.REQUEST_RESPONSE_LOGGER} model`);
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
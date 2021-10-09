import  Joi from "joi";

export const uploadFileSchema = Joi.object({
    "mainImage": Joi.object().required(),
    "framedImage": Joi.object().required(),
    "frameId": Joi.string().required(),
    "clientCode": Joi.string().required(),
}).unknown()

export const emailValidSchema = Joi.object({
    "email": Joi.string().email().required().error(new Error('Inavlid email id')),
    "url": Joi.string().required().error(new Error('Inavlid email id'))
}).unknown()

import mongoose from 'mongoose';
import dbConfig from 'config';
import util from 'util';
import { BaseException } from '../exceptions';
// const { BaseException } = require('../exceptions/index');

function getDbCredentials() {
    let config: any = dbConfig.get('db.mongo');
    return {
        host: config.host,
        url: config.url,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
        port: config.port,
        options: config.options
    }
}

const mongoConnection = async function (done: any) {
    // const dbConnect = getDbCredentials();
    //const mongoooseUrl = dbConnect.url;
    const mongoooseUrl: string = dbConfig.get('db.mongo.url');
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    };
    try {
        await mongoose.connect(mongoooseUrl, options);
        done();
    }
    catch (error) {
        console.error('mongo error', error);
        throw new BaseException('Mongo Connection Exception occured');
    }
}

export default mongoConnection;
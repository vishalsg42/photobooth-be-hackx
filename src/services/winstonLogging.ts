const winston = require('winston');

const logger = () => {
    const logger = new (winston.createLogger)({
        transports: [
            new (winston.transports.File)({
                name: 'error-file',
                filename: 'storage/logs/Error.log'
            })
        ]
    });
    return logger;
};
export default logger;
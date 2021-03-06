import config from 'config';
type constants = {
    [key: string]: any
}

const app: constants = {
    APPLICATION_JSON: 'application/json',
    JSON: 'json',
    TEXT_XML: 'text/xml',
    FORM_DATA: 'multipart/form-data',
    X_WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
    LOGGING: 'LOGGING',
    EVENT_EMIT: 'EVENT_EMIT',
    DOC_DIRECTORY: 'storage/tmp',
    DOC_ZIP_DIRECTORY: 'storage/tmp/zip',
    DOCUMENT_SOURCE: 'LOS',
    REQUEST_ID_PREFIX: 'SERVICENAME',
    ENTITY_TYPE: ['T', 'RP', 'RC'],
    CURRENT_TIMESTAMP: 'CURRENT_TIMESTAMP',
    SHEET_NAME: 'SHEET_NAME',
    DEFAULT_DATE_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    CSV: 'CSV',
    EXCEL: 'XLSL',
    CSV_EXTENSION: '.csv',
    EXCEL_EXTENSION: '.xlsx',
    HEADER_VALIDATOR_EXCEPTOR: ['CHECK_APPLICATION_HEALTH', 'API_DOCUMENTATION'],
    SEARCH_LIST: ["client_code", "event_code", "clientCode", "eventCode", "health"],
    ACTION: {
        CHECK_APPLICATION_HEALTH: 'CHECK_APPLICATION_HEALTH',
        MEDIA_FILE_UPLOADS: 'MEDIA_FILE_UPLOADS',
        FETCH_FRAMES: 'FETCH_FRAMES',
        MAIL_SENT: 'MAIL_SENT'
    },
    EVENT: {
        '/': {
            GET: 'API_DOCUMENTATION'
        },
        '/health': {
            GET: 'CHECK_APPLICATION_HEALTH'
        },
        '/v1/:eventCode/files': {
            POST: 'MEDIA_FILE_UPLOADS'
        },
        '/v1/:eventCode/frames': {
            GET: 'FETCH_FRAMES'
        }
    },
    MEDIA_CDN_URL: 'https://media-asset-photobooth.s3.ap-south-1.amazonaws.com',
    SUBSCRIBED_EMAIL_TEMPLATE : {
        senderEmail: 'no-reply@splashbooth.com',
        subject: `Here's your selfie`,
    }
}
export default app;
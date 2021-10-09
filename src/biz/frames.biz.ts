import config from 'config';
import { FRAMES_MYSQL_SCHEMA } from "../constants/template";
import QueryBuilderBiz from "./helpers/query-builder.biz";
import SqlBiz from "./helpers/sql.biz";
import MediaFileEntityValidator from "../validators/entities/mediaFile.entity.validator";
import TransformerBiz from "./helpers/transformer.biz";
// const sqlQuery =  QUERY.sql.SELECT.MILESTONE_SCORECARD_MASTER;
import QUERY from "../constants/queryRepo";
import { API_FRAMES_RESPONSE } from "../constants/template";

class FramesBiz {
    private sql: SqlBiz;
    private mediaFileEntityValidator: MediaFileEntityValidator;
    private transformer: TransformerBiz;

    constructor() {
        this.sql = new SqlBiz();
        this.transformer = new TransformerBiz();
        this.mediaFileEntityValidator = new MediaFileEntityValidator();
    }

    fetch(payload: any = {}): object {
        return new Promise(async (resolve, reject) => {
            try {
                let { eventCode } = payload;
                await this.mediaFileEntityValidator.validateCode(eventCode);
                const sqlQuery = QUERY.sql.SELECT.FRAMES_QUERY;
                const sqlData = await this.sql.get_one({ ...payload }, sqlQuery);
                if (!Object.keys(sqlData).length) {
                    resolve([]);
                }
                const MEDIA_URL = config.get('MEDIA_CDN');
                const transformPayload = await this.transformer.transform({ url: MEDIA_URL, items: sqlData }, API_FRAMES_RESPONSE);
                resolve(transformPayload);
            } catch (error) {
                reject(error);
            }
        });
    }

}


export default FramesBiz;
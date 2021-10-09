const ST = require('stjs');
import utility_functions from '../utils/helper.utility';

class JsonTransformer {

    template: string;
    constructor(template: string) {
        this.template = template;
    }

    async transform(raw: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let parsed_message = {};
                parsed_message = ST.select(raw)
                    .inject(utility_functions)
                    .transformWith(JSON.parse(this.template))
                    .root();
                resolve(parsed_message);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default JsonTransformer;
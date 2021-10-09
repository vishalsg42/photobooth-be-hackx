import JsonTransformer from '../../services/jsonTransformer';
class TransformerBiz {
    transform(data: any, template: any):any {
        return new Promise(async (resolve, reject) => {
            try {
                //replace string values
                for (var key in data) {
                    template = template.replace(`{@${key}}`, data[key]);
                }
                //call raw parser call
                const transformed_message = await new JsonTransformer(template).transform(data);
                resolve(transformed_message);
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default TransformerBiz;

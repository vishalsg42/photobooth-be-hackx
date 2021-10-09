class ResponseDecorator {
    private request: any;
    constructor(request: any) {
        this.request = request;
    }
    decorate(data: any) {
        try {
            const result = data;
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default ResponseDecorator;
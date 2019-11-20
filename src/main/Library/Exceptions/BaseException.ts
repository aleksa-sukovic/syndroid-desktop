import Request, { RequestBuilder } from "../Router/Request";

export default class BaseException
{
    protected message: string;
    protected statusCode: number;
    protected request: Request;

    constructor (message: string, statusCode: number, request?: Request)
    {
        this.message    = message;
        this.statusCode = statusCode;
        this.request    = request;
    }

    public render()
    {
        let request: RequestBuilder = new RequestBuilder()
            .addParam('message', this.message)
            .addParam('statusCode', this.statusCode)
            .setType('response')
            .setStatus('exception');

        if (this.request) {
            request.addParam('id', this.request.getID());
        }

        return request.build().toString();
    }
}

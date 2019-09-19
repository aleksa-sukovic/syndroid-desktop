import Request from "../Router/Request";

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
        let output = '/exception?message=' + this.message + '&statusCode=' + this.statusCode;

        if (this.request && this.request.has('request_id')) {
            output = output + '&type=response&request_id=' + this.request.input('request_id');
        }

        return output;
    }

    public toArray()
    {
        return {
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}

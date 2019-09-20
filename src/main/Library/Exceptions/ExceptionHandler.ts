import BaseException from './BaseException';
import Request, { RequestBuilder } from "../Router/Request";

export default class ExceptionHandler
{
    public handle(exception: any): string
    {
        if (exception instanceof BaseException) {
            return this.handleCustomException(exception);
        } else {
            return this.handleSystemException(exception);
        }
    }

    public handleCustomException(exception: BaseException)
    {
        return exception.render();
    }

    public handleSystemException(exception: any)
    {
        let request: Request = new RequestBuilder()
            .setStatus('EXCEPTION')
            .addParam('message', exception.message)
            .setType('RESPONSE')
            .build();

        return request.toString();
    }
}

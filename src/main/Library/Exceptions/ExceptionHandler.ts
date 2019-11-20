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
        return new RequestBuilder()
            .addParam('message', exception.message)
            .setStatus('exception')
            .setType('response')
            .build()
            .toString();
    }
}

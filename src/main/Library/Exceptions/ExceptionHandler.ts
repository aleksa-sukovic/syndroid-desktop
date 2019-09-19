import BaseException from './BaseException';

export default class ExceptionHandler
{
    public handle(exception: any)
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
        console.log(exception);
        return '/exception?message=' + exception.message;
    }
}

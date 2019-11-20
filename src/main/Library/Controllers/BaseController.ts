import Request from "../Router/Request";
import BaseValidator from "../Validators/BaseValidator";
import HandlerNotFoundException from "../Exceptions/HandlerNotFoundException";

export default class BaseController
{
    protected validator: BaseValidator;

    public handle(request: Request): any
    {
        if (!this[request.getRoute().getHandler()]) {
            throw new HandlerNotFoundException(request.getRoute().getHandler());
        }

        this.validator.validate(request);

        return this[request.getRoute().getHandler()](request);
    }
}

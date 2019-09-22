import Request from "../Router/Request";
import BaseValidator from "../Validators/BaseValidator";

export default class BaseController
{
    protected validator: BaseValidator;

    public handle(request: Request): any
    {
        if (!this[request.getRoute().getHandler()]) {
            console.log('Handler not found!');
            return;
        }

        this.validator.validate(request);

        return this[request.getRoute().getHandler()](request);
    }
}

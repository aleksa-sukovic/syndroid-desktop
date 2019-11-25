import Request, { RequestBuilder } from "../Router/Request";
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

        if (this.validator) {
            this.validator.validate(request);
        }

        return this[request.getRoute().getHandler()](request);
    }

    protected respond(data: any, statusCode: number): string
    {
        let builder = new RequestBuilder()
            .setType('response')
            .setStatus(statusCode.toString());

        for (const key in data) {
            builder.addParam(key, data[key]);
        }

        return builder.build().toString();
    }
}

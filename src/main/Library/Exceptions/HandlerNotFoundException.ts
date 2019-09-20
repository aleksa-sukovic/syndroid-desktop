import BaseException from "./BaseException";

export default class HandlerNotFoundException extends BaseException
{
    constructor(handler: string)
    {
        super('Handler: \'' + handler + '\' not found.', 404);
    }
}

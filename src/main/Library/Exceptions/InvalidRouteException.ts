import BaseException from "./BaseException";

export default class InvalidRouteException extends BaseException
{
    constructor()
    {
        super('Invalid route.', 400);
    }
}

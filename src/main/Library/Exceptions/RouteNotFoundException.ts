import BaseException from "./BaseException";

export default class RouteNotFoundException extends BaseException
{
    constructor()
    {
        super('Route not found.', 404);
    }
}

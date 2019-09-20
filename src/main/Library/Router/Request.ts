import Route from "./Route/Route";
import RouteParser from "./Route/RouteParser";
import InvalidRouteException from "../Exceptions/InvalidRouteException";

export default class Request
{
    public status: string;
    public type: string;
    protected route: Route;

    public static createFromString(data: string): Request
    {
        if (!RouteParser.isValidPath(data)) {
            throw new InvalidRouteException();
        }

        return new Request(new Route(data));
    }

    public constructor(route: Route)
    {
        this.route = route;
    }

    public has(param: string): boolean
    {
        return param in this.route.getParams();
    }

    public input(param: string): any
    {
        return this.route.getParams().params[param];
    }

    public typeResponse(): boolean
    {
        return this.type === 'RESPONSE';
    }

    public typeRequest(): boolean
    {
        return this.type === 'REQUEST';
    }

    public addParam(key: string, value: any): void
    {
        this.route.addParam(key, value);
    }

    public getRoute(): Route
    {
        return this.route;
    }
}

export class RequestBuilder
{
    protected request: Request;

    public constructor()
    {
        this.request = new Request(new Route(''));
    }

    public setType(type: string): RequestBuilder
    {
        this.request.type = type;
        return this;
    }

    public setStatus(status: string): RequestBuilder
    {
        this.request.status = status;
        return this;
    }

    public addParam(key: string, value: any): RequestBuilder
    {
        this.request.addParam(key, value);
        return this;
    }

    public build(): Request
    {
        return this.request;
    }
}

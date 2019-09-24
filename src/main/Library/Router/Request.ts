import Route from "./Route/Route";

export default class Request
{
    protected route: Route;

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
        return this.route.getParams()[param];
    }

    public typeResponse(): boolean
    {
        return this.input('type') === 'response';
    }

    public typeRequest(): boolean
    {
        return this.input('type') === 'request';
    }

    public addParam(key: string, value: any): void
    {
        this.route.addParam(key, value);
    }

    public getRoute(): Route
    {
        return this.route;
    }

    public setRoute(route: Route): void
    {
        this.route = route;
    }

    public getID(): number
    {
        return this.input('id') || -1;
    }

    public setID(id: number): void
    {
        this.addParam('id', id);
    }

    public doesExpectResponse(): boolean
    {
        return this.input('expectsResponse') === 'yes';
    }

    public getParams(): any
    {
        return this.route.getParams();
    }

    public toString(): string
    {
        return this.route.toString();
    }
}

export class RequestBuilder
{
    protected static ID: number = 0;
    protected request: Request;

    public constructor()
    {
        this.request = new Request(new Route(''));
    }

    public setType(type: 'request' | 'response'): RequestBuilder
    {
        this.addParam('type', type);
        return this;
    }

    public setStatus(status: string): RequestBuilder
    {
        this.addParam('status', status);
        return this;
    }

    public expectResponse(): RequestBuilder
    {
        this.request.addParam('expectsResponse', 'yes');
        return this;
    }

    public addParam(key: string, value: any): RequestBuilder
    {
        this.request.addParam(key, value);
        return this;
    }

    public withID(id: number): RequestBuilder
    {
        this.request.setID(id);
        return this;
    }

    public autoincrement(): RequestBuilder
    {
        this.request.setID(++RequestBuilder.ID);
        return this;
    }

    public setRouteByPath(path: string): RequestBuilder
    {
        this.request.setRoute(new Route(path));
        return this;
    }

    public build(): Request
    {
        return this.request;
    }
}

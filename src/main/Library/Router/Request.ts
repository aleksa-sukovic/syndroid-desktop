import Route from "./Route/Route";

export default class Request
{
    protected static ID: number = 0;

    protected id: number;
    protected route: Route;
    public status: string;
    public type: string;
    public expectsResponse: string;

    public constructor(route: Route)
    {
        this.route = route;
        this.id = this.has('id') ? parseInt(this.input('id')) : ++Request.ID;
        this.type = this.input('type');
        this.status = this.input('status');
        this.expectsResponse = this.input('expectsResponse') === 'yes' ? '1' : '0';
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
        return this.type === 'response';
    }

    public typeRequest(): boolean
    {
        return this.type === 'request';
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
        return this.id;
    }

    public doesExpectResponse(): boolean
    {
        return this.expectsResponse === '1';
    }

    public getParams(): any
    {
        return this.route.getParams();
    }

    public toString(): string
    {
        return this.route.toString() + '&id=' + this.id + '&status=' + this.status + '&type=' + this.type + '&expectsResponse=' + (this.expectsResponse ? 1 : 0);
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

    public expectResponse(): RequestBuilder
    {
        this.request.expectsResponse = '1';
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

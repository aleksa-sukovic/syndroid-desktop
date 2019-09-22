import RouteParser from "./RouteParser";
import BaseController from "../../Controllers/BaseController";

export default class Route
{
    protected path: string;
    protected params: any;
    protected handler: string;
    protected controller: typeof BaseController;

    public constructor (path: string, controller?: typeof BaseController, handler?: string)
    {
        this.path = path.split('?')[0];
        this.handler = handler;
        this.controller = controller;
        this.params = RouteParser.parseParams(path);
    }

    public match(route: Route): boolean
    {
        return this.path === route.path;
    }

    public addParam(key: string, value: any): void
    {
        this.params[key] = value;
    }

    public getPath(): string
    {
        return this.path;
    }

    public getHandler(): string
    {
        return this.handler;
    }

    public getController(): typeof BaseController
    {
        return this.controller;
    }

    public getParams(): any
    {
        return this.params;
    }

    public toString(): string
    {
        let params = [];

        for (let key in this.params) {
            if (this.params.hasOwnProperty(key)) {
                params.push(key + '=' + this.params[key]);
            }
        }

        return this.path + '?' + params.join('&');
    }
}

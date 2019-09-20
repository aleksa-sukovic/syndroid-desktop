import Route from "./Route";

export default class RouteDefinition
{
    protected path: string;
    protected regEx: string;
    public controller: any;
    public handler: any;

    public constructor(path: string, controller: any, handler: any)
    {
        this.path = path;
        this.controller = controller;
        this.handler = handler;
        this.regEx = this.constructRegExPath(path);
    }

    public match(route: Route): boolean
    {
        return (new RegExp(this.regEx)).test(route.getPath());
    }

    public matchString(route: string): boolean
    {
        route = route.split('?')[0];

        return (new RegExp(this.regEx)).test(route);
    }

    public getPath(): string
    {
        return this.path;
    }

    protected constructRegExPath(path: string): string
    {
        path = path.split('?')[0];
        this.makeRegExPath(path);
        return '^' + this.regEx + '$';
    }

    protected makeRegExPath(path): string
    {
        let openParamBracket  = path.indexOf('{');
        let closeParamBracket = path.indexOf('}');

        if (openParamBracket == -1 || closeParamBracket == -1) {
            this.regEx += path;
            return;
        }

        this.regEx = path.substring(0, openParamBracket);
        this.regEx += '[a-zA-Z0-9_]+';

        this.makeRegExPath(path.substring(closeParamBracket + 1));
    }
}

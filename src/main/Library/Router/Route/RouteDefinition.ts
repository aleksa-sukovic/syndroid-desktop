import Route from "./Route";

export default class RouteDefinition
{
    protected definition: string;
    protected regEx: string;
    protected controller: any;
    protected handler: any;

    public constructor(definition: string, controller: any, handler: any)
    {
        this.definition = definition;
        this.controller = controller;
        this.handler = handler;
        this.regEx = this.constructRegExPath(definition);
    }

    public match(route: Route): boolean
    {
        return (new RegExp(this.regEx)).test(route.getPath());
    }

    public getPath(): string
    {
        return this.definition;
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

import RouteDefinition from "./RouteDefinition";
import BaseException from "../../Exceptions/BaseException";
import RouteParser from "./RouteParser";

export default class Route
{
    protected path: string;
    protected params: any;
    protected definition: RouteDefinition;

    public constructor (path: string, definition?: RouteDefinition)
    {
        this.path = path;
        if (definition) {
            this.setDefinition(definition);
        }
        this.params = RouteParser.parseParams(this);
    }

    public addParam = function (key: string, value: any): void
    {
        this.params[key] = value;
    }

    public setDefinition(definition: RouteDefinition): void
    {
        if (!definition.match(this)) {
            throw new BaseException('Provided definition could not be applied to specified route.', 500);
        }

        this.definition = definition;
    }

    public getDefinition(): RouteDefinition
    {
        return this.definition;
    }

    public getHandler(): string
    {
        return this.definition.handler;
    }

    public getPath(): string
    {
        return this.path;
    }

    public getParams(): any
    {
        return this.params;
    }
}

import RouteDefinition from "./RouteDefinition";
import BaseException from "../../Exceptions/BaseException";

export default class Route
{
    protected path: string;
    protected params: any;
    protected definition: RouteDefinition;

    public constructor (path: string, definition: RouteDefinition)
    {
        this.path = path;
        this.params = {};
        this.setDefinition(definition);
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

    public getPath(): string
    {
        return this.path;
    }

    public getParams(): any
    {
        return this.params;
    }
}

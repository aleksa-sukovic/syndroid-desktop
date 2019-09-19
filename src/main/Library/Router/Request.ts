import Route from "./Route/Route";

export default class Request
{
    protected route: Route;
    protected params: any;

    public constructor(route: Route)
    {
        this.route = route;
        this.params = route.getParams();
    }

    public has(param: string): boolean
    {
        return param in this.params;
    }

    public input(param: string): any
    {
        return this.params[param];
    }
}

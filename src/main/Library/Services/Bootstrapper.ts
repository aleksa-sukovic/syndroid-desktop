import Route from "../Router/Route/Route";
import ServiceProvider from "./ServiceProvider";

export interface Bootstrapped
{
    routes: Route[];
}

export default class Bootstrapper
{
    protected providers: ServiceProvider[];

    public constructor(providers: ServiceProvider[])
    {
        this.providers = providers;
    }

    public bootstrap(): Bootstrapped
    {
        return {
            routes: this.bootstrapRoutes(),
        };
    }

    protected bootstrapRoutes(): Route[]
    {
        let routes: Route[] = [];

        for (let provider of this.providers) {
            routes = routes.concat(provider.getRoutes());
        }

        return routes;
    }
}

import Application from "../../Application";
import Route from "../Router/Route/Route";
import ServiceProvider from "./ServiceProvider";

export default class Bootstrapper
{
    public bootstrap(): void
    {
        Application.setRoutes(this.bootstrapRoutes());
    }

    protected bootstrapRoutes(): Route[]
    {
        let routes: Route[] = [];
        let providers: ServiceProvider[] = Application.getProviders();

        for (let provider of providers) {
            routes = routes.concat(provider.getRoutes());
        }

        return routes;
    }
}

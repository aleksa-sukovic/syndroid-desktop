import Request from './Request';
import Route from "./Route/Route";

export default class Router
{
    protected routes: Route[];

    constructor(routes: Route[])
    {
        this.routes = routes;
    }

    public handleRequest(data: string): void
    {
        let request = Request.createFromString(data);

        if (request.typeResponse()) {
            // TODO handle response
            return;
        }

        if (request.typeRequest()) {
            let activeRoute = this.getActiveRoute(request);
            return;
        }
    }

    protected getActiveRoute(request: Request): Route
    {
        for (let availableRoute of this.routes) {
            if (availableRoute.getDefinition().match(request.getRoute())) {
                return new Route(request.getRoute().getPath(), availableRoute.getDefinition());
            }
        }
    }
}

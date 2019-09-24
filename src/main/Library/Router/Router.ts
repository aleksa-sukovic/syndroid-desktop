import Request from './Request';
import Route from "./Route/Route";
import RouteNotFoundException from "../Exceptions/RouteNotFoundException";
import EventHandler from "../Events/EventHandler";

export default class Router
{
    protected routes: Route[];

    constructor(routes: Route[])
    {
        this.routes = routes;
    }

    public handleRequest(data: string): any
    {
        let request = new Request(new Route(data));

        if (request.typeResponse()) {
            return this.handleTypeResponse(request);
        }

        if (request.typeRequest()) {
            return this.handleTypeRequest(request);
        }
    }

    protected handleTypeResponse(request: Request): any
    {
        EventHandler.notifyWindows('request:receive', request);
    }

    protected handleTypeRequest(request: Request): any
    {
        let foundRoute = this.findRoute(request.getRoute());
        if (!foundRoute) {
            throw new RouteNotFoundException();
        }

        request.setRoute(foundRoute);
        let controller = new (request.getRoute().getController())();
        let response = controller.handle(request);

        if (request.doesExpectResponse()) {
            return response;
        }
    }

    protected findRoute(route: Route): Route
    {
        for (let availableRoute of this.routes) {
            if (availableRoute.match(route)) {
                return new Route(route.toString(), availableRoute.getController(), availableRoute.getHandler());
            }
        }

        return null;
    }
}

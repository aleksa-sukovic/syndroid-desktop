import Request from './Request';
import Route from "./Route/Route";
import RouteNotFoundException from "../Exceptions/RouteNotFoundException";

export default class Router
{
    protected routes: Route[];
    protected responseListeners: { requestId: number, callback: (request: Request) => void }[] = [];

    constructor(routes: Route[])
    {
        this.routes = routes;
    }

    public sendRequest(request: Request, onResponse?: (request: Request) => void): any
    {
        if (request.doesExpectResponse() && onResponse) {
            this.responseListeners.push({ requestId: request.getID(), callback: onResponse });
        }

        return request;
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
        for (let i = 0; i < this.responseListeners.length; i++) {
            if (this.responseListeners[i].requestId === request.getID()) {
                this.responseListeners[i].callback(request);
                this.responseListeners.splice(i, 1);

                return;
            }
        }
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

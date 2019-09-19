import Route from "./Route";

export default class RouteParser
{
    public parseParams(route: Route)
    {
        let params = {};

        params = this.parseGetParams(route, params);
        params = this.parseEmbeddedParams(route, params);

        return params;
    }

    public parseGetParams(route: Route, output: any): any
    {
        let helper = route.getPath().split('?');
        if (helper.length < 2) {
            return;
        }
        helper = helper[1].split('&');

        for (let element of helper) {
            const data = element.split('=');

            if (data.length >= 2) {
                output[data[0]] = data[1];
            }
        }

        return output;
    }

    public parseEmbeddedParams(route: Route, output: any): any
    {
        let routePath   = route.getDefinition().getPath().split('/');
        let routeString = route.getPath().split('?')[0].split('/');

        for (let i = 0; i < routePath.length; i++) {
            if (!routePath[i].match('{[a-zA-Z0-9_]+}')) {
                continue;
            }

            const paramName   = routePath[i].substring(1, routePath[i].length - 1); // removing {} from param
            output[paramName] = routeString[i];
        }
    }
}

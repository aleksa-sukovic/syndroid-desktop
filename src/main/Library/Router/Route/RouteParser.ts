import Route from "./Route";
import RouteDefinition from "./RouteDefinition";

export default class RouteParser
{
    public static isValidPath(route: string): boolean
    {
        if (!route || typeof route !== 'string') {
            return false;
        }

        return /^(\/[a-zA-Z0-9{}\-_|]+)+(\?([a-zA-Z0-9_|]+=[^\?&]+)(&[a-zA-Z0-9_|]+=[^\?&]+)*)*$/.test(route);
    }

    public static parseParamsFromString(route: string, definition?: RouteDefinition): any
    {
        let params = {};

        params = RouteParser.parseGetParams(route, params);
        if (definition) {
            params = RouteParser.parseEmbeddedParams(route, params);
        }

        return params;
    }

    public static parseParams(route: Route): any
    {
        let params = {};

        params = RouteParser.parseGetParams(route.getPath(), params);
        params = RouteParser.parseEmbeddedParams(route.getPath(), params);

        return params;
    }

    public static parseGetParams(route: string, output: any): any
    {
        let helper = route.split('?');
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

    public static parseEmbeddedParams(route: string, definition?: RouteDefinition, output: any): any
    {
        if (!route.getDefinition()) {
            return;
        }

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

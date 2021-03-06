import Route from "./Route";

export default class RouteParser
{
    public static parseParams(routePath: string): any
    {
        let params = {};

        params = RouteParser.parseGetParams(routePath, params);

        return params;
    }

    public static parseGetParams(routePath: string, output: any): any
    {
        let helper = routePath.split('?');
        if (helper.length < 2) {
            return output;
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
}

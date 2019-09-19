import Route from "../Router/Route/Route";

export default interface ServiceProvider
{
    getRoutes(): Route[];
}

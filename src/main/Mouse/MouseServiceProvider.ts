import ServiceProvider from "../Library/Services/ServiceProvider";
import Route from "../Library/Router/Route/Route";
import MouseController from "./Controllers/MouseController";

export default class MouseServiceProvider implements ServiceProvider
{
    public getRoutes(): Route[]
    {
        return [
            new Route('/mouse/move', MouseController,'move'),
        ];
    }
}

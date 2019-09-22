import ServiceProvider from "../Library/Services/ServiceProvider";
import Route from "../Library/Router/Route/Route";
import KeyboardController from "./Controllers/KeyboardController";

export default class KeyboardServiceProvider implements ServiceProvider
{
    public getRoutes(): Route[]
    {
        return [
            new Route('/keyboard/type', KeyboardController, 'type'),
        ];
    }
}

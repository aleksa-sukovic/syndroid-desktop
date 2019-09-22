import ServiceProvider from "../Library/Services/ServiceProvider";
import Route from "../Library/Router/Route/Route";
import MouseController from "./Controllers/MouseController";

export default class MouseServiceProvider implements ServiceProvider
{
    public getRoutes(): Route[]
    {
        return [
            new Route('/mouse/move', MouseController,'move'),
            new Route('/mouse/scroll', MouseController, 'scroll'),
            new Route('/mouse/left-click', MouseController, 'leftClick'),
            new Route('/mouse/right-click', MouseController, 'rightClick'),
            new Route('/mouse/drag/start', MouseController, 'dragStart'),
            new Route('/mouse/drag/end', MouseController, 'dragEnd'),
            new Route('/mouse/double-left-click', MouseController, 'doubleLeftClick')
        ];
    }
}

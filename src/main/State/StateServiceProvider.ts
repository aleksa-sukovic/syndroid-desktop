import ServiceProvider from "../Library/Services/ServiceProvider";
import Route from "../Library/Router/Route/Route";
import StateController from "./Controllers/StateController";

export default class StateServiceProvider implements ServiceProvider
{
    public getRoutes(): Route[]
    {
        return [
            new Route('/state/change/shutdown', StateController, 'shutdown'),
            new Route('/state/change/reboot', StateController, 'reboot'),
            new Route('/state/change/logoff', StateController, 'logOff'),
            new Route('/state/change/sleep', StateController, 'sleep'),
        ];
    }
}

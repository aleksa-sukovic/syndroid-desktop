import ServiceProvider from "../Library/Services/ServiceProvider";
import Route from "../Library/Router/Route/Route";
import MediaController from "./Controllers/MediaController";

export default class MediaServiceProvider implements ServiceProvider
{
    public getRoutes(): Route[]
    {
        return [
            new Route('/media/volume/up', MediaController, 'volumeUp'),
            new Route('/media/volume/down', MediaController, 'volumeDown'),
            new Route('/media/volume/mute', MediaController, 'volumeMute'),
            new Route('/media/play-pause', MediaController, 'playPause'),
            new Route('/media/back', MediaController, 'back'),
            new Route('/media/forward', MediaController, 'forward'),
            new Route('/media/up', MediaController, 'up'),
            new Route('/media/down', MediaController, 'down')
        ];
    }
}

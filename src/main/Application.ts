import Route from "./Library/Router/Route/Route";
import ServiceProvider from "./Library/Services/ServiceProvider";
import SocketServer from "./Library/Services/SocketServer";

export default class Application
{
    protected static routes: Route[];
    protected socketService: SocketServer;

    public constructor()
    {
        this.socketService = new SocketServer(3000);
        this.socketService.addListener({ key: 'socket:opened', callback: this.handleSocketOpen.bind(this)});
        this.socketService.addListener({ key: 'socket:closed', callback: this.handleSocketClose.bind(this)});
        this.socketService.addListener({ key: 'socket:client-connected', callback: this.handleClientConnect.bind(this)});
        this.socketService.addListener({ key: 'socket:client-message', callback: this.handleClientMessage.bind(this)});
        this.socketService.addListener({ key: 'socket:client-disconnect', callback: this.handleClientDisconnect.bind(this)});
    }

    public serve(): void
    {
        this.socketService.start();
    }

    public stop(): void
    {
        this.socketService.stop();
    }

    protected handleSocketOpen(data?: any): void
    {
        //
    }

    protected handleSocketClose(data?: any): void
    {
        //
    }

    protected handleClientConnect(data?: any): void
    {
        //
    }

    protected handleClientMessage(data?: any): void
    {
        //
    }

    protected handleClientDisconnect(data?: any): void
    {
        //
    }

    public static getProviders(): ServiceProvider[]
    {
        return [
          //
        ];
    }

    public static setRoutes(routes: Route[]): void
    {
        Application.routes = routes;
    }
}

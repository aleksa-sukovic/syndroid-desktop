import * as IP from 'ip';
import Router from "./Library/Router/Router";
import Request from "./Library/Router/Request";
import Route from "./Library/Router/Route/Route";
import EventHandler from "./Library/Events/EventHandler";
import SocketServer from "./Library/Services/SocketServer";
import Bootstrapper from "./Library/Services/Bootstrapper";
import MouseServiceProvider from "./Mouse/MouseServiceProvider";
import MediaServiceProvider from "./Media/MediaServiceProvider";
import StateServiceProvider from "./State/StateServiceProvider";
import ServiceProvider from "./Library/Services/ServiceProvider";
import ExceptionHandler from "./Library/Exceptions/ExceptionHandler";
import KeyboardServiceProvider from "./Keyboard/KeyboardServiceProvider";

export default class Application
{
    protected routes: Route[];
    protected router: Router;
    protected socketService: SocketServer;
    protected exceptionHandler: ExceptionHandler;
    protected eventHandler: EventHandler;
    protected hasConnectedUser: boolean;

    public constructor()
    {
        // bootstrap service providers
        const bootstrapper = new Bootstrapper(this.getProviders());
        this.routes = bootstrapper.bootstrap().routes;

        // initialize properties
        this.socketService = new SocketServer(3000);
        this.exceptionHandler = new ExceptionHandler();
        this.eventHandler = new EventHandler();
        this.router = new Router(this.routes);

        // Hook event listeners
        this.eventHandler.listen(this);
        this.socketService.addListener({ key: 'socket:opened', callback: this.handleSocketOpen.bind(this) });
        this.socketService.addListener({ key: 'socket:closed', callback: this.handleSocketClose.bind(this) });
        this.socketService.addListener({ key: 'socket:client-connected', callback: this.handleClientConnect.bind(this) });
        this.socketService.addListener({ key: 'socket:client-message', callback: this.handleClientMessage.bind(this) });
        this.socketService.addListener({ key: 'socket:client-disconnect', callback: this.handleClientDisconnect.bind(this) });
    }

    public serve(): void
    {
        if (this.socketService !== null) {
            this.socketService.start();
        }
    }

    public stop(): void
    {
        if (this.socketService !== null) {
            this.socketService.stop();
        }
    }

    public sendRequest(message: string): void
    {
        if (!this.socketService.isConnected()) {
            return;
        }

        this.socketService.sendMessage(message);
    }

    protected handleSocketOpen(data?: any): void
    {
        EventHandler.notifyWindows('socket:open', data);
    }

    protected handleSocketClose(data?: any): void
    {

        this.hasConnectedUser = false;
        EventHandler.notifyWindows('socket:close', data);
    }

    protected handleClientConnect(data?: any): void
    {
        this.hasConnectedUser = true;
        EventHandler.notifyWindows('client:connect', data);
    }

    protected handleClientMessage(data?: any): void
    {
        try {
            let response = this.router.handleRequest(data);

            if (response) {
                this.socketService.sendMessage(response);
            }
        } catch (e) {
            this.socketService.sendMessage(this.exceptionHandler.handle(e));
        }
    }

    protected handleClientDisconnect(data?: any): void
    {
        this.hasConnectedUser = false;
        EventHandler.notifyWindows('client:disconnect', data);
    }

    public getIP(): string
    {
        return IP.address();
    }

    public userConnected(): boolean
    {
        return this.hasConnectedUser;
    }

    public getProviders(): ServiceProvider[]
    {
        return [
            new MouseServiceProvider(),
            new MediaServiceProvider(),
            new KeyboardServiceProvider(),
            new StateServiceProvider(),
        ];
    }
}

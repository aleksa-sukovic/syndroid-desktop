import * as WebSocket from 'ws';
import ClientAlreadyConnectedException from "../Exceptions/ClientAlreadyConnectedException";
import ClientNotConnectedException from "../Exceptions/ClientNotConnectedException";

export default class SocketServer
{
    protected port: number;
    protected server: WebSocket.Server;
    protected client: WebSocket;
    protected listeners: { key: string, callback: (data?: any) => void }[];

    public constructor(port: number)
    {
        this.port = port;
    }

    public start(): void
    {
        this.server = new WebSocket.Server({ port: this.port });

        this.server.on('connection', socket => this.onClientConnect(socket));

        this.emmitEvent('socket:opened');
    }

    protected  onClientConnect(client: WebSocket)
    {
        if (this.server.clients.size > 1) {
            client.send((new ClientAlreadyConnectedException()).render());
            client.close();
            return;
        }

        client.on('message', (message) => this.onClientMessage(message));
        client.on('close', () => this.onClientDisconnect());
        this.client = client;

        this.emmitEvent('socket:client-connected');
    }

    public stop()
    {
        if (this.client !== null) {
            this.client.close();
            this.client = null;
        }

        if (this.server != null) {
            this.server.close();
        }

        this.emmitEvent('socket:closed');
    }

    public onClientMessage(message)
    {
        this.emmitEvent('socket:client-message', message);
    }

    public onClientDisconnect()
    {
        this.client = null;

        this.emmitEvent('socket:client-disconnect');
    }

    public sendMessage(message)
    {
        if (this.server.clients.size !== 1) {
            throw new ClientNotConnectedException();
        }

        this.client.send(message);
    }

    public addListener(listener: { key: string, callback: (data?: any) => void }): void
    {
        this.listeners.push(listener);
    }

    public removeListener(toRemove: { key: string, callback: (data?: any) => void }): void
    {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].key === toRemove.key) {
                this.listeners.splice(i, 1);
            }
        }
    }

    public emmitEvent(key: string, data?: any): void
    {
        for (let listener of this.listeners) {
            if (listener.key === key) {
                listener.callback(data);
            }
        }
    }
}

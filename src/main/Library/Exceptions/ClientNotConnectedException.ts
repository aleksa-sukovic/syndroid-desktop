import BaseException from "./BaseException";

export default class ClientNotConnectedException extends BaseException
{
    constructor()
    {
        super('Client is not connected to server.', 400);
    }
}

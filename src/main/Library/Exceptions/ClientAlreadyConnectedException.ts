import BaseException from "./BaseException";

export default class ClientAlreadyConnectedException extends BaseException
{
    constructor()
    {
        super('Another client is already connected.', 403);
    }
}

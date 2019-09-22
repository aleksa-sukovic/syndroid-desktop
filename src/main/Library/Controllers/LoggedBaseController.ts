import BaseController from "./BaseController";
import Request from "../Router/Request";

export default class LoggedBaseController extends BaseController
{
    public handle(request: Request): any
    {
        console.log('--------------------');
        console.log('About to handle request with id => ' + request.getID() + ' and path => ' + request.getRoute().toString());
        console.log('Request params:');
        console.log(request.getParams());

        let response = super.handle(request);

        console.log('Handled request with id => ' + request.getID());
        console.log('--------------------');
        return response;
    }
};

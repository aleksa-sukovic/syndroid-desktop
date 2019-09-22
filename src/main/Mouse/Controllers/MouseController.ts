import Request from "../../Library/Router/Request";
import MouseValidator from "../Validators/MouseValidator";
import LoggedBaseController from "../../Library/Controllers/LoggedBaseController";

export default class MouseController extends LoggedBaseController
{
    public constructor()
    {
        super();
        this.validator = new MouseValidator();
    }

    public move(request: Request): any
    {
        console.log('MouseController => move');

        return 'RESPONSE';
    }
}

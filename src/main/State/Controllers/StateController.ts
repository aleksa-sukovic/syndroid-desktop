import * as Shutdown from 'electron-shutdown-command';
import LoggedBaseController from "../../Library/Controllers/LoggedBaseController";
import StateValidator from "../Validators/StateValidator";

export default class StateController extends LoggedBaseController
{
    public constructor()
    {
        super();
        this.validator = new StateValidator();
    }

    public shutdown(): any
    {
        Shutdown.shutdown();
    }

    public reboot(): any
    {
        Shutdown.reboot();
    }

    public logOff(): any
    {
        try {
            Shutdown.logoff();
        } catch (err) {
            // unsupported OS, notify user
        }
    }

    public sleep(): any
    {
        try {
            Shutdown.sleep();
        } catch (err) {
            // unsupported OS, notify user
        }
    }
}

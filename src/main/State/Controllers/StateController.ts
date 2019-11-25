import * as Shutdown from 'electron-shutdown-command';
import StateValidator from "../Validators/StateValidator";
import BaseController from '../../Library/Controllers/BaseController';

export default class StateController extends BaseController
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

import * as Robot from 'cloudpurge_robotjs';
import Request from "../../Library/Router/Request";
import MouseValidator from "../Validators/MouseValidator";
import BaseController from '../../Library/Controllers/BaseController';

export default class MouseController extends BaseController
{
    public constructor()
    {
        super();
        this.validator = new MouseValidator();
    }

    public move(request: Request): any
    {
        const x = Robot.getMousePos().x + parseFloat(request.input('x'));
        const y = Robot.getMousePos().y + parseFloat(request.input('y'));

        Robot.moveMouse(x, y);
    }

    public scroll(request: Request): any
    {
        Robot.scrollMouse(0, parseFloat(request.input('amount')));
    }

    public leftClick(request: Request): any
    {
        Robot.mouseClick('left');
    }

    public rightClick(request: Request): any
    {
        Robot.mouseClick('right');
    }

    public dragStart(request: Request): any
    {
        Robot.mouseToggle('down', 'left');
    }

    public dragEnd(request: Request): any
    {
        Robot.mouseToggle('up', 'right');
    }

    public doubleLeftClick(request: Request): any
    {
        Robot.mouseClick('left', true);
    }
}

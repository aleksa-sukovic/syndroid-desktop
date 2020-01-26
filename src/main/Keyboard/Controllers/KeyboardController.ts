import * as Robot from 'robotjs';
import Request from "../../Library/Router/Request";
import KeyboardValidator from "../Validators/KeyboardValidator";
import BaseController from "../../Library/Controllers/BaseController";

export default class KeyboardController extends BaseController
{
    public constructor()
    {
        super();
        this.validator = new KeyboardValidator();
    }

    public type(request: Request)
    {
        if (request.input('modifierInput') === 'true') {
            return this.typeModifier(request.input('key'));
        }

        this.setModifiers(request.input('modifiers'));
        Robot.typeString(String.fromCharCode(request.input('key')));
        this.unsetModifiers(request.input('modifiers'));
    }

    protected setModifiers(modifiers: string): void
    {
        if (!modifiers) {
            return;
        }

        modifiers.split('|').forEach(modifier => Robot.keyToggle(modifier, 'down'));
    }

    protected unsetModifiers(modifiers: string): void
    {
        if (!modifiers) {
            return;
        }

        modifiers.split('|').forEach(modifier => Robot.keyToggle(modifier, 'up'));
    }

    public typeModifier(modifier: string): void
    {
        Robot.keyTap(modifier);
    }
}

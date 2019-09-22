import BaseValidator from "../../Library/Validators/BaseValidator";
import Rule from "../../Library/Validators/Rule";

export default class KeyboardValidator extends BaseValidator
{
    public getRules(): Rule[]
    {
        return [
            new Rule('key', 'type', '.|\n', true),
            new Rule('backspace', 'type', '(true)|(false)', false),
            new Rule('shift', 'type', '(true)|(false)', false)
        ];
    }
}

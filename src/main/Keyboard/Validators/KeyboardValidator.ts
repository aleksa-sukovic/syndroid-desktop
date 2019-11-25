import Rule from "../../Library/Validators/Rule";
import BaseValidator from "../../Library/Validators/BaseValidator";

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

import Rule from "../../Library/Validators/Rule";
import LoggedValidator from "../../Library/Validators/LoggedValidator";

export default class KeyboardValidator extends LoggedValidator
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

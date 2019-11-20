import Rule from "../../Library/Validators/Rule";
import LoggedValidator from "../../Library/Validators/LoggedValidator";

export default class MouseValidator extends LoggedValidator
{
    public getRules(): Rule[]
    {
        return [
            new Rule('x', 'move', MouseValidator.FLOAT_REGEX, true),
            new Rule('y', 'move', MouseValidator.FLOAT_REGEX, true),
            new Rule('amount', 'scroll', MouseValidator.FLOAT_REGEX, true),
        ];
    }
}

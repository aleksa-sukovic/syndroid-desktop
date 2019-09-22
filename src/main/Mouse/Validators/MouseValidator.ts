import BaseValidator from "../../Library/Validators/BaseValidator";
import Rule from "../../Library/Validators/Rule";

export default class MouseValidator extends BaseValidator
{
    public getRules(): Rule[]
    {
        return [
            new Rule('x', 'move', BaseValidator.FLOAT_REGEX, true),
            new Rule('y', 'move', BaseValidator.FLOAT_REGEX, true),
            new Rule('amount', 'scroll', BaseValidator.FLOAT_REGEX, true),
        ];
    }
}

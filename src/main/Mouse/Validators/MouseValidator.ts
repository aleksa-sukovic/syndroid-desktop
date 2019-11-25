import Rule from "../../Library/Validators/Rule";
import BaseValidator from "../../Library/Validators/BaseValidator";

export default class MouseValidator extends BaseValidator
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

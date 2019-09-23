import BaseValidator from "./BaseValidator";
import Request from "../Router/Request";
import { ValidationError } from "../Exceptions/ValidationException";

export default abstract class LoggedValidator extends BaseValidator
{
    public  afterValidation(errors: ValidationError[], request: Request): void
    {
        if (errors.length !== 0) {
            console.log('Validation finished with following errors:');
            console.log(errors);
        }

        super.afterValidation(errors, request);
    }
}

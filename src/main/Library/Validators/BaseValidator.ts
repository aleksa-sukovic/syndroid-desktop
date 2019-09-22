import Rule from './Rule';
import Request from '../Router/Request';
import { ValidationException, ValidationError } from "../Exceptions/ValidationException";

export default abstract class BaseValidator
{
    protected static readonly FLOAT_REGEX = '[-+]?[0-9]+.?[0-9]*';

    public validate(request: Request): void
    {
        const rules  = this.filterRules(request);
        const errors: ValidationError[] = [];

        this.beforeValidation(rules);
        this.validateRequired(request, rules, errors);
        this.validatePattern(request, rules, errors);
        this.afterValidation(errors, request);
    }

    public abstract getRules(): Rule[];

    public validateRequired(params: any, rules: Rule[], errors: ValidationError[]): void
    {
        for (const rule of rules) {
            if (rule.required && !(rule.name in params)) {
                this.addValidationError(errors, rule.name, 'required', 'Param is required');
            }
        }
    }

    public validatePattern(params: any, rules: Rule[], errors: ValidationError[])
    {
        for (const param in params) {
            if (!params.hasOwnProperty(param)) {
                continue;
            }

            let rule = rules.find(rule => rule.name === param);
            if (!rule) {
                continue;
            }

            if (!params[param].toString().match(rule.pattern)) {
                this.addValidationError(errors, param, 'pattern', `Value ${params[param]} does not match required pattern`);
            }
        }
    }

    public addValidationError(errors: ValidationError[], paramName: string, errorName: string, message: string): void
    {
        let foundError = errors.find(item => item.key === paramName);

        if (foundError) {
            foundError.errors.push({ errorName: errorName, message: message });
        } else {
            errors.push({ key: paramName, errors: [{ errorName: errorName, message: message }] });
        }
    }

    public beforeValidation(rules: Rule[]): void
    {
        //
    }

    public afterValidation(errors: ValidationError[], request: Request): void
    {
        if (errors.length > 0) {
            throw new ValidationException(errors, request);
        }
    }

    protected filterRules(request: Request): Rule[]
    {
        const handler = request.getRoute().getHandler();

        let rules = this.getDefaultRules().concat(this.getRules());
        rules = rules.filter(rule => {
            return rule.handlers.indexOf(handler) > -1 || rule.isGlobal;
        });

        return rules;
    }

    protected getDefaultRules(): Rule[]
    {
        return [
            new Rule('id', '*', '[0-9]+', true),
        ];
    }
}

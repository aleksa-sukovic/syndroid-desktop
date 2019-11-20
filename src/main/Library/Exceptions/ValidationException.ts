import BaseException from './BaseException';
import Request from '../Router/Request';

export interface ValidationError
{
    key: string;
    errors: { errorName: string, message: string }[];
}

export class ValidationException extends BaseException
{
    protected errors: ValidationError[];

    public constructor(errors: ValidationError[], request: Request)
    {
        super('Validation failed', 422, request);

        this.errors = errors;
    }

    public render()
    {
        let exception = super.render();
        exception     += '&errors=' + JSON.stringify(this.errors);
        return exception;
    }
}

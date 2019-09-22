export default class Rule
{
    public name: string;
    public handlers: string[];
    public pattern: RegExp;
    public readonly required: boolean;
    public readonly isGlobal: boolean;

    constructor(name: string, handlers: string, pattern: string, required: boolean)
    {
        this.name     = name;
        this.pattern  = new RegExp('^' + pattern + '$');
        this.required = required;
        this.handlers = handlers.split('|');
        this.isGlobal = handlers === '*';
    }
}

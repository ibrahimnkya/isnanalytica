export declare class SqlValidator {
    private parser;
    constructor();
    validateReadOnly(sql: string, type?: string): boolean;
    sanitize(sql: string): string;
}

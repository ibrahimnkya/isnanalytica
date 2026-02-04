import { Parser } from 'node-sql-parser';

export class SqlValidator {
    private parser: Parser;

    constructor() {
        this.parser = new Parser();
    }

    validateReadOnly(sql: string, type: string = 'postgresql'): boolean {
        const dbType = type === 'postgres' ? 'postgresql' : type;
        try {
            const ast = this.parser.astify(sql, { database: dbType });
            const astArray = Array.isArray(ast) ? ast : [ast];

            for (const statement of astArray) {
                if (statement.type !== 'select') {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('SQL Parsing Error:', error.message);
            // If it fails to parse, we should check for destructive keywords as a fallback
            const destructiveKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'GRANT', 'REVOKE'];
            const upperSql = sql.toUpperCase();
            return !destructiveKeywords.some(keyword => upperSql.includes(keyword));
        }
    }

    sanitize(sql: string): string {
        // Add basic sanitization like removing multiple statements if not allowed
        // For now, we trust the AST check, but we could add more here
        return sql.trim();
    }
}

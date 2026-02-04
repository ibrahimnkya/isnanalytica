"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlValidator = void 0;
const node_sql_parser_1 = require("node-sql-parser");
class SqlValidator {
    parser;
    constructor() {
        this.parser = new node_sql_parser_1.Parser();
    }
    validateReadOnly(sql, type = 'postgresql') {
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
        }
        catch (error) {
            console.error('SQL Parsing Error:', error.message);
            const destructiveKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'GRANT', 'REVOKE'];
            const upperSql = sql.toUpperCase();
            return !destructiveKeywords.some(keyword => upperSql.includes(keyword));
        }
    }
    sanitize(sql) {
        return sql.trim();
    }
}
exports.SqlValidator = SqlValidator;
//# sourceMappingURL=sql-validator.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteAdapter = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const xlsx = __importStar(require("xlsx"));
class SQLiteAdapter {
    config;
    db;
    dbPath;
    constructor(config) {
        this.config = config;
        this.dbPath = config.filePath || ':memory:';
    }
    async connect() {
        try {
            this.db = new better_sqlite3_1.default(this.dbPath);
            this.db.pragma('journal_mode = WAL');
        }
        catch (error) {
            console.error('SQLite connect error:', error);
            throw error;
        }
    }
    async test() {
        try {
            const db = new better_sqlite3_1.default(this.dbPath);
            db.close();
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getSchemas() {
        return ['main'];
    }
    async getTables(schema) {
        const rows = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        return rows.map((r) => r.name);
    }
    async getColumns(schema, table) {
        const rows = this.db.prepare(`PRAGMA table_info(${table})`).all();
        return rows.map((r) => ({
            column_name: r.name,
            data_type: r.type,
            is_nullable: r.notnull ? 'NO' : 'YES'
        }));
    }
    async runQuery(sql) {
        try {
            const stmt = this.db.prepare(sql);
            if (sql.trim().toUpperCase().startsWith('SELECT')) {
                const rows = stmt.all();
                const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
                return {
                    columns,
                    rows,
                    rowCount: rows.length
                };
            }
            else {
                const info = stmt.run();
                return {
                    columns: [],
                    rows: [],
                    rowCount: info.changes
                };
            }
        }
        catch (error) {
            console.error('SQLite Query Error:', error);
            throw error;
        }
    }
    async disconnect() {
        if (this.db) {
            this.db.close();
        }
    }
    async ingestFile(filePath, tableName) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        if (data.length === 0)
            return;
        const columns = Object.keys(data[0]);
        const createTableSql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.map(c => `"${c}" TEXT`).join(', ')})`;
        this.db.prepare(createTableSql).run();
        const insertSql = `INSERT INTO ${tableName} (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
        const insertStmt = this.db.prepare(insertSql);
        const transaction = this.db.transaction((items) => {
            for (const item of items) {
                const values = columns.map(c => item[c]);
                insertStmt.run(values);
            }
        });
        transaction(data);
    }
}
exports.SQLiteAdapter = SQLiteAdapter;
//# sourceMappingURL=sqlite.adapter.js.map
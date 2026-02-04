import Database from 'better-sqlite3';
import { DataAdapter, QueryResult, ColumnInfo } from './data-adapter.interface';
import * as xlsx from 'xlsx';

export class SQLiteAdapter implements DataAdapter {
    private db: Database.Database;
    private dbPath: string;

    constructor(private config: { filePath?: string; isExcel?: boolean; tableName?: string }) {
        this.dbPath = config.filePath || ':memory:';
    }

    async connect(): Promise<void> {
        try {
            this.db = new Database(this.dbPath);
            this.db.pragma('journal_mode = WAL');
        } catch (error) {
            console.error('SQLite connect error:', error);
            throw error;
        }
    }

    async test(): Promise<boolean> {
        try {
            const db = new Database(this.dbPath);
            db.close();
            return true;
        } catch (error) {
            return false;
        }
    }

    async getSchemas(): Promise<string[]> {
        return ['main'];
    }

    async getTables(schema: string): Promise<string[]> {
        const rows = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        return rows.map((r: any) => r.name);
    }

    async getColumns(schema: string, table: string): Promise<ColumnInfo[]> {
        const rows = this.db.prepare(`PRAGMA table_info(${table})`).all();
        return rows.map((r: any) => ({
            column_name: r.name,
            data_type: r.type,
            is_nullable: r.notnull ? 'NO' : 'YES'
        }));
    }

    async runQuery(sql: string): Promise<QueryResult> {
        try {
            const stmt = this.db.prepare(sql);
            if (sql.trim().toUpperCase().startsWith('SELECT')) {
                const rows = stmt.all() as any[];
                const columns = rows.length > 0 ? Object.keys(rows[0] as object) : [];
                return {
                    columns,
                    rows,
                    rowCount: rows.length
                };
            } else {
                const info = stmt.run();
                return {
                    columns: [],
                    rows: [],
                    rowCount: info.changes
                };
            }
        } catch (error) {
            console.error('SQLite Query Error:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (this.db) {
            this.db.close();
        }
    }

    /**
     * Helper to ingest Excel/CSV into the current SQLite instance
     */
    async ingestFile(filePath: string, tableName: string): Promise<void> {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (data.length === 0) return;

        const columns = Object.keys(data[0] as object);
        const createTableSql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.map(c => `"${c}" TEXT`).join(', ')})`;
        this.db.prepare(createTableSql).run();

        const insertSql = `INSERT INTO ${tableName} (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
        const insertStmt = this.db.prepare(insertSql);

        const transaction = this.db.transaction((items: any[]) => {
            for (const item of items) {
                const values = columns.map(c => item[c]);
                insertStmt.run(values);
            }
        });

        transaction(data as any[]);
    }
}

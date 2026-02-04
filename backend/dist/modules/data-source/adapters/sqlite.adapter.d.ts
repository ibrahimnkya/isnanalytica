import { DataAdapter, QueryResult, ColumnInfo } from './data-adapter.interface';
export declare class SQLiteAdapter implements DataAdapter {
    private config;
    private db;
    private dbPath;
    constructor(config: {
        filePath?: string;
        isExcel?: boolean;
        tableName?: string;
    });
    connect(): Promise<void>;
    test(): Promise<boolean>;
    getSchemas(): Promise<string[]>;
    getTables(schema: string): Promise<string[]>;
    getColumns(schema: string, table: string): Promise<ColumnInfo[]>;
    runQuery(sql: string): Promise<QueryResult>;
    disconnect(): Promise<void>;
    ingestFile(filePath: string, tableName: string): Promise<void>;
}

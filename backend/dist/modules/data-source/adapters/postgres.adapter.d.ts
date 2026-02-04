import { DataAdapter, QueryResult, ColumnInfo } from '../adapters/data-adapter.interface';
export declare class PostgresAdapter implements DataAdapter {
    private config;
    private client;
    constructor(config: any);
    connect(): Promise<void>;
    test(): Promise<boolean>;
    getSchemas(): Promise<string[]>;
    getTables(schema: string): Promise<string[]>;
    getColumns(schema: string, table: string): Promise<ColumnInfo[]>;
    runQuery(sql: string): Promise<QueryResult>;
    private runRawQuery;
    disconnect(): Promise<void>;
}

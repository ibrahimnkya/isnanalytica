export interface QueryResult {
    columns: string[];
    rows: any[];
    rowCount: number;
}

export interface SqlAdapter {
    testConnection(config: any): Promise<boolean>;
    runQuery(config: any, sql: string): Promise<QueryResult>;
    getSchemas(config: any): Promise<string[]>;
    getTables(config: any, schema: string): Promise<string[]>;
    getColumns(config: any, schema: string, table: string): Promise<any[]>;
}

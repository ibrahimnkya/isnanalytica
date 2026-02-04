export interface Schema {
    name: string;
}

export interface TableInfo {
    name: string;
    schema: string;
}

export interface ColumnInfo {
    column_name: string;
    data_type: string;
    is_nullable: string;
}

export interface QueryResult {
    columns: string[];
    rows: any[];
    rowCount: number;
}

export interface DataAdapter {
    connect(): Promise<void>;
    test(): Promise<boolean>;
    getSchemas(): Promise<string[]>;
    getTables(schema: string): Promise<string[]>;
    getColumns(schema: string, table: string): Promise<ColumnInfo[]>;
    runQuery(sql: string): Promise<QueryResult>;
    disconnect(): Promise<void>;
}

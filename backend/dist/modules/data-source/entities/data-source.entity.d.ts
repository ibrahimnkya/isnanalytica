export declare enum DataSourceType {
    POSTGRES = "postgres",
    MYSQL = "mysql",
    MSSQL = "mssql",
    BIGQUERY = "bigquery",
    SQLITE = "sqlite"
}
export declare class DataSourceEntity {
    id: string;
    name: string;
    type: DataSourceType;
    connectionConfig: any;
    createdAt: Date;
    updatedAt: Date;
}

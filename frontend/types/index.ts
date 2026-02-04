export enum DataSourceType {
    POSTGRES = 'postgres',
    MYSQL = 'mysql',
    MSSQL = 'mssql',
    BIGQUERY = 'bigquery',
    SQLITE = 'sqlite',
}

export interface DataSource {
    id: string;
    name: string;
    type: DataSourceType;
    connectionConfig: any;
    createdAt: string;
    updatedAt: string;
}

export interface Metric {
    id: string;
    name: string;
    expression: string;
}

export interface Dimension {
    id: string;
    name: string;
    expression: string;
}

export interface Dataset {
    id: string;
    name: string;
    description?: string;
    tableName: string;
    schema?: string;
    dataSource: DataSource;
    metrics: Metric[];
    dimensions: Dimension[];
    createdAt: string;
    updatedAt: string;
}

export interface Chart {
    id: string;
    name: string;
    description?: string;
    type: 'bar' | 'line' | 'pie' | 'table';
    config: any;
    dataset: Dataset;
    createdAt: string;
    updatedAt: string;
}

export interface Dashboard {
    id: string;
    name: string;
    description?: string;
    layout: any;
    charts: Chart[];
    createdAt: string;
    updatedAt: string;
}

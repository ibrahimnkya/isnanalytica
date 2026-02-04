export declare class SupersetService {
    private readonly logger;
    private readonly baseUrl;
    private readonly username;
    private readonly password;
    private accessToken;
    constructor();
    private authenticate;
    private request;
    executeSql(dataSourceId: number, sql: string, schema?: string): Promise<any>;
    getDatasets(): Promise<any>;
    createDataset(databaseId: number, tableName: string, schema?: string): Promise<any>;
    getCharts(): Promise<any>;
    getDashboards(): Promise<any>;
}

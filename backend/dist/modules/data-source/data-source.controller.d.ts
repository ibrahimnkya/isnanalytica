import { DataSourceService } from './data-source.service';
import { DataSourceEntity } from './entities/data-source.entity';
export declare class DataSourceController {
    private readonly dataSourceService;
    constructor(dataSourceService: DataSourceService);
    create(data: Partial<DataSourceEntity>): Promise<DataSourceEntity>;
    findAll(): Promise<DataSourceEntity[]>;
    findOne(id: string): Promise<DataSourceEntity>;
    update(id: string, data: Partial<DataSourceEntity>): Promise<DataSourceEntity>;
    remove(id: string): Promise<void>;
    testRawConnection(data: {
        type: string;
        connectionConfig: any;
    }): Promise<{
        success: boolean;
    }>;
    testConnection(id: string): Promise<{
        success: boolean;
    }>;
    getSchemas(id: string): Promise<string[]>;
    getTables(id: string, schema: string): Promise<string[]>;
    getColumns(id: string, schema: string, table: string): Promise<any[]>;
    runQuery(id: string, sql: string): Promise<any>;
    uploadFile(file: Express.Multer.File, name: string, tableName?: string): Promise<DataSourceEntity>;
}

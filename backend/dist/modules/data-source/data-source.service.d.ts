import { Repository } from 'typeorm';
import { DataSourceEntity, DataSourceType } from './entities/data-source.entity';
import { AdapterFactory } from './adapters/adapter.factory';
import { AuditService } from '../audit/audit.service';
export declare class DataSourceService {
    private dataSourceRepository;
    private adapterFactory;
    private auditService;
    constructor(dataSourceRepository: Repository<DataSourceEntity>, adapterFactory: AdapterFactory, auditService: AuditService);
    create(data: Partial<DataSourceEntity>): Promise<DataSourceEntity>;
    findAll(): Promise<DataSourceEntity[]>;
    findOne(id: string): Promise<DataSourceEntity>;
    update(id: string, data: Partial<DataSourceEntity>): Promise<DataSourceEntity>;
    remove(id: string): Promise<void>;
    testConnection(id: string): Promise<boolean>;
    testConnectionConfig(type: DataSourceType, config: any): Promise<boolean>;
    getSchemas(id: string): Promise<string[]>;
    getTables(id: string, schema: string): Promise<string[]>;
    getColumns(id: string, schema: string, table: string): Promise<any[]>;
    runRawQuery(id: string, sql: string, userId?: string): Promise<any>;
    createFromExcel(filePath: string, name: string, tableName?: string, userId?: string): Promise<DataSourceEntity>;
}

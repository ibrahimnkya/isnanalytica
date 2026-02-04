import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSourceEntity, DataSourceType } from './entities/data-source.entity';
import { AdapterFactory } from './adapters/adapter.factory';
import { SQLiteAdapter } from './adapters/sqlite.adapter';
import * as path from 'path';
import * as fs from 'fs';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../audit/entities/audit-log.entity';

@Injectable()
export class DataSourceService {
    constructor(
        @InjectRepository(DataSourceEntity)
        private dataSourceRepository: Repository<DataSourceEntity>,
        private adapterFactory: AdapterFactory,
        private auditService: AuditService,
    ) { }

    async create(data: Partial<DataSourceEntity>): Promise<DataSourceEntity> {
        const dataSource = this.dataSourceRepository.create(data);
        return this.dataSourceRepository.save(dataSource);
    }

    async findAll(): Promise<DataSourceEntity[]> {
        return this.dataSourceRepository.find();
    }

    async findOne(id: string): Promise<DataSourceEntity> {
        const dataSource = await this.dataSourceRepository.findOne({ where: { id } });
        if (!dataSource) {
            throw new NotFoundException(`Data source with ID ${id} not found`);
        }
        return dataSource;
    }

    async update(id: string, data: Partial<DataSourceEntity>): Promise<DataSourceEntity> {
        await this.dataSourceRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.dataSourceRepository.delete(id);
    }

    async testConnection(id: string): Promise<boolean> {
        const dataSource = await this.findOne(id);
        return this.testConnectionConfig(dataSource.type, dataSource.connectionConfig);
    }

    async testConnectionConfig(type: DataSourceType, config: any): Promise<boolean> {
        const adapter = this.adapterFactory.getAdapter(type, config);
        try {
            return await adapter.test();
        } catch (error) {
            throw new BadRequestException(`Connection Test Failed: ${error.message}`);
        }
    }

    async getSchemas(id: string): Promise<string[]> {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            return await adapter.getSchemas();
        } catch (error) {
            throw new BadRequestException(`Failed to fetch schemas: ${error.message}`);
        }
    }

    async getTables(id: string, schema: string): Promise<string[]> {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            return await adapter.getTables(schema);
        } catch (error) {
            throw new BadRequestException(`Failed to fetch tables: ${error.message}`);
        }
    }

    async getColumns(id: string, schema: string, table: string): Promise<any[]> {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            return await adapter.getColumns(schema, table);
        } catch (error) {
            throw new BadRequestException(`Failed to fetch columns: ${error.message}`);
        }
    }

    async runRawQuery(id: string, sql: string, userId?: string): Promise<any> {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);

        try {
            const result = await adapter.runQuery(sql);

            // Log query execution
            await this.auditService.log(
                AuditAction.QUERY_EXECUTED,
                userId ? { id: userId } as any : null,
                { dataSourceId: id, sql, success: true }
            );

            return result;
        } catch (error) {
            // Log failed query
            await this.auditService.log(
                AuditAction.QUERY_EXECUTED,
                userId ? { id: userId } as any : null,
                { dataSourceId: id, sql, success: false },
                undefined,
                undefined,
                false,
                error.message
            );
            throw error;
        }
    }

    async createFromExcel(filePath: string, name: string, tableName: string = 'data', userId?: string): Promise<DataSourceEntity> {
        const ext = path.extname(filePath).toLowerCase();
        if (ext !== '.xlsx' && ext !== '.csv' && ext !== '.xls') {
            fs.unlinkSync(filePath);
            throw new Error('Unsupported file format. Please upload .xlsx, .xls or .csv');
        }

        const dbDir = './data/sqlite';
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

        const dbFileName = `${Date.now()}.sqlite`;
        const dbPath = path.join(dbDir, dbFileName);

        const dataSource = await this.create({
            name,
            type: DataSourceType.SQLITE,
            connectionConfig: { filePath: dbPath, isExcel: true, tableName }
        });

        const adapter = this.adapterFactory.getAdapter(DataSourceType.SQLITE, dataSource.connectionConfig) as SQLiteAdapter;
        await adapter.connect();
        await adapter.ingestFile(filePath, tableName);
        await adapter.disconnect();

        // Log file ingestion
        await this.auditService.log(
            AuditAction.DATA_SOURCE_ACCESSED,
            userId ? { id: userId } as any : null,
            { dataSourceId: dataSource.id, fileName: path.basename(filePath), type: 'excel_ingestion', tableName }
        );

        return dataSource;
    }
}

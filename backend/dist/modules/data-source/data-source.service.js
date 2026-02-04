"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data_source_entity_1 = require("./entities/data-source.entity");
const adapter_factory_1 = require("./adapters/adapter.factory");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const audit_service_1 = require("../audit/audit.service");
const audit_log_entity_1 = require("../audit/entities/audit-log.entity");
let DataSourceService = class DataSourceService {
    dataSourceRepository;
    adapterFactory;
    auditService;
    constructor(dataSourceRepository, adapterFactory, auditService) {
        this.dataSourceRepository = dataSourceRepository;
        this.adapterFactory = adapterFactory;
        this.auditService = auditService;
    }
    async create(data) {
        const dataSource = this.dataSourceRepository.create(data);
        return this.dataSourceRepository.save(dataSource);
    }
    async findAll() {
        return this.dataSourceRepository.find();
    }
    async findOne(id) {
        const dataSource = await this.dataSourceRepository.findOne({ where: { id } });
        if (!dataSource) {
            throw new common_1.NotFoundException(`Data source with ID ${id} not found`);
        }
        return dataSource;
    }
    async update(id, data) {
        await this.dataSourceRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.dataSourceRepository.delete(id);
    }
    async testConnection(id) {
        const dataSource = await this.findOne(id);
        return this.testConnectionConfig(dataSource.type, dataSource.connectionConfig);
    }
    async testConnectionConfig(type, config) {
        const adapter = this.adapterFactory.getAdapter(type, config);
        try {
            return await adapter.test();
        }
        catch (error) {
            throw new common_1.BadRequestException(`Connection Test Failed: ${error.message}`);
        }
    }
    async getSchemas(id) {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            return await adapter.getSchemas();
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to fetch schemas: ${error.message}`);
        }
    }
    async getTables(id, schema) {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            return await adapter.getTables(schema);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to fetch tables: ${error.message}`);
        }
    }
    async getColumns(id, schema, table) {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            return await adapter.getColumns(schema, table);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to fetch columns: ${error.message}`);
        }
    }
    async runRawQuery(id, sql, userId) {
        const dataSource = await this.findOne(id);
        const adapter = this.adapterFactory.getAdapter(dataSource.type, dataSource.connectionConfig);
        try {
            const result = await adapter.runQuery(sql);
            await this.auditService.log(audit_log_entity_1.AuditAction.QUERY_EXECUTED, userId ? { id: userId } : null, { dataSourceId: id, sql, success: true });
            return result;
        }
        catch (error) {
            await this.auditService.log(audit_log_entity_1.AuditAction.QUERY_EXECUTED, userId ? { id: userId } : null, { dataSourceId: id, sql, success: false }, undefined, undefined, false, error.message);
            throw error;
        }
    }
    async createFromExcel(filePath, name, tableName = 'data', userId) {
        const ext = path.extname(filePath).toLowerCase();
        if (ext !== '.xlsx' && ext !== '.csv' && ext !== '.xls') {
            fs.unlinkSync(filePath);
            throw new Error('Unsupported file format. Please upload .xlsx, .xls or .csv');
        }
        const dbDir = './data/sqlite';
        if (!fs.existsSync(dbDir))
            fs.mkdirSync(dbDir, { recursive: true });
        const dbFileName = `${Date.now()}.sqlite`;
        const dbPath = path.join(dbDir, dbFileName);
        const dataSource = await this.create({
            name,
            type: data_source_entity_1.DataSourceType.SQLITE,
            connectionConfig: { filePath: dbPath, isExcel: true, tableName }
        });
        const adapter = this.adapterFactory.getAdapter(data_source_entity_1.DataSourceType.SQLITE, dataSource.connectionConfig);
        await adapter.connect();
        await adapter.ingestFile(filePath, tableName);
        await adapter.disconnect();
        await this.auditService.log(audit_log_entity_1.AuditAction.DATA_SOURCE_ACCESSED, userId ? { id: userId } : null, { dataSourceId: dataSource.id, fileName: path.basename(filePath), type: 'excel_ingestion', tableName });
        return dataSource;
    }
};
exports.DataSourceService = DataSourceService;
exports.DataSourceService = DataSourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_source_entity_1.DataSourceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        adapter_factory_1.AdapterFactory,
        audit_service_1.AuditService])
], DataSourceService);
//# sourceMappingURL=data-source.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryService = void 0;
const common_1 = require("@nestjs/common");
const data_source_service_1 = require("../data-source/data-source.service");
const sql_validator_1 = require("./sql-validator");
let QueryService = class QueryService {
    dataSourceService;
    validator;
    constructor(dataSourceService) {
        this.dataSourceService = dataSourceService;
        this.validator = new sql_validator_1.SqlValidator();
    }
    async executeQuery(dataSourceId, sql, user) {
        const dataSource = await this.dataSourceService.findOne(dataSourceId);
        if (!this.validator.validateReadOnly(sql, dataSource.type)) {
            throw new common_1.BadRequestException('Only SELECT queries are allowed for security reasons.');
        }
        let processedSql = this.validator.sanitize(sql);
        if (user && user.organization) {
            processedSql = this.applyRLS(processedSql, user);
        }
        console.log(`[QueryService] Executing SQL: "${processedSql}" on data-source: ${dataSourceId}`);
        try {
            return await this.dataSourceService.runRawQuery(dataSourceId, processedSql, user?.id);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Query Execution Error: ${error.message}`);
        }
    }
    applyRLS(sql, user) {
        if (!user.organization)
            return sql;
        const orgId = user.organization.id;
        const rlsFilter = `organization_id = '${orgId}'`;
        if (sql.toLowerCase().includes('where')) {
            return sql.replace(/where/i, `WHERE (${rlsFilter}) AND `);
        }
        else {
            if (sql.toLowerCase().includes('order by')) {
                return sql.replace(/order by/i, `WHERE ${rlsFilter} ORDER BY`);
            }
            if (sql.toLowerCase().includes('limit')) {
                return sql.replace(/limit/i, `WHERE ${rlsFilter} LIMIT`);
            }
            return `${sql} WHERE ${rlsFilter}`;
        }
    }
};
exports.QueryService = QueryService;
exports.QueryService = QueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_source_service_1.DataSourceService])
], QueryService);
//# sourceMappingURL=query.service.js.map
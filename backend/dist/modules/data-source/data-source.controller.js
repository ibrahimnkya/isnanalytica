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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const data_source_service_1 = require("./data-source.service");
const multer_1 = require("multer");
const path_1 = require("path");
let DataSourceController = class DataSourceController {
    dataSourceService;
    constructor(dataSourceService) {
        this.dataSourceService = dataSourceService;
    }
    create(data) {
        return this.dataSourceService.create(data);
    }
    findAll() {
        return this.dataSourceService.findAll();
    }
    findOne(id) {
        return this.dataSourceService.findOne(id);
    }
    update(id, data) {
        return this.dataSourceService.update(id, data);
    }
    remove(id) {
        return this.dataSourceService.remove(id);
    }
    async testRawConnection(data) {
        const success = await this.dataSourceService.testConnectionConfig(data.type, data.connectionConfig);
        return { success };
    }
    async testConnection(id) {
        const success = await this.dataSourceService.testConnection(id);
        return { success };
    }
    getSchemas(id) {
        console.log(`[DataSourceController] GET schemas for ID: ${id}`);
        return this.dataSourceService.getSchemas(id);
    }
    getTables(id, schema) {
        console.log(`[DataSourceController] GET tables for ID: ${id}, schema: ${schema}`);
        return this.dataSourceService.getTables(id, schema);
    }
    getColumns(id, schema, table) {
        return this.dataSourceService.getColumns(id, schema, table);
    }
    runQuery(id, sql) {
        return this.dataSourceService.runRawQuery(id, sql);
    }
    async uploadFile(file, name, tableName) {
        return this.dataSourceService.createFromExcel(file.path, name, tableName);
    }
};
exports.DataSourceController = DataSourceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataSourceController.prototype, "testRawConnection", null);
__decorate([
    (0, common_1.Post)(':id/test'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataSourceController.prototype, "testConnection", null);
__decorate([
    (0, common_1.Get)(':id/schemas'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "getSchemas", null);
__decorate([
    (0, common_1.Get)(':id/schemas/:schema/tables'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('schema')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "getTables", null);
__decorate([
    (0, common_1.Get)(':id/schemas/:schema/tables/:table/columns'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('schema')),
    __param(2, (0, common_1.Param)('table')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "getColumns", null);
__decorate([
    (0, common_1.Post)(':id/query'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('sql')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DataSourceController.prototype, "runQuery", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataSourceController.prototype, "uploadFile", null);
exports.DataSourceController = DataSourceController = __decorate([
    (0, common_1.Controller)('data-sources'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [data_source_service_1.DataSourceService])
], DataSourceController);
//# sourceMappingURL=data-source.controller.js.map
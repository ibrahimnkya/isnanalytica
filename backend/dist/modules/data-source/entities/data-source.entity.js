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
exports.DataSourceEntity = exports.DataSourceType = void 0;
const typeorm_1 = require("typeorm");
var DataSourceType;
(function (DataSourceType) {
    DataSourceType["POSTGRES"] = "postgres";
    DataSourceType["MYSQL"] = "mysql";
    DataSourceType["MSSQL"] = "mssql";
    DataSourceType["BIGQUERY"] = "bigquery";
    DataSourceType["SQLITE"] = "sqlite";
})(DataSourceType || (exports.DataSourceType = DataSourceType = {}));
let DataSourceEntity = class DataSourceEntity {
    id;
    name;
    type;
    connectionConfig;
    createdAt;
    updatedAt;
};
exports.DataSourceEntity = DataSourceEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DataSourceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DataSourceEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DataSourceType,
        default: DataSourceType.POSTGRES,
    }),
    __metadata("design:type", String)
], DataSourceEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], DataSourceEntity.prototype, "connectionConfig", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DataSourceEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DataSourceEntity.prototype, "updatedAt", void 0);
exports.DataSourceEntity = DataSourceEntity = __decorate([
    (0, typeorm_1.Entity)('data_sources')
], DataSourceEntity);
//# sourceMappingURL=data-source.entity.js.map
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
exports.CalculatedFieldEntity = exports.DimensionEntity = exports.MetricEntity = exports.DatasetEntity = exports.TargetPeriod = exports.DataType = void 0;
const typeorm_1 = require("typeorm");
const data_source_entity_1 = require("../../data-source/entities/data-source.entity");
var DataType;
(function (DataType) {
    DataType["STRING"] = "string";
    DataType["NUMBER"] = "number";
    DataType["DATE"] = "date";
    DataType["BOOLEAN"] = "boolean";
})(DataType || (exports.DataType = DataType = {}));
var TargetPeriod;
(function (TargetPeriod) {
    TargetPeriod["DAILY"] = "daily";
    TargetPeriod["WEEKLY"] = "weekly";
    TargetPeriod["MONTHLY"] = "monthly";
    TargetPeriod["QUARTERLY"] = "quarterly";
    TargetPeriod["YEARLY"] = "yearly";
})(TargetPeriod || (exports.TargetPeriod = TargetPeriod = {}));
let DatasetEntity = class DatasetEntity {
    id;
    name;
    description;
    tableName;
    schema;
    dataSource;
    metrics;
    dimensions;
    calculatedFields;
    businessContext;
    createdAt;
    updatedAt;
};
exports.DatasetEntity = DatasetEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DatasetEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DatasetEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatasetEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DatasetEntity.prototype, "tableName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatasetEntity.prototype, "schema", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => data_source_entity_1.DataSourceEntity, { onDelete: 'CASCADE' }),
    __metadata("design:type", data_source_entity_1.DataSourceEntity)
], DatasetEntity.prototype, "dataSource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MetricEntity, (metric) => metric.dataset, { cascade: true }),
    __metadata("design:type", Array)
], DatasetEntity.prototype, "metrics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DimensionEntity, (dimension) => dimension.dataset, { cascade: true }),
    __metadata("design:type", Array)
], DatasetEntity.prototype, "dimensions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CalculatedFieldEntity, (field) => field.dataset, { cascade: true }),
    __metadata("design:type", Array)
], DatasetEntity.prototype, "calculatedFields", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DatasetEntity.prototype, "businessContext", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DatasetEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DatasetEntity.prototype, "updatedAt", void 0);
exports.DatasetEntity = DatasetEntity = __decorate([
    (0, typeorm_1.Entity)('datasets')
], DatasetEntity);
let MetricEntity = class MetricEntity {
    id;
    name;
    expression;
    target;
    targetPeriod;
    businessContext;
    unit;
    dataset;
    createdAt;
};
exports.MetricEntity = MetricEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MetricEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MetricEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MetricEntity.prototype, "expression", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], MetricEntity.prototype, "target", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: TargetPeriod, nullable: true }),
    __metadata("design:type", String)
], MetricEntity.prototype, "targetPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MetricEntity.prototype, "businessContext", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MetricEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DatasetEntity, (dataset) => dataset.metrics, { onDelete: 'CASCADE' }),
    __metadata("design:type", DatasetEntity)
], MetricEntity.prototype, "dataset", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MetricEntity.prototype, "createdAt", void 0);
exports.MetricEntity = MetricEntity = __decorate([
    (0, typeorm_1.Entity)('metrics')
], MetricEntity);
let DimensionEntity = class DimensionEntity {
    id;
    name;
    expression;
    dataset;
    dataType;
    createdAt;
};
exports.DimensionEntity = DimensionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DimensionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DimensionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DimensionEntity.prototype, "expression", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DatasetEntity, (dataset) => dataset.dimensions, { onDelete: 'CASCADE' }),
    __metadata("design:type", DatasetEntity)
], DimensionEntity.prototype, "dataset", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: DataType, default: DataType.STRING }),
    __metadata("design:type", String)
], DimensionEntity.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DimensionEntity.prototype, "createdAt", void 0);
exports.DimensionEntity = DimensionEntity = __decorate([
    (0, typeorm_1.Entity)('dimensions')
], DimensionEntity);
let CalculatedFieldEntity = class CalculatedFieldEntity {
    id;
    name;
    expression;
    dataType;
    description;
    dataset;
    createdAt;
};
exports.CalculatedFieldEntity = CalculatedFieldEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CalculatedFieldEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CalculatedFieldEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CalculatedFieldEntity.prototype, "expression", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: DataType, default: DataType.STRING }),
    __metadata("design:type", String)
], CalculatedFieldEntity.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CalculatedFieldEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DatasetEntity, (dataset) => dataset.calculatedFields, { onDelete: 'CASCADE' }),
    __metadata("design:type", DatasetEntity)
], CalculatedFieldEntity.prototype, "dataset", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CalculatedFieldEntity.prototype, "createdAt", void 0);
exports.CalculatedFieldEntity = CalculatedFieldEntity = __decorate([
    (0, typeorm_1.Entity)('calculated_fields')
], CalculatedFieldEntity);
//# sourceMappingURL=dataset.entity.js.map
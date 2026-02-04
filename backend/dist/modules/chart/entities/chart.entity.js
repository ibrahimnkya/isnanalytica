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
exports.ChartEntity = void 0;
const typeorm_1 = require("typeorm");
const dataset_entity_1 = require("../../dataset/entities/dataset.entity");
let ChartEntity = class ChartEntity {
    id;
    name;
    description;
    type;
    config;
    dataset;
    createdAt;
    updatedAt;
};
exports.ChartEntity = ChartEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChartEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChartEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ChartEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChartEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], ChartEntity.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataset_entity_1.DatasetEntity),
    __metadata("design:type", dataset_entity_1.DatasetEntity)
], ChartEntity.prototype, "dataset", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChartEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChartEntity.prototype, "updatedAt", void 0);
exports.ChartEntity = ChartEntity = __decorate([
    (0, typeorm_1.Entity)('charts')
], ChartEntity);
//# sourceMappingURL=chart.entity.js.map
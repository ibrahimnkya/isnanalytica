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
exports.MetricTemplateEntity = exports.BusinessSector = void 0;
const typeorm_1 = require("typeorm");
var BusinessSector;
(function (BusinessSector) {
    BusinessSector["RETAIL"] = "Retail";
    BusinessSector["LOGISTICS"] = "Logistics";
    BusinessSector["FINANCE"] = "Finance";
    BusinessSector["AGRICULTURE"] = "Agriculture";
})(BusinessSector || (exports.BusinessSector = BusinessSector = {}));
let MetricTemplateEntity = class MetricTemplateEntity {
    id;
    name;
    description;
    sector;
    expressionTemplate;
    requiredColumns;
    businessContext;
    unit;
    createdAt;
};
exports.MetricTemplateEntity = MetricTemplateEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: BusinessSector }),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "expressionTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], MetricTemplateEntity.prototype, "requiredColumns", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "businessContext", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MetricTemplateEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MetricTemplateEntity.prototype, "createdAt", void 0);
exports.MetricTemplateEntity = MetricTemplateEntity = __decorate([
    (0, typeorm_1.Entity)('metric_templates')
], MetricTemplateEntity);
//# sourceMappingURL=metric-template.entity.js.map
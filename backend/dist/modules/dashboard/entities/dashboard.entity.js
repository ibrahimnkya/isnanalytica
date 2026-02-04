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
exports.DashboardEntity = void 0;
const typeorm_1 = require("typeorm");
const chart_entity_1 = require("../../chart/entities/chart.entity");
let DashboardEntity = class DashboardEntity {
    id;
    name;
    description;
    layout;
    charts;
    createdAt;
    updatedAt;
};
exports.DashboardEntity = DashboardEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DashboardEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DashboardEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DashboardEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DashboardEntity.prototype, "layout", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => chart_entity_1.ChartEntity),
    (0, typeorm_1.JoinTable)({ name: 'dashboard_charts' }),
    __metadata("design:type", Array)
], DashboardEntity.prototype, "charts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DashboardEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DashboardEntity.prototype, "updatedAt", void 0);
exports.DashboardEntity = DashboardEntity = __decorate([
    (0, typeorm_1.Entity)('dashboards')
], DashboardEntity);
//# sourceMappingURL=dashboard.entity.js.map
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
exports.ReportEntity = exports.ReportFormat = exports.ReportFrequency = void 0;
const typeorm_1 = require("typeorm");
const dashboard_entity_1 = require("../../dashboard/entities/dashboard.entity");
const user_entity_1 = require("../../user/user.entity");
var ReportFrequency;
(function (ReportFrequency) {
    ReportFrequency["DAILY"] = "daily";
    ReportFrequency["WEEKLY"] = "weekly";
    ReportFrequency["MONTHLY"] = "monthly";
})(ReportFrequency || (exports.ReportFrequency = ReportFrequency = {}));
var ReportFormat;
(function (ReportFormat) {
    ReportFormat["PDF"] = "pdf";
    ReportFormat["EXCEL"] = "excel";
    ReportFormat["EMAIL"] = "email";
})(ReportFormat || (exports.ReportFormat = ReportFormat = {}));
let ReportEntity = class ReportEntity {
    id;
    name;
    description;
    dashboard;
    frequency;
    formats;
    recipients;
    isActive;
    lastRunAt;
    nextRunAt;
    createdBy;
    createdAt;
    updatedAt;
};
exports.ReportEntity = ReportEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReportEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ReportEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dashboard_entity_1.DashboardEntity, { eager: true }),
    __metadata("design:type", dashboard_entity_1.DashboardEntity)
], ReportEntity.prototype, "dashboard", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: ReportFrequency }),
    __metadata("design:type", String)
], ReportEntity.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: ReportFormat, array: true, default: [ReportFormat.PDF] }),
    __metadata("design:type", Array)
], ReportEntity.prototype, "formats", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], ReportEntity.prototype, "recipients", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ReportEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ReportEntity.prototype, "lastRunAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ReportEntity.prototype, "nextRunAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], ReportEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReportEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReportEntity.prototype, "updatedAt", void 0);
exports.ReportEntity = ReportEntity = __decorate([
    (0, typeorm_1.Entity)('reports')
], ReportEntity);
//# sourceMappingURL=report.entity.js.map
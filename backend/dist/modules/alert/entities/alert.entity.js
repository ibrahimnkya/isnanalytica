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
exports.AlertLogEntity = exports.AlertEntity = exports.ComparisonOperator = exports.AlertStatus = exports.AlertType = void 0;
const typeorm_1 = require("typeorm");
const dataset_entity_1 = require("../../dataset/entities/dataset.entity");
const user_entity_1 = require("../../user/user.entity");
var AlertType;
(function (AlertType) {
    AlertType["THRESHOLD"] = "threshold";
    AlertType["TREND"] = "trend";
    AlertType["ANOMALY"] = "anomaly";
})(AlertType || (exports.AlertType = AlertType = {}));
var AlertStatus;
(function (AlertStatus) {
    AlertStatus["ACTIVE"] = "active";
    AlertStatus["TRIGGERED"] = "triggered";
    AlertStatus["RESOLVED"] = "resolved";
    AlertStatus["DISABLED"] = "disabled";
})(AlertStatus || (exports.AlertStatus = AlertStatus = {}));
var ComparisonOperator;
(function (ComparisonOperator) {
    ComparisonOperator["GREATER_THAN"] = ">";
    ComparisonOperator["LESS_THAN"] = "<";
    ComparisonOperator["EQUALS"] = "=";
    ComparisonOperator["GREATER_THAN_OR_EQUAL"] = ">=";
    ComparisonOperator["LESS_THAN_OR_EQUAL"] = "<=";
})(ComparisonOperator || (exports.ComparisonOperator = ComparisonOperator = {}));
let AlertEntity = class AlertEntity {
    id;
    name;
    description;
    type;
    metric;
    conditions;
    status;
    recipients;
    createdBy;
    lastTriggeredAt;
    lastCheckedAt;
    createdAt;
    updatedAt;
};
exports.AlertEntity = AlertEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AlertEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlertEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AlertEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: AlertType }),
    __metadata("design:type", String)
], AlertEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataset_entity_1.MetricEntity, { eager: true }),
    __metadata("design:type", dataset_entity_1.MetricEntity)
], AlertEntity.prototype, "metric", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], AlertEntity.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: AlertStatus, default: AlertStatus.ACTIVE }),
    __metadata("design:type", String)
], AlertEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], AlertEntity.prototype, "recipients", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], AlertEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AlertEntity.prototype, "lastTriggeredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AlertEntity.prototype, "lastCheckedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AlertEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AlertEntity.prototype, "updatedAt", void 0);
exports.AlertEntity = AlertEntity = __decorate([
    (0, typeorm_1.Entity)('alerts')
], AlertEntity);
let AlertLogEntity = class AlertLogEntity {
    id;
    alert;
    value;
    threshold;
    message;
    notificationSent;
    triggeredAt;
};
exports.AlertLogEntity = AlertLogEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AlertLogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AlertEntity, { onDelete: 'CASCADE' }),
    __metadata("design:type", AlertEntity)
], AlertLogEntity.prototype, "alert", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], AlertLogEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], AlertLogEntity.prototype, "threshold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AlertLogEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AlertLogEntity.prototype, "notificationSent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AlertLogEntity.prototype, "triggeredAt", void 0);
exports.AlertLogEntity = AlertLogEntity = __decorate([
    (0, typeorm_1.Entity)('alert_logs')
], AlertLogEntity);
//# sourceMappingURL=alert.entity.js.map
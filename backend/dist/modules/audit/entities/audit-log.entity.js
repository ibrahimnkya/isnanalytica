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
exports.AuditLogEntity = exports.AuditAction = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
var AuditAction;
(function (AuditAction) {
    AuditAction["QUERY_EXECUTED"] = "query_executed";
    AuditAction["DATA_SOURCE_ACCESSED"] = "data_source_accessed";
    AuditAction["DASHBOARD_VIEWED"] = "dashboard_viewed";
    AuditAction["EXPORT_GENERATED"] = "export_generated";
    AuditAction["ALERT_CREATED"] = "alert_created";
    AuditAction["ALERT_TRIGGERED"] = "alert_triggered";
    AuditAction["USER_LOGIN"] = "user_login";
    AuditAction["USER_LOGOUT"] = "user_logout";
    AuditAction["ORGANIZATION_CREATED"] = "organization_created";
    AuditAction["ORGANIZATION_UPDATED"] = "organization_updated";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
let AuditLogEntity = class AuditLogEntity {
    id;
    user;
    action;
    metadata;
    ipAddress;
    userAgent;
    success;
    errorMessage;
    timestamp;
};
exports.AuditLogEntity = AuditLogEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], AuditLogEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum', enum: AuditAction }),
    __metadata("design:type", String)
], AuditLogEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AuditLogEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogEntity.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], AuditLogEntity.prototype, "success", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AuditLogEntity.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AuditLogEntity.prototype, "timestamp", void 0);
exports.AuditLogEntity = AuditLogEntity = __decorate([
    (0, typeorm_1.Entity)('audit_logs')
], AuditLogEntity);
//# sourceMappingURL=audit-log.entity.js.map
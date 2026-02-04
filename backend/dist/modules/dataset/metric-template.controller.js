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
exports.MetricTemplateController = void 0;
const common_1 = require("@nestjs/common");
const metric_template_service_1 = require("./metric-template.service");
const metric_template_entity_1 = require("./entities/metric-template.entity");
let MetricTemplateController = class MetricTemplateController {
    templateService;
    constructor(templateService) {
        this.templateService = templateService;
    }
    findAll() {
        return this.templateService.findAll();
    }
    findBySector(sector) {
        return this.templateService.findBySector(sector);
    }
    seed() {
        return this.templateService.seedTemplates();
    }
};
exports.MetricTemplateController = MetricTemplateController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricTemplateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sector/:sector'),
    __param(0, (0, common_1.Param)('sector')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetricTemplateController.prototype, "findBySector", null);
__decorate([
    (0, common_1.Get)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricTemplateController.prototype, "seed", null);
exports.MetricTemplateController = MetricTemplateController = __decorate([
    (0, common_1.Controller)('metric-templates'),
    __metadata("design:paramtypes", [metric_template_service_1.MetricTemplateService])
], MetricTemplateController);
//# sourceMappingURL=metric-template.controller.js.map
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
exports.DatasetController = void 0;
const common_1 = require("@nestjs/common");
const dataset_service_1 = require("./dataset.service");
const metric_template_service_1 = require("./metric-template.service");
let DatasetController = class DatasetController {
    datasetService;
    metricTemplateService;
    constructor(datasetService, metricTemplateService) {
        this.datasetService = datasetService;
        this.metricTemplateService = metricTemplateService;
    }
    create(data) {
        return this.datasetService.create(data);
    }
    findAll() {
        return this.datasetService.findAll();
    }
    findOne(id) {
        return this.datasetService.findOne(id);
    }
    addMetric(id, data) {
        return this.datasetService.addMetric(id, data);
    }
    addDimension(id, data) {
        return this.datasetService.addDimension(id, data);
    }
    removeMetric(id) {
        return this.datasetService.removeMetric(id);
    }
    removeDimension(id) {
        return this.datasetService.removeDimension(id);
    }
    generateSql(id, options) {
        return this.datasetService.generateSql(id, options);
    }
    applyTemplate(datasetId, templateId, mapping) {
        return this.metricTemplateService.applyTemplate(templateId, datasetId, mapping);
    }
};
exports.DatasetController = DatasetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/metrics'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "addMetric", null);
__decorate([
    (0, common_1.Post)(':id/dimensions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "addDimension", null);
__decorate([
    (0, common_1.Delete)('metrics/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "removeMetric", null);
__decorate([
    (0, common_1.Delete)('dimensions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "removeDimension", null);
__decorate([
    (0, common_1.Post)(':id/generate-sql'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "generateSql", null);
__decorate([
    (0, common_1.Post)(':id/templates/:templateId/apply'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('templateId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "applyTemplate", null);
exports.DatasetController = DatasetController = __decorate([
    (0, common_1.Controller)('datasets'),
    __metadata("design:paramtypes", [dataset_service_1.DatasetService,
        metric_template_service_1.MetricTemplateService])
], DatasetController);
//# sourceMappingURL=dataset.controller.js.map
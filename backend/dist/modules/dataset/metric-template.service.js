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
exports.MetricTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const metric_template_entity_1 = require("./entities/metric-template.entity");
const dataset_entity_1 = require("./entities/dataset.entity");
let MetricTemplateService = class MetricTemplateService {
    templateRepository;
    metricRepository;
    datasetRepository;
    constructor(templateRepository, metricRepository, datasetRepository) {
        this.templateRepository = templateRepository;
        this.metricRepository = metricRepository;
        this.datasetRepository = datasetRepository;
    }
    async findAll() {
        return this.templateRepository.find();
    }
    async findBySector(sector) {
        return this.templateRepository.find({ where: { sector } });
    }
    async applyTemplate(templateId, datasetId, mapping) {
        const template = await this.templateRepository.findOne({ where: { id: templateId } });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        const dataset = await this.datasetRepository.findOne({ where: { id: datasetId } });
        if (!dataset)
            throw new common_1.NotFoundException('Dataset not found');
        let expression = template.expressionTemplate;
        for (const [placeholder, columnName] of Object.entries(mapping)) {
            const regex = new RegExp(`{{${placeholder}}}`, 'g');
            expression = expression.replace(regex, columnName);
        }
        const newMetric = this.metricRepository.create({
            name: template.name,
            expression,
            businessContext: template.businessContext,
            unit: template.unit,
            dataset,
        });
        return this.metricRepository.save(newMetric);
    }
    async seedTemplates() {
        const count = await this.templateRepository.count();
        if (count > 0)
            return;
        const templates = [
            {
                name: 'Total Sales Revenue',
                sector: metric_template_entity_1.BusinessSector.RETAIL,
                description: 'Sum of all sales transactions for the period.',
                expressionTemplate: 'SUM({{amount}})',
                requiredColumns: ['amount'],
                businessContext: 'Core revenue tracking for branch-wise performance.',
                unit: 'TZS'
            },
            {
                name: 'Gross Margin %',
                sector: metric_template_entity_1.BusinessSector.RETAIL,
                description: 'Profit percentage after cost of goods sold.',
                expressionTemplate: '(SUM({{revenue}}) - SUM({{cost}})) / SUM({{revenue}}) * 100',
                requiredColumns: ['revenue', 'cost'],
                businessContext: 'Profitability metric for cross-branch comparison.',
                unit: '%'
            },
            {
                name: 'NPL Ratio',
                sector: metric_template_entity_1.BusinessSector.FINANCE,
                description: 'Percentage of non-performing loans in the portfolio.',
                expressionTemplate: 'SUM(CASE WHEN {{days_past_due}} > 90 THEN {{balance}} ELSE 0 END) / SUM({{balance}}) * 100',
                requiredColumns: ['days_past_due', 'balance'],
                businessContext: 'Critical risk monitoring for micro-finance institutions.',
                unit: '%'
            },
            {
                name: 'On-time Delivery Rate',
                sector: metric_template_entity_1.BusinessSector.LOGISTICS,
                description: 'Percentage of shipments delivered within SLA.',
                expressionTemplate: 'COUNT(CASE WHEN {{delivered_at}} <= {{promised_at}} THEN 1 END) / COUNT(*) * 100',
                requiredColumns: ['delivered_at', 'promised_at'],
                businessContext: 'Reliability metric for supply chain performance.',
                unit: '%'
            }
        ];
        await this.templateRepository.save(this.templateRepository.create(templates));
    }
};
exports.MetricTemplateService = MetricTemplateService;
exports.MetricTemplateService = MetricTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metric_template_entity_1.MetricTemplateEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(dataset_entity_1.MetricEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(dataset_entity_1.DatasetEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MetricTemplateService);
//# sourceMappingURL=metric-template.service.js.map
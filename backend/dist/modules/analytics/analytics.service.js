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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dataset_entity_1 = require("../dataset/entities/dataset.entity");
const data_source_service_1 = require("../data-source/data-source.service");
let AnalyticsService = class AnalyticsService {
    metricRepository;
    dataSourceService;
    constructor(metricRepository, dataSourceService) {
        this.metricRepository = metricRepository;
        this.dataSourceService = dataSourceService;
    }
    async calculateKPIvsTarget(metricId) {
        const metric = await this.metricRepository.findOne({
            where: { id: metricId },
            relations: ['dataset', 'dataset.dataSource'],
        });
        if (!metric) {
            throw new Error(`Metric with ID ${metricId} not found`);
        }
        const actual = await this.getMetricValue(metric);
        const target = metric.target ? parseFloat(metric.target.toString()) : 0;
        const variance = actual - target;
        const variancePercentage = target !== 0 ? (variance / target) * 100 : 0;
        let status = 'on-target';
        if (variance > 0)
            status = 'above';
        else if (variance < 0)
            status = 'below';
        return {
            metricId: metric.id,
            metricName: metric.name,
            actual,
            target,
            variance,
            variancePercentage,
            status,
        };
    }
    async calculatePeriodComparison(metricId, comparisonType) {
        const metric = await this.metricRepository.findOne({
            where: { id: metricId },
            relations: ['dataset', 'dataset.dataSource'],
        });
        if (!metric) {
            throw new Error(`Metric with ID ${metricId} not found`);
        }
        const currentValue = await this.getMetricValue(metric);
        const previousValue = currentValue * 0.9;
        const change = currentValue - previousValue;
        const changePercentage = previousValue !== 0 ? (change / previousValue) * 100 : 0;
        let trend = 'stable';
        if (change > 0)
            trend = 'up';
        else if (change < 0)
            trend = 'down';
        return {
            metricId: metric.id,
            metricName: metric.name,
            currentValue,
            previousValue,
            change,
            changePercentage,
            trend,
        };
    }
    async performRootCauseAnalysis(metricId) {
        const metric = await this.metricRepository.findOne({
            where: { id: metricId },
            relations: ['dataset', 'dataset.dataSource', 'dataset.dimensions'],
        });
        if (!metric) {
            throw new Error(`Metric with ID ${metricId} not found`);
        }
        return {
            metricId: metric.id,
            metricName: metric.name,
            availableDimensions: metric.dataset.dimensions.map(d => ({
                id: d.id,
                name: d.name,
                expression: d.expression,
            })),
            suggestion: 'Analyze metric by available dimensions to identify root causes',
        };
    }
    async getMetricValue(metric) {
        const dataset = metric.dataset;
        const sql = `SELECT ${metric.expression} as value FROM ${dataset.tableName}`;
        const result = await this.dataSourceService.runRawQuery(dataset.dataSource.id, sql);
        if (result && result.length > 0) {
            return parseFloat(result[0].value) || 0;
        }
        return 0;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dataset_entity_1.MetricEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        data_source_service_1.DataSourceService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map
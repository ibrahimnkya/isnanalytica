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
exports.AlertService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alert_entity_1 = require("./entities/alert.entity");
const dataset_entity_1 = require("../dataset/entities/dataset.entity");
const data_source_service_1 = require("../data-source/data-source.service");
const dataset_service_1 = require("../dataset/dataset.service");
let AlertService = class AlertService {
    alertRepository;
    alertLogRepository;
    metricRepository;
    dataSourceService;
    datasetService;
    constructor(alertRepository, alertLogRepository, metricRepository, dataSourceService, datasetService) {
        this.alertRepository = alertRepository;
        this.alertLogRepository = alertLogRepository;
        this.metricRepository = metricRepository;
        this.dataSourceService = dataSourceService;
        this.datasetService = datasetService;
    }
    async createAlert(data) {
        const alert = this.alertRepository.create(data);
        return this.alertRepository.save(alert);
    }
    async findAllAlerts() {
        return this.alertRepository.find({
            relations: ['metric', 'metric.dataset', 'createdBy'],
        });
    }
    async findAlert(id) {
        const alert = await this.alertRepository.findOne({
            where: { id },
            relations: ['metric', 'metric.dataset', 'createdBy'],
        });
        if (!alert) {
            throw new common_1.NotFoundException(`Alert with ID ${id} not found`);
        }
        return alert;
    }
    async updateAlert(id, data) {
        await this.alertRepository.update(id, data);
        return this.findAlert(id);
    }
    async deleteAlert(id) {
        const result = await this.alertRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Alert with ID ${id} not found`);
        }
    }
    async getAlertLogs(alertId, limit = 50) {
        return this.alertLogRepository.find({
            where: { alert: { id: alertId } },
            order: { triggeredAt: 'DESC' },
            take: limit,
        });
    }
    async evaluateAllAlerts() {
        const activeAlerts = await this.alertRepository.find({
            where: { status: alert_entity_1.AlertStatus.ACTIVE },
            relations: ['metric', 'metric.dataset', 'metric.dataset.dataSource'],
        });
        for (const alert of activeAlerts) {
            try {
                await this.evaluateAlert(alert);
            }
            catch (error) {
                console.error(`Error evaluating alert ${alert.id}:`, error);
            }
        }
    }
    async evaluateAlert(alert) {
        const currentValue = await this.getMetricValue(alert.metric);
        let shouldTrigger = false;
        let message = '';
        switch (alert.type) {
            case alert_entity_1.AlertType.THRESHOLD:
                const result = this.evaluateThreshold(currentValue, alert.conditions);
                shouldTrigger = result.triggered;
                message = result.message;
                break;
            case alert_entity_1.AlertType.TREND:
                break;
            case alert_entity_1.AlertType.ANOMALY:
                break;
        }
        if (shouldTrigger) {
            await this.triggerAlert(alert, currentValue, message);
        }
        await this.alertRepository.update(alert.id, {
            lastCheckedAt: new Date(),
        });
    }
    evaluateThreshold(value, conditions) {
        const { operator, value: threshold } = conditions;
        let triggered = false;
        switch (operator) {
            case '>':
                triggered = value > threshold;
                break;
            case '<':
                triggered = value < threshold;
                break;
            case '=':
                triggered = value === threshold;
                break;
            case '>=':
                triggered = value >= threshold;
                break;
            case '<=':
                triggered = value <= threshold;
                break;
        }
        const message = triggered
            ? `Alert triggered: Value ${value} ${operator} ${threshold}`
            : '';
        return { triggered, message };
    }
    async getMetricValue(metric) {
        const dataset = metric.dataset;
        const sql = `SELECT ${metric.expression} as value FROM ${dataset.tableName}`;
        const dataSource = dataset.dataSource;
        const result = await this.dataSourceService.runRawQuery(dataSource.id, sql);
        if (result && result.length > 0) {
            return parseFloat(result[0].value) || 0;
        }
        return 0;
    }
    async triggerAlert(alert, value, message) {
        const log = this.alertLogRepository.create({
            alert,
            value,
            threshold: alert.conditions.value,
            message,
            notificationSent: false,
        });
        await this.alertLogRepository.save(log);
        await this.alertRepository.update(alert.id, {
            status: alert_entity_1.AlertStatus.TRIGGERED,
            lastTriggeredAt: new Date(),
        });
        console.log(`Alert triggered: ${alert.name} - ${message}`);
    }
};
exports.AlertService = AlertService;
exports.AlertService = AlertService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.AlertEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(alert_entity_1.AlertLogEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(dataset_entity_1.MetricEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        data_source_service_1.DataSourceService,
        dataset_service_1.DatasetService])
], AlertService);
//# sourceMappingURL=alert.service.js.map
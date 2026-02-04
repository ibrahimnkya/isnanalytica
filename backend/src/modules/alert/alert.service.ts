import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { AlertEntity, AlertLogEntity, AlertStatus, AlertType } from './entities/alert.entity';
import { MetricEntity } from '../dataset/entities/dataset.entity';
import { DataSourceService } from '../data-source/data-source.service';
import { DatasetService } from '../dataset/dataset.service';

@Injectable()
export class AlertService {
    constructor(
        @InjectRepository(AlertEntity)
        private alertRepository: Repository<AlertEntity>,
        @InjectRepository(AlertLogEntity)
        private alertLogRepository: Repository<AlertLogEntity>,
        @InjectRepository(MetricEntity)
        private metricRepository: Repository<MetricEntity>,
        private dataSourceService: DataSourceService,
        private datasetService: DatasetService,
    ) { }

    async createAlert(data: Partial<AlertEntity>): Promise<AlertEntity> {
        const alert = this.alertRepository.create(data);
        return this.alertRepository.save(alert);
    }

    async findAllAlerts(): Promise<AlertEntity[]> {
        return this.alertRepository.find({
            relations: ['metric', 'metric.dataset', 'createdBy'],
        });
    }

    async findAlert(id: string): Promise<AlertEntity> {
        const alert = await this.alertRepository.findOne({
            where: { id },
            relations: ['metric', 'metric.dataset', 'createdBy'],
        });
        if (!alert) {
            throw new NotFoundException(`Alert with ID ${id} not found`);
        }
        return alert;
    }

    async updateAlert(id: string, data: Partial<AlertEntity>): Promise<AlertEntity> {
        await this.alertRepository.update(id, data);
        return this.findAlert(id);
    }

    async deleteAlert(id: string): Promise<void> {
        const result = await this.alertRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Alert with ID ${id} not found`);
        }
    }

    async getAlertLogs(alertId: string, limit: number = 50): Promise<AlertLogEntity[]> {
        return this.alertLogRepository.find({
            where: { alert: { id: alertId } },
            order: { triggeredAt: 'DESC' },
            take: limit,
        });
    }

    /**
     * Evaluate all active alerts
     * This should be called by a cron job periodically
     */
    async evaluateAllAlerts(): Promise<void> {
        const activeAlerts = await this.alertRepository.find({
            where: { status: AlertStatus.ACTIVE },
            relations: ['metric', 'metric.dataset', 'metric.dataset.dataSource'],
        });

        for (const alert of activeAlerts) {
            try {
                await this.evaluateAlert(alert);
            } catch (error) {
                console.error(`Error evaluating alert ${alert.id}:`, error);
            }
        }
    }

    /**
     * Evaluate a single alert
     */
    private async evaluateAlert(alert: AlertEntity): Promise<void> {
        const currentValue = await this.getMetricValue(alert.metric);

        let shouldTrigger = false;
        let message = '';

        switch (alert.type) {
            case AlertType.THRESHOLD:
                const result = this.evaluateThreshold(currentValue, alert.conditions);
                shouldTrigger = result.triggered;
                message = result.message;
                break;

            case AlertType.TREND:
                // Trend analysis (WoW, MoM, YoY) - to be implemented
                break;

            case AlertType.ANOMALY:
                // Anomaly detection - to be implemented
                break;
        }

        if (shouldTrigger) {
            await this.triggerAlert(alert, currentValue, message);
        }

        // Update last checked time
        await this.alertRepository.update(alert.id, {
            lastCheckedAt: new Date(),
        });
    }

    /**
     * Evaluate threshold condition
     */
    private evaluateThreshold(
        value: number,
        conditions: any
    ): { triggered: boolean; message: string } {
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

    /**
     * Get current value of a metric
     */
    private async getMetricValue(metric: MetricEntity): Promise<number> {
        const dataset = metric.dataset;
        const sql = `SELECT ${metric.expression} as value FROM ${dataset.tableName}`;

        const dataSource = dataset.dataSource;
        const result = await this.dataSourceService.runRawQuery(dataSource.id, sql);

        if (result && result.length > 0) {
            return parseFloat(result[0].value) || 0;
        }

        return 0;
    }

    /**
     * Trigger an alert and log it
     */
    private async triggerAlert(alert: AlertEntity, value: number, message: string): Promise<void> {
        // Create log entry
        const log = this.alertLogRepository.create({
            alert,
            value,
            threshold: alert.conditions.value,
            message,
            notificationSent: false,
        });
        await this.alertLogRepository.save(log);

        // Update alert status
        await this.alertRepository.update(alert.id, {
            status: AlertStatus.TRIGGERED,
            lastTriggeredAt: new Date(),
        });

        // TODO: Send notification via email/SMS/WhatsApp
        console.log(`Alert triggered: ${alert.name} - ${message}`);
    }
}

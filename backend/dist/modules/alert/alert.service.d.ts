import { Repository } from 'typeorm';
import { AlertEntity, AlertLogEntity } from './entities/alert.entity';
import { MetricEntity } from '../dataset/entities/dataset.entity';
import { DataSourceService } from '../data-source/data-source.service';
import { DatasetService } from '../dataset/dataset.service';
export declare class AlertService {
    private alertRepository;
    private alertLogRepository;
    private metricRepository;
    private dataSourceService;
    private datasetService;
    constructor(alertRepository: Repository<AlertEntity>, alertLogRepository: Repository<AlertLogEntity>, metricRepository: Repository<MetricEntity>, dataSourceService: DataSourceService, datasetService: DatasetService);
    createAlert(data: Partial<AlertEntity>): Promise<AlertEntity>;
    findAllAlerts(): Promise<AlertEntity[]>;
    findAlert(id: string): Promise<AlertEntity>;
    updateAlert(id: string, data: Partial<AlertEntity>): Promise<AlertEntity>;
    deleteAlert(id: string): Promise<void>;
    getAlertLogs(alertId: string, limit?: number): Promise<AlertLogEntity[]>;
    evaluateAllAlerts(): Promise<void>;
    private evaluateAlert;
    private evaluateThreshold;
    private getMetricValue;
    private triggerAlert;
}

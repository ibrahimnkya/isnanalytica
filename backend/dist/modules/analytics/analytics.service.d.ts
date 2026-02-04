import { Repository } from 'typeorm';
import { MetricEntity } from '../dataset/entities/dataset.entity';
import { DataSourceService } from '../data-source/data-source.service';
export interface KPIComparison {
    metricId: string;
    metricName: string;
    actual: number;
    target: number;
    variance: number;
    variancePercentage: number;
    status: 'above' | 'below' | 'on-target';
}
export interface PeriodComparison {
    metricId: string;
    metricName: string;
    currentValue: number;
    previousValue: number;
    change: number;
    changePercentage: number;
    trend: 'up' | 'down' | 'stable';
}
export declare class AnalyticsService {
    private metricRepository;
    private dataSourceService;
    constructor(metricRepository: Repository<MetricEntity>, dataSourceService: DataSourceService);
    calculateKPIvsTarget(metricId: string): Promise<KPIComparison>;
    calculatePeriodComparison(metricId: string, comparisonType: 'WoW' | 'MoM' | 'YoY'): Promise<PeriodComparison>;
    performRootCauseAnalysis(metricId: string): Promise<any>;
    private getMetricValue;
}

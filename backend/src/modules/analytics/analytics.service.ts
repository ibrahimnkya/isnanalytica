import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricEntity, TargetPeriod } from '../dataset/entities/dataset.entity';
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

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(MetricEntity)
        private metricRepository: Repository<MetricEntity>,
        private dataSourceService: DataSourceService,
    ) { }

    /**
     * Calculate KPI vs Target comparison
     */
    async calculateKPIvsTarget(metricId: string): Promise<KPIComparison> {
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

        let status: 'above' | 'below' | 'on-target' = 'on-target';
        if (variance > 0) status = 'above';
        else if (variance < 0) status = 'below';

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

    /**
     * Calculate period-over-period comparison
     */
    async calculatePeriodComparison(
        metricId: string,
        comparisonType: 'WoW' | 'MoM' | 'YoY'
    ): Promise<PeriodComparison> {
        const metric = await this.metricRepository.findOne({
            where: { id: metricId },
            relations: ['dataset', 'dataset.dataSource'],
        });

        if (!metric) {
            throw new Error(`Metric with ID ${metricId} not found`);
        }

        const currentValue = await this.getMetricValue(metric);

        // For now, return mock data. Full implementation would query historical data
        const previousValue = currentValue * 0.9; // Mock: 10% lower
        const change = currentValue - previousValue;
        const changePercentage = previousValue !== 0 ? (change / previousValue) * 100 : 0;

        let trend: 'up' | 'down' | 'stable' = 'stable';
        if (change > 0) trend = 'up';
        else if (change < 0) trend = 'down';

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

    /**
     * Perform root cause analysis (drill-down)
     * This is a simplified version - full implementation would analyze dimensions
     */
    async performRootCauseAnalysis(metricId: string): Promise<any> {
        const metric = await this.metricRepository.findOne({
            where: { id: metricId },
            relations: ['dataset', 'dataset.dataSource', 'dataset.dimensions'],
        });

        if (!metric) {
            throw new Error(`Metric with ID ${metricId} not found`);
        }

        // Return available dimensions for drill-down
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

    /**
     * Get current value of a metric
     */
    private async getMetricValue(metric: MetricEntity): Promise<number> {
        const dataset = metric.dataset;
        const sql = `SELECT ${metric.expression} as value FROM ${dataset.tableName}`;

        const result = await this.dataSourceService.runRawQuery(dataset.dataSource.id, sql);

        if (result && result.length > 0) {
            return parseFloat(result[0].value) || 0;
        }

        return 0;
    }
}

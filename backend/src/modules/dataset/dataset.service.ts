import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatasetEntity, MetricEntity, DimensionEntity } from './entities/dataset.entity';

@Injectable()
export class DatasetService {
    constructor(
        @InjectRepository(DatasetEntity)
        private datasetRepository: Repository<DatasetEntity>,
        @InjectRepository(MetricEntity)
        private metricRepository: Repository<MetricEntity>,
        @InjectRepository(DimensionEntity)
        private dimensionRepository: Repository<DimensionEntity>,
    ) { }

    async create(data: Partial<DatasetEntity>): Promise<DatasetEntity> {
        const dataset = this.datasetRepository.create(data);
        return this.datasetRepository.save(dataset);
    }

    async findAll(): Promise<DatasetEntity[]> {
        return this.datasetRepository.find({ relations: ['metrics', 'dimensions', 'dataSource'] });
    }

    async findOne(id: string): Promise<DatasetEntity> {
        const dataset = await this.datasetRepository.findOne({
            where: { id },
            relations: ['metrics', 'dimensions', 'dataSource'],
        });
        if (!dataset) {
            throw new NotFoundException(`Dataset with ID ${id} not found`);
        }
        return dataset;
    }

    async addMetric(datasetId: string, metricData: Partial<MetricEntity>): Promise<MetricEntity> {
        const dataset = await this.findOne(datasetId);
        const metric = this.metricRepository.create({ ...metricData, dataset });
        return this.metricRepository.save(metric);
    }

    async addDimension(datasetId: string, dimensionData: Partial<DimensionEntity>): Promise<DimensionEntity> {
        const dataset = await this.findOne(datasetId);
        const dimension = this.dimensionRepository.create({ ...dimensionData, dataset });
        return this.dimensionRepository.save(dimension);
    }

    async removeMetric(id: string): Promise<void> {
        await this.metricRepository.delete(id);
    }

    async removeDimension(id: string): Promise<void> {
        await this.dimensionRepository.delete(id);
    }

    // Helper to generate SQL from chosen dimensions and metrics
    async generateSql(datasetId: string, options: { dimensions: string[], metrics: string[], filters?: any }): Promise<string> {
        const dataset = await this.findOne(datasetId);

        const selectedDimensions = dataset.dimensions.filter(d => options.dimensions.includes(d.id));
        const selectedMetrics = dataset.metrics.filter(m => options.metrics.includes(m.id));

        if (selectedDimensions.length === 0 && selectedMetrics.length === 0) {
            return `SELECT * FROM ${dataset.tableName} LIMIT 100`;
        }

        const selectParts: string[] = [];
        const groupByParts: string[] = [];

        selectedDimensions.forEach(d => {
            selectParts.push(`${d.expression} AS "${d.name}"`);
            groupByParts.push(`${d.expression}`);
        });

        selectedMetrics.forEach(m => {
            selectParts.push(`${m.expression} AS "${m.name}"`);
        });

        let sql = `SELECT ${selectParts.join(', ')} FROM ${dataset.tableName}`;

        if (groupByParts.length > 0) {
            sql += ` GROUP BY ${groupByParts.join(', ')}`;
        }

        return sql;
    }
}

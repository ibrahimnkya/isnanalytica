import { Repository } from 'typeorm';
import { DatasetEntity, MetricEntity, DimensionEntity } from './entities/dataset.entity';
export declare class DatasetService {
    private datasetRepository;
    private metricRepository;
    private dimensionRepository;
    constructor(datasetRepository: Repository<DatasetEntity>, metricRepository: Repository<MetricEntity>, dimensionRepository: Repository<DimensionEntity>);
    create(data: Partial<DatasetEntity>): Promise<DatasetEntity>;
    findAll(): Promise<DatasetEntity[]>;
    findOne(id: string): Promise<DatasetEntity>;
    addMetric(datasetId: string, metricData: Partial<MetricEntity>): Promise<MetricEntity>;
    addDimension(datasetId: string, dimensionData: Partial<DimensionEntity>): Promise<DimensionEntity>;
    removeMetric(id: string): Promise<void>;
    removeDimension(id: string): Promise<void>;
    generateSql(datasetId: string, options: {
        dimensions: string[];
        metrics: string[];
        filters?: any;
    }): Promise<string>;
}

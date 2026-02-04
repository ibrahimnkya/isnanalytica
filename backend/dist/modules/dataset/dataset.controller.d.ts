import { DatasetService } from './dataset.service';
import { MetricTemplateService } from './metric-template.service';
import { DatasetEntity, MetricEntity, DimensionEntity } from './entities/dataset.entity';
export declare class DatasetController {
    private readonly datasetService;
    private readonly metricTemplateService;
    constructor(datasetService: DatasetService, metricTemplateService: MetricTemplateService);
    create(data: Partial<DatasetEntity>): Promise<DatasetEntity>;
    findAll(): Promise<DatasetEntity[]>;
    findOne(id: string): Promise<DatasetEntity>;
    addMetric(id: string, data: Partial<MetricEntity>): Promise<MetricEntity>;
    addDimension(id: string, data: Partial<DimensionEntity>): Promise<DimensionEntity>;
    removeMetric(id: string): Promise<void>;
    removeDimension(id: string): Promise<void>;
    generateSql(id: string, options: {
        dimensions: string[];
        metrics: string[];
    }): Promise<string>;
    applyTemplate(datasetId: string, templateId: string, mapping: Record<string, string>): Promise<MetricEntity>;
}

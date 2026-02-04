import { Repository } from 'typeorm';
import { MetricTemplateEntity, BusinessSector } from './entities/metric-template.entity';
import { DatasetEntity, MetricEntity } from './entities/dataset.entity';
export declare class MetricTemplateService {
    private templateRepository;
    private metricRepository;
    private datasetRepository;
    constructor(templateRepository: Repository<MetricTemplateEntity>, metricRepository: Repository<MetricEntity>, datasetRepository: Repository<DatasetEntity>);
    findAll(): Promise<MetricTemplateEntity[]>;
    findBySector(sector: BusinessSector): Promise<MetricTemplateEntity[]>;
    applyTemplate(templateId: string, datasetId: string, mapping: Record<string, string>): Promise<MetricEntity>;
    seedTemplates(): Promise<void>;
}

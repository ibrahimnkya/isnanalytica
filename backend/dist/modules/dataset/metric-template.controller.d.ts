import { MetricTemplateService } from './metric-template.service';
import { BusinessSector } from './entities/metric-template.entity';
export declare class MetricTemplateController {
    private readonly templateService;
    constructor(templateService: MetricTemplateService);
    findAll(): Promise<import("./entities/metric-template.entity").MetricTemplateEntity[]>;
    findBySector(sector: BusinessSector): Promise<import("./entities/metric-template.entity").MetricTemplateEntity[]>;
    seed(): Promise<void>;
}

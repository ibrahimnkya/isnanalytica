import { Controller, Get, Param } from '@nestjs/common';
import { MetricTemplateService } from './metric-template.service';
import { BusinessSector } from './entities/metric-template.entity';

@Controller('metric-templates')
export class MetricTemplateController {
    constructor(private readonly templateService: MetricTemplateService) { }

    @Get()
    findAll() {
        return this.templateService.findAll();
    }

    @Get('sector/:sector')
    findBySector(@Param('sector') sector: BusinessSector) {
        return this.templateService.findBySector(sector);
    }

    @Get('seed')
    seed() {
        return this.templateService.seedTemplates();
    }
}

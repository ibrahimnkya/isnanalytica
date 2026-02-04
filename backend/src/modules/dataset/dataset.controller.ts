import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { MetricTemplateService } from './metric-template.service';
import { DatasetEntity, MetricEntity, DimensionEntity } from './entities/dataset.entity';

@Controller('datasets')
export class DatasetController {
    constructor(
        private readonly datasetService: DatasetService,
        private readonly metricTemplateService: MetricTemplateService
    ) { }

    @Post()
    create(@Body() data: Partial<DatasetEntity>) {
        return this.datasetService.create(data);
    }

    @Get()
    findAll() {
        return this.datasetService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.datasetService.findOne(id);
    }

    @Post(':id/metrics')
    addMetric(@Param('id') id: string, @Body() data: Partial<MetricEntity>) {
        return this.datasetService.addMetric(id, data);
    }

    @Post(':id/dimensions')
    addDimension(@Param('id') id: string, @Body() data: Partial<DimensionEntity>) {
        return this.datasetService.addDimension(id, data);
    }

    @Delete('metrics/:id')
    removeMetric(@Param('id') id: string) {
        return this.datasetService.removeMetric(id);
    }

    @Delete('dimensions/:id')
    removeDimension(@Param('id') id: string) {
        return this.datasetService.removeDimension(id);
    }

    @Post(':id/generate-sql')
    generateSql(
        @Param('id') id: string,
        @Body() options: { dimensions: string[], metrics: string[] },
    ) {
        return this.datasetService.generateSql(id, options);
    }

    @Post(':id/templates/:templateId/apply')
    applyTemplate(
        @Param('id') datasetId: string,
        @Param('templateId') templateId: string,
        @Body() mapping: Record<string, string>
    ) {
        return this.metricTemplateService.applyTemplate(templateId, datasetId, mapping);
    }
}

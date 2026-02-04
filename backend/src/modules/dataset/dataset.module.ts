import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasetService } from './dataset.service';
import { DatasetController } from './dataset.controller';
import { MetricTemplateController } from './metric-template.controller';
import { DatasetEntity, MetricEntity, DimensionEntity, CalculatedFieldEntity } from './entities/dataset.entity';
import { MetricTemplateEntity } from './entities/metric-template.entity';
import { MetricTemplateService } from './metric-template.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    DatasetEntity,
    MetricEntity,
    DimensionEntity,
    CalculatedFieldEntity,
    MetricTemplateEntity
  ])],
  providers: [DatasetService, MetricTemplateService],
  controllers: [DatasetController, MetricTemplateController],
  exports: [DatasetService, MetricTemplateService],
})
export class DatasetModule { }

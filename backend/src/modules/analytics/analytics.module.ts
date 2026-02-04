import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MetricEntity } from '../dataset/entities/dataset.entity';
import { DataSourceModule } from '../data-source/data-source.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MetricEntity]),
        DataSourceModule,
    ],
    providers: [AnalyticsService],
    controllers: [AnalyticsController],
    exports: [AnalyticsService],
})
export class AnalyticsModule { }

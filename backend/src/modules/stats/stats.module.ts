import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { DataSourceEntity } from '../data-source/entities/data-source.entity';
import { DatasetEntity } from '../dataset/entities/dataset.entity';
import { ChartEntity } from '../chart/entities/chart.entity';
import { DashboardEntity } from '../dashboard/entities/dashboard.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DataSourceEntity,
            DatasetEntity,
            ChartEntity,
            DashboardEntity,
        ]),
    ],
    controllers: [StatsController],
    providers: [StatsService],
})
export class StatsModule { }

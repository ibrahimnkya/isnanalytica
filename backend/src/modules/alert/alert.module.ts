import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { AlertEntity, AlertLogEntity } from './entities/alert.entity';
import { MetricEntity } from '../dataset/entities/dataset.entity';
import { DataSourceModule } from '../data-source/data-source.module';
import { DatasetModule } from '../dataset/dataset.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AlertEntity, AlertLogEntity, MetricEntity]),
        DataSourceModule,
        DatasetModule,
    ],
    providers: [AlertService],
    controllers: [AlertController],
    exports: [AlertService],
})
export class AlertModule { }

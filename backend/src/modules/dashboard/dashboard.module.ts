import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardEntity } from './entities/dashboard.entity';
import { ChartEntity } from '../chart/entities/chart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardEntity, ChartEntity])],
  providers: [DashboardService],
  controllers: [DashboardController],
  exports: [DashboardService],
})
export class DashboardModule { }

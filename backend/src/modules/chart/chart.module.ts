import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { ChartEntity } from './entities/chart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChartEntity])],
  providers: [ChartService],
  controllers: [ChartController],
  exports: [ChartService],
})
export class ChartModule { }

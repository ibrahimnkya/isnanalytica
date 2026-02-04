import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportEntity } from './entities/report.entity';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportEntity]),
        DashboardModule,
    ],
    providers: [ReportService],
    controllers: [ReportController],
    exports: [ReportService],
})
export class ReportModule { }

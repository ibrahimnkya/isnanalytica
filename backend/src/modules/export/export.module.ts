import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
    imports: [DashboardModule],
    providers: [ExportService],
    controllers: [ExportController],
    exports: [ExportService],
})
export class ExportModule { }

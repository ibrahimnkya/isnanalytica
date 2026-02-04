import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportEntity } from './entities/report.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post()
    createReport(@Body() data: Partial<ReportEntity>) {
        return this.reportService.createReport(data);
    }

    @Get()
    findAllReports() {
        return this.reportService.findAllReports();
    }

    @Get(':id')
    findReport(@Param('id') id: string) {
        return this.reportService.findReport(id);
    }

    @Put(':id')
    updateReport(@Param('id') id: string, @Body() data: Partial<ReportEntity>) {
        return this.reportService.updateReport(id, data);
    }

    @Delete(':id')
    deleteReport(@Param('id') id: string) {
        return this.reportService.deleteReport(id);
    }

    @Post(':id/execute')
    executeReport(@Param('id') id: string) {
        return this.reportService.executeReport(id);
    }
}

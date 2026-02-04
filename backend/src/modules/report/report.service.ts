import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity, ReportFrequency } from './entities/report.entity';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportEntity)
        private reportRepository: Repository<ReportEntity>,
        private dashboardService: DashboardService,
    ) { }

    async createReport(data: Partial<ReportEntity>): Promise<ReportEntity> {
        const report = this.reportRepository.create(data);
        return this.reportRepository.save(report);
    }

    async findAllReports(): Promise<ReportEntity[]> {
        return this.reportRepository.find({
            relations: ['dashboard', 'createdBy'],
        });
    }

    async findReport(id: string): Promise<ReportEntity> {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: ['dashboard', 'createdBy'],
        });
        if (!report) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }

    async updateReport(id: string, data: Partial<ReportEntity>): Promise<ReportEntity> {
        await this.reportRepository.update(id, data);
        return this.findReport(id);
    }

    async deleteReport(id: string): Promise<void> {
        const result = await this.reportRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Report with ID ${id} not found`);
        }
    }

    /**
     * Placeholder for executing a report
     * In a real app, this would trigger PDF generation and email sending
     */
    async executeReport(id: string): Promise<void> {
        const report = await this.findReport(id);

        console.log(`Executing report: ${report.name} for dashboard ${report.dashboard.name}`);

        // Update last run time
        await this.reportRepository.update(id, {
            lastRunAt: new Date(),
        });
    }
}

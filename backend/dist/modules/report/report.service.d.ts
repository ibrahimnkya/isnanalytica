import { Repository } from 'typeorm';
import { ReportEntity } from './entities/report.entity';
import { DashboardService } from '../dashboard/dashboard.service';
export declare class ReportService {
    private reportRepository;
    private dashboardService;
    constructor(reportRepository: Repository<ReportEntity>, dashboardService: DashboardService);
    createReport(data: Partial<ReportEntity>): Promise<ReportEntity>;
    findAllReports(): Promise<ReportEntity[]>;
    findReport(id: string): Promise<ReportEntity>;
    updateReport(id: string, data: Partial<ReportEntity>): Promise<ReportEntity>;
    deleteReport(id: string): Promise<void>;
    executeReport(id: string): Promise<void>;
}

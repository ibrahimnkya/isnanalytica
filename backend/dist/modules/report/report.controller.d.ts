import { ReportService } from './report.service';
import { ReportEntity } from './entities/report.entity';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    createReport(data: Partial<ReportEntity>): Promise<ReportEntity>;
    findAllReports(): Promise<ReportEntity[]>;
    findReport(id: string): Promise<ReportEntity>;
    updateReport(id: string, data: Partial<ReportEntity>): Promise<ReportEntity>;
    deleteReport(id: string): Promise<void>;
    executeReport(id: string): Promise<void>;
}

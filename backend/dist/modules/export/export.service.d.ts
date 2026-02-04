import { DashboardService } from '../dashboard/dashboard.service';
export declare class ExportService {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    generateDashboardPDF(dashboardId: string): Promise<Buffer>;
    generateShareableLink(dashboardId: string): Promise<string>;
}

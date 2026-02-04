import type { Response } from 'express';
import { ExportService } from './export.service';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportDashboardToPDF(id: string, res: Response): Promise<void>;
    getShareableLink(id: string): Promise<{
        link: string;
    }>;
}

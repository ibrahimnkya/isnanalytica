import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('export')
export class ExportController {
    constructor(private readonly exportService: ExportService) { }

    @Get('dashboard/:id/pdf')
    @UseGuards(JwtAuthGuard)
    async exportDashboardToPDF(@Param('id') id: string, @Res() res: Response) {
        const pdfBuffer = await this.exportService.generateDashboardPDF(id);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=dashboard-${id}.pdf`);
        res.send(pdfBuffer);
    }

    @Get('dashboard/:id/share')
    @UseGuards(JwtAuthGuard)
    async getShareableLink(@Param('id') id: string) {
        const link = await this.exportService.generateShareableLink(id);
        return { link };
    }
}

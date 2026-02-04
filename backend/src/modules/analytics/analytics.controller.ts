import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('kpi/:metricId')
    calculateKPIvsTarget(@Param('metricId') metricId: string) {
        return this.analyticsService.calculateKPIvsTarget(metricId);
    }

    @Get('comparison/:metricId')
    calculatePeriodComparison(
        @Param('metricId') metricId: string,
        @Query('type') type: 'WoW' | 'MoM' | 'YoY' = 'MoM'
    ) {
        return this.analyticsService.calculatePeriodComparison(metricId, type);
    }

    @Get('root-cause/:metricId')
    performRootCauseAnalysis(@Param('metricId') metricId: string) {
        return this.analyticsService.performRootCauseAnalysis(metricId);
    }
}

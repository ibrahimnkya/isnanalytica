import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    calculateKPIvsTarget(metricId: string): Promise<import("./analytics.service").KPIComparison>;
    calculatePeriodComparison(metricId: string, type?: 'WoW' | 'MoM' | 'YoY'): Promise<import("./analytics.service").PeriodComparison>;
    performRootCauseAnalysis(metricId: string): Promise<any>;
}

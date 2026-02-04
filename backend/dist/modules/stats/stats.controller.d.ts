import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getOverviewStats(): Promise<{
        totalSources: number;
        totalDatasets: number;
        totalCharts: number;
        totalDashboards: number;
        platformHealth: {
            postgres: string;
            redis: string;
            hybridEngine: string;
        };
    }>;
}

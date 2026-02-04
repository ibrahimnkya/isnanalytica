import { Repository } from 'typeorm';
import { DataSourceEntity } from '../data-source/entities/data-source.entity';
import { DatasetEntity } from '../dataset/entities/dataset.entity';
import { ChartEntity } from '../chart/entities/chart.entity';
import { DashboardEntity } from '../dashboard/entities/dashboard.entity';
export declare class StatsService {
    private dataSourceRepository;
    private datasetRepository;
    private chartRepository;
    private dashboardRepository;
    constructor(dataSourceRepository: Repository<DataSourceEntity>, datasetRepository: Repository<DatasetEntity>, chartRepository: Repository<ChartEntity>, dashboardRepository: Repository<DashboardEntity>);
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

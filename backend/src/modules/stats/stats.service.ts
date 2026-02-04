import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSourceEntity } from '../data-source/entities/data-source.entity';
import { DatasetEntity } from '../dataset/entities/dataset.entity';
import { ChartEntity } from '../chart/entities/chart.entity';
import { DashboardEntity } from '../dashboard/entities/dashboard.entity';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(DataSourceEntity)
        private dataSourceRepository: Repository<DataSourceEntity>,
        @InjectRepository(DatasetEntity)
        private datasetRepository: Repository<DatasetEntity>,
        @InjectRepository(ChartEntity)
        private chartRepository: Repository<ChartEntity>,
        @InjectRepository(DashboardEntity)
        private dashboardRepository: Repository<DashboardEntity>,
    ) { }

    async getOverviewStats() {
        const [sources, datasets, charts, dashboards] = await Promise.all([
            this.dataSourceRepository.count(),
            this.datasetRepository.count(),
            this.chartRepository.count(),
            this.dashboardRepository.count(),
        ]);

        return {
            totalSources: sources,
            totalDatasets: datasets,
            totalCharts: charts,
            totalDashboards: dashboards,
            platformHealth: {
                postgres: 'healthy',
                redis: 'healthy',
                hybridEngine: 'active'
            }
        };
    }
}

import { Repository } from 'typeorm';
import { DashboardEntity } from './entities/dashboard.entity';
import { ChartEntity } from '../chart/entities/chart.entity';
export declare class DashboardService {
    private dashboardRepository;
    private chartRepository;
    constructor(dashboardRepository: Repository<DashboardEntity>, chartRepository: Repository<ChartEntity>);
    create(data: Partial<DashboardEntity>): Promise<DashboardEntity>;
    findAll(): Promise<DashboardEntity[]>;
    findOne(id: string): Promise<DashboardEntity>;
    update(id: string, data: Partial<DashboardEntity>): Promise<DashboardEntity>;
    remove(id: string): Promise<void>;
    addChart(dashboardId: string, chartId: string): Promise<DashboardEntity>;
    removeChart(dashboardId: string, chartId: string): Promise<DashboardEntity>;
}

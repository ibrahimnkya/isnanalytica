import { DashboardService } from './dashboard.service';
import { DashboardEntity } from './entities/dashboard.entity';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    create(data: Partial<DashboardEntity>): Promise<DashboardEntity>;
    findAll(): Promise<DashboardEntity[]>;
    findOne(id: string): Promise<DashboardEntity>;
    update(id: string, data: Partial<DashboardEntity>): Promise<DashboardEntity>;
    remove(id: string): Promise<void>;
    addChart(id: string, chartId: string): Promise<DashboardEntity>;
    removeChart(id: string, chartId: string): Promise<DashboardEntity>;
}

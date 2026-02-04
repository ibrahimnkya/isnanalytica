import { ChartEntity } from '../../chart/entities/chart.entity';
export declare class DashboardEntity {
    id: string;
    name: string;
    description: string;
    layout: any;
    charts: ChartEntity[];
    createdAt: Date;
    updatedAt: Date;
}

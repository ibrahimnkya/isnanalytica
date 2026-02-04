import { ChartService } from './chart.service';
import { ChartEntity } from './entities/chart.entity';
export declare class ChartController {
    private readonly chartService;
    constructor(chartService: ChartService);
    create(data: Partial<ChartEntity>): Promise<ChartEntity>;
    findAll(): Promise<ChartEntity[]>;
    findOne(id: string): Promise<ChartEntity>;
    update(id: string, data: Partial<ChartEntity>): Promise<ChartEntity>;
    remove(id: string): Promise<void>;
}

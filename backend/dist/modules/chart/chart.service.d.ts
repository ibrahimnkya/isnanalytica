import { Repository } from 'typeorm';
import { ChartEntity } from './entities/chart.entity';
export declare class ChartService {
    private chartRepository;
    constructor(chartRepository: Repository<ChartEntity>);
    create(data: Partial<ChartEntity>): Promise<ChartEntity>;
    findAll(): Promise<ChartEntity[]>;
    findOne(id: string): Promise<ChartEntity>;
    update(id: string, data: Partial<ChartEntity>): Promise<ChartEntity>;
    remove(id: string): Promise<void>;
}

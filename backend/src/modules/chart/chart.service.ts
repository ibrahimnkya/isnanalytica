import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartEntity } from './entities/chart.entity';

@Injectable()
export class ChartService {
    constructor(
        @InjectRepository(ChartEntity)
        private chartRepository: Repository<ChartEntity>,
    ) { }

    async create(data: Partial<ChartEntity>): Promise<ChartEntity> {
        const chart = this.chartRepository.create(data);
        return this.chartRepository.save(chart);
    }

    async findAll(): Promise<ChartEntity[]> {
        return this.chartRepository.find({ relations: ['dataset', 'dataset.dataSource'] });
    }

    async findOne(id: string): Promise<ChartEntity> {
        const chart = await this.chartRepository.findOne({
            where: { id },
            relations: ['dataset', 'dataset.dataSource'],
        });
        if (!chart) {
            throw new NotFoundException(`Chart with ID ${id} not found`);
        }
        return chart;
    }

    async update(id: string, data: Partial<ChartEntity>): Promise<ChartEntity> {
        await this.chartRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.chartRepository.delete(id);
    }
}

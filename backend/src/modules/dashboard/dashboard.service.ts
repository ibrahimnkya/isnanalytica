import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardEntity } from './entities/dashboard.entity';
import { ChartEntity } from '../chart/entities/chart.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(DashboardEntity)
        private dashboardRepository: Repository<DashboardEntity>,
        @InjectRepository(ChartEntity)
        private chartRepository: Repository<ChartEntity>,
    ) { }

    async create(data: Partial<DashboardEntity>): Promise<DashboardEntity> {
        const dashboard = this.dashboardRepository.create(data);
        return this.dashboardRepository.save(dashboard);
    }

    async findAll(): Promise<DashboardEntity[]> {
        return this.dashboardRepository.find({ relations: ['charts'] });
    }

    async findOne(id: string): Promise<DashboardEntity> {
        const dashboard = await this.dashboardRepository.findOne({
            where: { id },
            relations: ['charts', 'charts.dataset', 'charts.dataset.dataSource'],
        });
        if (!dashboard) {
            throw new NotFoundException(`Dashboard with ID ${id} not found`);
        }
        return dashboard;
    }

    async update(id: string, data: Partial<DashboardEntity>): Promise<DashboardEntity> {
        await this.dashboardRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.dashboardRepository.delete(id);
    }

    async addChart(dashboardId: string, chartId: string): Promise<DashboardEntity> {
        const dashboard = await this.findOne(dashboardId);
        const chart = await this.chartRepository.findOneBy({ id: chartId });
        if (!chart) throw new NotFoundException('Chart not found');

        if (!dashboard.charts.find(c => c.id === chartId)) {
            dashboard.charts.push(chart);
            await this.dashboardRepository.save(dashboard);
        }
        return dashboard;
    }

    async removeChart(dashboardId: string, chartId: string): Promise<DashboardEntity> {
        const dashboard = await this.findOne(dashboardId);
        dashboard.charts = dashboard.charts.filter(c => c.id !== chartId);
        await this.dashboardRepository.save(dashboard);
        return dashboard;
    }
}

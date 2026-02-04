import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardEntity } from './entities/dashboard.entity';

@Controller('dashboards')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Post()
    create(@Body() data: Partial<DashboardEntity>) {
        return this.dashboardService.create(data);
    }

    @Get()
    findAll() {
        return this.dashboardService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dashboardService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<DashboardEntity>) {
        return this.dashboardService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.dashboardService.remove(id);
    }

    @Post(':id/charts/:chartId')
    addChart(@Param('id') id: string, @Param('chartId') chartId: string) {
        return this.dashboardService.addChart(id, chartId);
    }

    @Delete(':id/charts/:chartId')
    removeChart(@Param('id') id: string, @Param('chartId') chartId: string) {
        return this.dashboardService.removeChart(id, chartId);
    }
}

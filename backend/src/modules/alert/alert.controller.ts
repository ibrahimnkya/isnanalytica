import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertEntity } from './entities/alert.entity';

@Controller('alerts')
export class AlertController {
    constructor(private readonly alertService: AlertService) { }

    @Post()
    createAlert(@Body() data: Partial<AlertEntity>) {
        return this.alertService.createAlert(data);
    }

    @Get()
    findAllAlerts() {
        return this.alertService.findAllAlerts();
    }

    @Get(':id')
    findAlert(@Param('id') id: string) {
        return this.alertService.findAlert(id);
    }

    @Put(':id')
    updateAlert(@Param('id') id: string, @Body() data: Partial<AlertEntity>) {
        return this.alertService.updateAlert(id, data);
    }

    @Delete(':id')
    deleteAlert(@Param('id') id: string) {
        return this.alertService.deleteAlert(id);
    }

    @Get(':id/logs')
    getAlertLogs(@Param('id') id: string, @Query('limit') limit?: number) {
        return this.alertService.getAlertLogs(id, limit);
    }

    @Post('evaluate')
    evaluateAllAlerts() {
        return this.alertService.evaluateAllAlerts();
    }
}

import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartEntity } from './entities/chart.entity';

@Controller('charts')
export class ChartController {
    constructor(private readonly chartService: ChartService) { }

    @Post()
    create(@Body() data: Partial<ChartEntity>) {
        return this.chartService.create(data);
    }

    @Get()
    findAll() {
        return this.chartService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chartService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<ChartEntity>) {
        return this.chartService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.chartService.remove(id);
    }
}

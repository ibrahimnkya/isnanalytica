import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSourceService } from './data-source.service';
import { DataSourceEntity } from './entities/data-source.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('data-sources')
@UseGuards(JwtAuthGuard)
export class DataSourceController {
    constructor(private readonly dataSourceService: DataSourceService) { }

    @Post()
    create(@Body() data: Partial<DataSourceEntity>) {
        return this.dataSourceService.create(data);
    }

    @Get()
    findAll() {
        return this.dataSourceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dataSourceService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<DataSourceEntity>) {
        return this.dataSourceService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.dataSourceService.remove(id);
    }

    @Post('test')
    @HttpCode(HttpStatus.OK)
    async testRawConnection(@Body() data: { type: string; connectionConfig: any }) {
        const success = await this.dataSourceService.testConnectionConfig(data.type as any, data.connectionConfig);
        return { success };
    }

    @Post(':id/test')
    async testConnection(@Param('id') id: string) {
        const success = await this.dataSourceService.testConnection(id);
        return { success };
    }

    @Get(':id/schemas')
    getSchemas(@Param('id') id: string) {
        console.log(`[DataSourceController] GET schemas for ID: ${id}`);
        return this.dataSourceService.getSchemas(id);
    }

    @Get(':id/schemas/:schema/tables')
    getTables(@Param('id') id: string, @Param('schema') schema: string) {
        console.log(`[DataSourceController] GET tables for ID: ${id}, schema: ${schema}`);
        return this.dataSourceService.getTables(id, schema);
    }

    @Get(':id/schemas/:schema/tables/:table/columns')
    getColumns(
        @Param('id') id: string,
        @Param('schema') schema: string,
        @Param('table') table: string,
    ) {
        return this.dataSourceService.getColumns(id, schema, table);
    }

    @Post(':id/query')
    runQuery(@Param('id') id: string, @Body('sql') sql: string) {
        return this.dataSourceService.runRawQuery(id, sql);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('name') name: string,
        @Body('tableName') tableName?: string
    ) {
        return this.dataSourceService.createFromExcel(file.path, name, tableName);
    }
}

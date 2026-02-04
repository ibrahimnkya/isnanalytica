import { Controller, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QueryService } from './query.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('query')
@UseGuards(JwtAuthGuard)
export class QueryController {
    constructor(private readonly queryService: QueryService) { }

    @Post(':dataSourceId')
    executeQuery(
        @Param('dataSourceId') dataSourceId: string,
        @Body('sql') sql: string,
        @Request() req: any,
    ) {
        return this.queryService.executeQuery(dataSourceId, sql, req.user);
    }
}

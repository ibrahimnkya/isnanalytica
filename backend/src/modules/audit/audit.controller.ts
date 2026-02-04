import { Controller, Get, Query, Param } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditAction } from './entities/audit-log.entity';

@Controller('audit')
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Get()
    findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
        return this.auditService.findAll(limit, offset);
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: string, @Query('limit') limit?: number) {
        return this.auditService.findByUser(userId, limit);
    }

    @Get('action/:action')
    findByAction(@Param('action') action: AuditAction, @Query('limit') limit?: number) {
        return this.auditService.findByAction(action, limit);
    }
}

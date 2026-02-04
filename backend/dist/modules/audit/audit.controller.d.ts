import { AuditService } from './audit.service';
import { AuditAction } from './entities/audit-log.entity';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(limit?: number, offset?: number): Promise<import("./entities/audit-log.entity").AuditLogEntity[]>;
    findByUser(userId: string, limit?: number): Promise<import("./entities/audit-log.entity").AuditLogEntity[]>;
    findByAction(action: AuditAction, limit?: number): Promise<import("./entities/audit-log.entity").AuditLogEntity[]>;
}

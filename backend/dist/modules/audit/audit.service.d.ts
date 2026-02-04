import { Repository } from 'typeorm';
import { AuditLogEntity, AuditAction } from './entities/audit-log.entity';
import { User } from '../user/user.entity';
export declare class AuditService {
    private auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLogEntity>);
    log(action: AuditAction, user: User | null, metadata?: any, ipAddress?: string, userAgent?: string, success?: boolean, errorMessage?: string): Promise<AuditLogEntity>;
    findAll(limit?: number, offset?: number): Promise<AuditLogEntity[]>;
    findByUser(userId: string, limit?: number): Promise<AuditLogEntity[]>;
    findByAction(action: AuditAction, limit?: number): Promise<AuditLogEntity[]>;
}

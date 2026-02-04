import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity, AuditAction } from './entities/audit-log.entity';
import { User } from '../user/user.entity';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(AuditLogEntity)
        private auditLogRepository: Repository<AuditLogEntity>,
    ) { }

    async log(
        action: AuditAction,
        user: User | null,
        metadata?: any,
        ipAddress?: string,
        userAgent?: string,
        success: boolean = true,
        errorMessage?: string
    ): Promise<AuditLogEntity> {
        const auditLog = this.auditLogRepository.create({
            action,
            user: user || undefined,
            metadata,
            ipAddress,
            userAgent,
            success,
            errorMessage,
        });
        return this.auditLogRepository.save(auditLog);
    }

    async findAll(limit: number = 100, offset: number = 0): Promise<AuditLogEntity[]> {
        return this.auditLogRepository.find({
            relations: ['user'],
            order: { timestamp: 'DESC' },
            take: limit,
            skip: offset,
        });
    }

    async findByUser(userId: string, limit: number = 50): Promise<AuditLogEntity[]> {
        return this.auditLogRepository.find({
            where: { user: { id: userId } },
            order: { timestamp: 'DESC' },
            take: limit,
        });
    }

    async findByAction(action: AuditAction, limit: number = 50): Promise<AuditLogEntity[]> {
        return this.auditLogRepository.find({
            where: { action },
            relations: ['user'],
            order: { timestamp: 'DESC' },
            take: limit,
        });
    }
}

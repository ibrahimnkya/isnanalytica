import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity';

export enum AuditAction {
    QUERY_EXECUTED = 'query_executed',
    DATA_SOURCE_ACCESSED = 'data_source_accessed',
    DASHBOARD_VIEWED = 'dashboard_viewed',
    EXPORT_GENERATED = 'export_generated',
    ALERT_CREATED = 'alert_created',
    ALERT_TRIGGERED = 'alert_triggered',
    USER_LOGIN = 'user_login',
    USER_LOGOUT = 'user_logout',
    ORGANIZATION_CREATED = 'organization_created',
    ORGANIZATION_UPDATED = 'organization_updated',
}

@Entity('audit_logs')
export class AuditLogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { nullable: true })
    user: User;

    @Column({ type: 'simple-enum', enum: AuditAction })
    action: AuditAction;

    @Column({ type: 'jsonb', nullable: true })
    metadata: any; // Query text, data source ID, dashboard ID, etc.

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ nullable: true })
    userAgent: string;

    @Column({ default: true })
    success: boolean;

    @Column({ type: 'text', nullable: true })
    errorMessage: string;

    @CreateDateColumn()
    timestamp: Date;
}

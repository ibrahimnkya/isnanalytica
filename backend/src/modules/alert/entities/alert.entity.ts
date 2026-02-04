import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { MetricEntity } from '../../dataset/entities/dataset.entity';
import { User } from '../../user/user.entity';

export enum AlertType {
    THRESHOLD = 'threshold',
    TREND = 'trend',
    ANOMALY = 'anomaly',
}

export enum AlertStatus {
    ACTIVE = 'active',
    TRIGGERED = 'triggered',
    RESOLVED = 'resolved',
    DISABLED = 'disabled',
}

export enum ComparisonOperator {
    GREATER_THAN = '>',
    LESS_THAN = '<',
    EQUALS = '=',
    GREATER_THAN_OR_EQUAL = '>=',
    LESS_THAN_OR_EQUAL = '<=',
}

@Entity('alerts')
export class AlertEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'simple-enum', enum: AlertType })
    type: AlertType;

    @ManyToOne(() => MetricEntity, { eager: true })
    metric: MetricEntity;

    @Column({ type: 'jsonb' })
    conditions: any; // { operator: '>', value: 1000, period: 'daily', trendType: 'WoW' }

    @Column({ type: 'simple-enum', enum: AlertStatus, default: AlertStatus.ACTIVE })
    status: AlertStatus;

    @Column({ type: 'simple-array' })
    recipients: string[]; // Email addresses

    @ManyToOne(() => User)
    createdBy: User;

    @Column({ nullable: true })
    lastTriggeredAt: Date;

    @Column({ nullable: true })
    lastCheckedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity('alert_logs')
export class AlertLogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => AlertEntity, { onDelete: 'CASCADE' })
    alert: AlertEntity;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    value: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    threshold: number;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ default: false })
    notificationSent: boolean;

    @CreateDateColumn()
    triggeredAt: Date;
}

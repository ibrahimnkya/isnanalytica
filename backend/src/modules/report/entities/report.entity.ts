import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { DashboardEntity } from '../../dashboard/entities/dashboard.entity';
import { User } from '../../user/user.entity';

export enum ReportFrequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

export enum ReportFormat {
    PDF = 'pdf',
    EXCEL = 'excel',
    EMAIL = 'email',
}

@Entity('reports')
export class ReportEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => DashboardEntity, { eager: true })
    dashboard: DashboardEntity;

    @Column({ type: 'simple-enum', enum: ReportFrequency })
    frequency: ReportFrequency;

    @Column({ type: 'simple-enum', enum: ReportFormat, array: true, default: [ReportFormat.PDF] })
    formats: ReportFormat[];

    @Column({ type: 'simple-array' })
    recipients: string[]; // Email addresses

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    lastRunAt: Date;

    @Column({ nullable: true })
    nextRunAt: Date;

    @ManyToOne(() => User)
    createdBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

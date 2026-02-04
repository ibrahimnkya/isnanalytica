import { DashboardEntity } from '../../dashboard/entities/dashboard.entity';
import { User } from '../../user/user.entity';
export declare enum ReportFrequency {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}
export declare enum ReportFormat {
    PDF = "pdf",
    EXCEL = "excel",
    EMAIL = "email"
}
export declare class ReportEntity {
    id: string;
    name: string;
    description: string;
    dashboard: DashboardEntity;
    frequency: ReportFrequency;
    formats: ReportFormat[];
    recipients: string[];
    isActive: boolean;
    lastRunAt: Date;
    nextRunAt: Date;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
}

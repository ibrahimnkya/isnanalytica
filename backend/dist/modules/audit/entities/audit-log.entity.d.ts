import { User } from '../../user/user.entity';
export declare enum AuditAction {
    QUERY_EXECUTED = "query_executed",
    DATA_SOURCE_ACCESSED = "data_source_accessed",
    DASHBOARD_VIEWED = "dashboard_viewed",
    EXPORT_GENERATED = "export_generated",
    ALERT_CREATED = "alert_created",
    ALERT_TRIGGERED = "alert_triggered",
    USER_LOGIN = "user_login",
    USER_LOGOUT = "user_logout",
    ORGANIZATION_CREATED = "organization_created",
    ORGANIZATION_UPDATED = "organization_updated"
}
export declare class AuditLogEntity {
    id: string;
    user: User;
    action: AuditAction;
    metadata: any;
    ipAddress: string;
    userAgent: string;
    success: boolean;
    errorMessage: string;
    timestamp: Date;
}

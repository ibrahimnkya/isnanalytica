import { MetricEntity } from '../../dataset/entities/dataset.entity';
import { User } from '../../user/user.entity';
export declare enum AlertType {
    THRESHOLD = "threshold",
    TREND = "trend",
    ANOMALY = "anomaly"
}
export declare enum AlertStatus {
    ACTIVE = "active",
    TRIGGERED = "triggered",
    RESOLVED = "resolved",
    DISABLED = "disabled"
}
export declare enum ComparisonOperator {
    GREATER_THAN = ">",
    LESS_THAN = "<",
    EQUALS = "=",
    GREATER_THAN_OR_EQUAL = ">=",
    LESS_THAN_OR_EQUAL = "<="
}
export declare class AlertEntity {
    id: string;
    name: string;
    description: string;
    type: AlertType;
    metric: MetricEntity;
    conditions: any;
    status: AlertStatus;
    recipients: string[];
    createdBy: User;
    lastTriggeredAt: Date;
    lastCheckedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AlertLogEntity {
    id: string;
    alert: AlertEntity;
    value: number;
    threshold: number;
    message: string;
    notificationSent: boolean;
    triggeredAt: Date;
}

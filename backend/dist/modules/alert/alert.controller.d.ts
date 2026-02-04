import { AlertService } from './alert.service';
import { AlertEntity } from './entities/alert.entity';
export declare class AlertController {
    private readonly alertService;
    constructor(alertService: AlertService);
    createAlert(data: Partial<AlertEntity>): Promise<AlertEntity>;
    findAllAlerts(): Promise<AlertEntity[]>;
    findAlert(id: string): Promise<AlertEntity>;
    updateAlert(id: string, data: Partial<AlertEntity>): Promise<AlertEntity>;
    deleteAlert(id: string): Promise<void>;
    getAlertLogs(id: string, limit?: number): Promise<import("./entities/alert.entity").AlertLogEntity[]>;
    evaluateAllAlerts(): Promise<void>;
}

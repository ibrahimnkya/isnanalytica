import { SupersetService } from './superset.service';
export declare class SupersetController {
    private supersetService;
    constructor(supersetService: SupersetService);
    getGuestToken(req: any, dashboardId: string): Promise<{
        token: string;
    }>;
}

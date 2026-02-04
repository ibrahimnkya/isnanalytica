import { ConfigService } from '@nestjs/config';
export declare class SupersetService {
    private configService;
    private readonly baseUrl;
    private accessToken;
    constructor(configService: ConfigService);
    authenticate(): Promise<string>;
    getGuestToken(user: any, dashboardId: string): Promise<string>;
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SupersetLoginResponse } from './dto/superset-login.dto';

@Injectable()
export class SupersetService {
    private readonly baseUrl: string;
    private accessToken: string;

    constructor(private configService: ConfigService) {
        this.baseUrl = this.configService.get<string>('SUPERSET_URL') || 'http://localhost:8088';
    }

    async authenticate(): Promise<string> {
        try {
            const username = this.configService.get<string>('SUPERSET_ADMIN_USERNAME');
            const password = this.configService.get<string>('SUPERSET_ADMIN_PASSWORD');
            const provider = 'db';

            const response = await axios.post<SupersetLoginResponse>(`${this.baseUrl}/api/v1/security/login`, {
                username,
                password,
                provider,
                refresh: true,
            });

            this.accessToken = response.data.access_token;
            return this.accessToken;
        } catch (error) {
            console.error('Superset authentication failed:', error.message);
            throw new InternalServerErrorException('Failed to authenticate with Superset');
        }
    }

    async getGuestToken(user: any, dashboardId: string): Promise<string> {
        if (!this.accessToken) {
            await this.authenticate();
        }

        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/security/guest_token/`,
                {
                    user: {
                        username: user.email,
                        first_name: user.fullName || 'Guest',
                        last_name: 'User',
                    },
                    resources: [
                        {
                            type: 'dashboard',
                            id: dashboardId,
                        },
                    ],
                    rls: [],
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                }
            );

            return response.data.token;
        } catch (error) {
            if (error.response?.status === 401) {
                // Token might be expired, retry once
                await this.authenticate();
                return this.getGuestToken(user, dashboardId);
            }
            throw new InternalServerErrorException('Failed to generate guest token');
        }
    }
}

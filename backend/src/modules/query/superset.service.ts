import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SupersetService {
    private readonly logger = new Logger(SupersetService.name);
    private readonly baseUrl: string;
    private readonly username: string;
    private readonly password: string;
    private accessToken: string | null = null;

    constructor() {
        this.baseUrl = process.env.SUPERSET_URL || 'http://localhost:8088';
        this.username = process.env.SUPERSET_USER || 'admin';
        this.password = process.env.SUPERSET_PASS || 'admin';
    }

    private async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/api/v1/security/login`, {
                username: this.username,
                password: this.password,
                provider: 'db',
                refresh: true
            });
            this.accessToken = response.data.access_token;
        } catch (error) {
            this.logger.error('Failed to authenticate with Superset API', error.stack);
            throw error;
        }
    }

    private async request(method: string, endpoint: string, data: any = {}, config: any = {}): Promise<any> {
        if (!this.accessToken) await this.authenticate();

        try {
            const response = await axios({
                method,
                url: `${this.baseUrl}${endpoint}`,
                data,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    ...config.headers
                },
                ...config
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                await this.authenticate();
                // Retry once
                return this.request(method, endpoint, data, config);
            }
            throw error;
        }
    }

    async executeSql(dataSourceId: number, sql: string, schema: string = 'public') {
        return this.request('POST', '/api/v1/sqllab/execute/', {
            database_id: dataSourceId,
            sql,
            schema,
            select_as_cta: false,
            tmp_table_name: `tmp_query_${Date.now()}`
        });
    }

    async getDatasets() {
        return this.request('GET', '/api/v1/dataset/');
    }

    async createDataset(databaseId: number, tableName: string, schema: string = 'public') {
        return this.request('POST', '/api/v1/dataset/', {
            database: databaseId,
            schema,
            table_name: tableName
        });
    }

    async getCharts() {
        return this.request('GET', '/api/v1/chart/');
    }

    async getDashboards() {
        return this.request('GET', '/api/v1/dashboard/');
    }
}

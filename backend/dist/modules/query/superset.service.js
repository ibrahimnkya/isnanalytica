"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SupersetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupersetService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let SupersetService = SupersetService_1 = class SupersetService {
    logger = new common_1.Logger(SupersetService_1.name);
    baseUrl;
    username;
    password;
    accessToken = null;
    constructor() {
        this.baseUrl = process.env.SUPERSET_URL || 'http://localhost:8088';
        this.username = process.env.SUPERSET_USER || 'admin';
        this.password = process.env.SUPERSET_PASS || 'admin';
    }
    async authenticate() {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/api/v1/security/login`, {
                username: this.username,
                password: this.password,
                provider: 'db',
                refresh: true
            });
            this.accessToken = response.data.access_token;
        }
        catch (error) {
            this.logger.error('Failed to authenticate with Superset API', error.stack);
            throw error;
        }
    }
    async request(method, endpoint, data = {}, config = {}) {
        if (!this.accessToken)
            await this.authenticate();
        try {
            const response = await (0, axios_1.default)({
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
        }
        catch (error) {
            if (error.response?.status === 401) {
                await this.authenticate();
                return this.request(method, endpoint, data, config);
            }
            throw error;
        }
    }
    async executeSql(dataSourceId, sql, schema = 'public') {
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
    async createDataset(databaseId, tableName, schema = 'public') {
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
};
exports.SupersetService = SupersetService;
exports.SupersetService = SupersetService = SupersetService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SupersetService);
//# sourceMappingURL=superset.service.js.map
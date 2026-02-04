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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupersetService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let SupersetService = class SupersetService {
    configService;
    baseUrl;
    accessToken;
    constructor(configService) {
        this.configService = configService;
        this.baseUrl = this.configService.get('SUPERSET_URL') || 'http://localhost:8088';
    }
    async authenticate() {
        try {
            const username = this.configService.get('SUPERSET_ADMIN_USERNAME');
            const password = this.configService.get('SUPERSET_ADMIN_PASSWORD');
            const provider = 'db';
            const response = await axios_1.default.post(`${this.baseUrl}/api/v1/security/login`, {
                username,
                password,
                provider,
                refresh: true,
            });
            this.accessToken = response.data.access_token;
            return this.accessToken;
        }
        catch (error) {
            console.error('Superset authentication failed:', error.message);
            throw new common_1.InternalServerErrorException('Failed to authenticate with Superset');
        }
    }
    async getGuestToken(user, dashboardId) {
        if (!this.accessToken) {
            await this.authenticate();
        }
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/api/v1/security/guest_token/`, {
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
            }, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });
            return response.data.token;
        }
        catch (error) {
            if (error.response?.status === 401) {
                await this.authenticate();
                return this.getGuestToken(user, dashboardId);
            }
            throw new common_1.InternalServerErrorException('Failed to generate guest token');
        }
    }
};
exports.SupersetService = SupersetService;
exports.SupersetService = SupersetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupersetService);
//# sourceMappingURL=superset.service.js.map
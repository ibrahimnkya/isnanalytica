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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dashboard_entity_1 = require("./entities/dashboard.entity");
const chart_entity_1 = require("../chart/entities/chart.entity");
let DashboardService = class DashboardService {
    dashboardRepository;
    chartRepository;
    constructor(dashboardRepository, chartRepository) {
        this.dashboardRepository = dashboardRepository;
        this.chartRepository = chartRepository;
    }
    async create(data) {
        const dashboard = this.dashboardRepository.create(data);
        return this.dashboardRepository.save(dashboard);
    }
    async findAll() {
        return this.dashboardRepository.find({ relations: ['charts'] });
    }
    async findOne(id) {
        const dashboard = await this.dashboardRepository.findOne({
            where: { id },
            relations: ['charts', 'charts.dataset', 'charts.dataset.dataSource'],
        });
        if (!dashboard) {
            throw new common_1.NotFoundException(`Dashboard with ID ${id} not found`);
        }
        return dashboard;
    }
    async update(id, data) {
        await this.dashboardRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.dashboardRepository.delete(id);
    }
    async addChart(dashboardId, chartId) {
        const dashboard = await this.findOne(dashboardId);
        const chart = await this.chartRepository.findOneBy({ id: chartId });
        if (!chart)
            throw new common_1.NotFoundException('Chart not found');
        if (!dashboard.charts.find(c => c.id === chartId)) {
            dashboard.charts.push(chart);
            await this.dashboardRepository.save(dashboard);
        }
        return dashboard;
    }
    async removeChart(dashboardId, chartId) {
        const dashboard = await this.findOne(dashboardId);
        dashboard.charts = dashboard.charts.filter(c => c.id !== chartId);
        await this.dashboardRepository.save(dashboard);
        return dashboard;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dashboard_entity_1.DashboardEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(chart_entity_1.ChartEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
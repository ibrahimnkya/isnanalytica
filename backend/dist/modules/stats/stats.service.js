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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data_source_entity_1 = require("../data-source/entities/data-source.entity");
const dataset_entity_1 = require("../dataset/entities/dataset.entity");
const chart_entity_1 = require("../chart/entities/chart.entity");
const dashboard_entity_1 = require("../dashboard/entities/dashboard.entity");
let StatsService = class StatsService {
    dataSourceRepository;
    datasetRepository;
    chartRepository;
    dashboardRepository;
    constructor(dataSourceRepository, datasetRepository, chartRepository, dashboardRepository) {
        this.dataSourceRepository = dataSourceRepository;
        this.datasetRepository = datasetRepository;
        this.chartRepository = chartRepository;
        this.dashboardRepository = dashboardRepository;
    }
    async getOverviewStats() {
        const [sources, datasets, charts, dashboards] = await Promise.all([
            this.dataSourceRepository.count(),
            this.datasetRepository.count(),
            this.chartRepository.count(),
            this.dashboardRepository.count(),
        ]);
        return {
            totalSources: sources,
            totalDatasets: datasets,
            totalCharts: charts,
            totalDashboards: dashboards,
            platformHealth: {
                postgres: 'healthy',
                redis: 'healthy',
                hybridEngine: 'active'
            }
        };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_source_entity_1.DataSourceEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(dataset_entity_1.DatasetEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(chart_entity_1.ChartEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(dashboard_entity_1.DashboardEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map
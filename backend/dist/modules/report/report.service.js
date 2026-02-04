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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./entities/report.entity");
const dashboard_service_1 = require("../dashboard/dashboard.service");
let ReportService = class ReportService {
    reportRepository;
    dashboardService;
    constructor(reportRepository, dashboardService) {
        this.reportRepository = reportRepository;
        this.dashboardService = dashboardService;
    }
    async createReport(data) {
        const report = this.reportRepository.create(data);
        return this.reportRepository.save(report);
    }
    async findAllReports() {
        return this.reportRepository.find({
            relations: ['dashboard', 'createdBy'],
        });
    }
    async findReport(id) {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: ['dashboard', 'createdBy'],
        });
        if (!report) {
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }
    async updateReport(id, data) {
        await this.reportRepository.update(id, data);
        return this.findReport(id);
    }
    async deleteReport(id) {
        const result = await this.reportRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
    }
    async executeReport(id) {
        const report = await this.findReport(id);
        console.log(`Executing report: ${report.name} for dashboard ${report.dashboard.name}`);
        await this.reportRepository.update(id, {
            lastRunAt: new Date(),
        });
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.ReportEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        dashboard_service_1.DashboardService])
], ReportService);
//# sourceMappingURL=report.service.js.map
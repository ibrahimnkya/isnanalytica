"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const data_source_module_1 = require("./modules/data-source/data-source.module");
const query_module_1 = require("./modules/query/query.module");
const dataset_module_1 = require("./modules/dataset/dataset.module");
const chart_module_1 = require("./modules/chart/chart.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const stats_module_1 = require("./modules/stats/stats.module");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const superset_module_1 = require("./modules/superset/superset.module");
const organization_module_1 = require("./modules/organization/organization.module");
const alert_module_1 = require("./modules/alert/alert.module");
const audit_module_1 = require("./modules/audit/audit.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const report_module_1 = require("./modules/report/report.module");
const export_module_1 = require("./modules/export/export.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            data_source_module_1.DataSourceModule,
            query_module_1.QueryModule,
            dataset_module_1.DatasetModule,
            chart_module_1.ChartModule,
            dashboard_module_1.DashboardModule,
            stats_module_1.StatsModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            superset_module_1.SupersetModule,
            organization_module_1.OrganizationModule,
            alert_module_1.AlertModule,
            audit_module_1.AuditModule,
            analytics_module_1.AnalyticsModule,
            report_module_1.ReportModule,
            export_module_1.ExportModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from './modules/data-source/data-source.module';
import { QueryModule } from './modules/query/query.module';
import { DatasetModule } from './modules/dataset/dataset.module';
import { ChartModule } from './modules/chart/chart.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { StatsModule } from './modules/stats/stats.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SupersetModule } from './modules/superset/superset.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { AlertModule } from './modules/alert/alert.module';
import { AuditModule } from './modules/audit/audit.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ReportModule } from './modules/report/report.module';
import { ExportModule } from './modules/export/export.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Auto-create tables for MVP
      }),
      inject: [ConfigService],
    }),
    DataSourceModule,
    QueryModule,
    DatasetModule,
    ChartModule,
    DashboardModule,
    StatsModule,
    UserModule,
    AuthModule,
    SupersetModule,
    OrganizationModule,
    AlertModule,
    AuditModule,
    AnalyticsModule,
    ReportModule,
    ExportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


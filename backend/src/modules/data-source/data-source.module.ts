import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceService } from './data-source.service';
import { DataSourceController } from './data-source.controller';
import { DataSourceEntity } from './entities/data-source.entity';
import { AdapterFactory } from './adapters/adapter.factory';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataSourceEntity]),
    AuditModule
  ],
  providers: [DataSourceService, AdapterFactory],
  controllers: [DataSourceController],
  exports: [DataSourceService, AdapterFactory],
})
export class DataSourceModule { }

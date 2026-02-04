import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entities/organization.entity';
import { Branch } from './entities/branch.entity';
import { Department } from './entities/department.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Organization, Branch, Department])],
    providers: [OrganizationService],
    controllers: [OrganizationController],
    exports: [OrganizationService],
})
export class OrganizationModule { }

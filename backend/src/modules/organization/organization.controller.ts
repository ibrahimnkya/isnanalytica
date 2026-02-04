import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { Branch } from './entities/branch.entity';
import { Department } from './entities/department.entity';

@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) { }

    // Organization endpoints
    @Post()
    createOrganization(@Body() data: Partial<Organization>) {
        return this.organizationService.createOrganization(data);
    }

    @Get()
    findAllOrganizations() {
        return this.organizationService.findAllOrganizations();
    }

    @Get(':id')
    findOrganization(@Param('id') id: string) {
        return this.organizationService.findOrganization(id);
    }

    @Put(':id')
    updateOrganization(@Param('id') id: string, @Body() data: Partial<Organization>) {
        return this.organizationService.updateOrganization(id, data);
    }

    @Delete(':id')
    deleteOrganization(@Param('id') id: string) {
        return this.organizationService.deleteOrganization(id);
    }

    // Branch endpoints
    @Post(':organizationId/branches')
    createBranch(
        @Param('organizationId') organizationId: string,
        @Body() data: Partial<Branch>
    ) {
        return this.organizationService.createBranch(organizationId, data);
    }

    @Get(':organizationId/branches')
    findBranchesByOrganization(@Param('organizationId') organizationId: string) {
        return this.organizationService.findBranchesByOrganization(organizationId);
    }

    @Get('branches/:id')
    findBranch(@Param('id') id: string) {
        return this.organizationService.findBranch(id);
    }

    @Put('branches/:id')
    updateBranch(@Param('id') id: string, @Body() data: Partial<Branch>) {
        return this.organizationService.updateBranch(id, data);
    }

    @Delete('branches/:id')
    deleteBranch(@Param('id') id: string) {
        return this.organizationService.deleteBranch(id);
    }

    // Department endpoints
    @Post('branches/:branchId/departments')
    createDepartment(
        @Param('branchId') branchId: string,
        @Body() data: Partial<Department>
    ) {
        return this.organizationService.createDepartment(branchId, data);
    }

    @Get('branches/:branchId/departments')
    findDepartmentsByBranch(@Param('branchId') branchId: string) {
        return this.organizationService.findDepartmentsByBranch(branchId);
    }

    @Get('departments/:id')
    findDepartment(@Param('id') id: string) {
        return this.organizationService.findDepartment(id);
    }

    @Put('departments/:id')
    updateDepartment(@Param('id') id: string, @Body() data: Partial<Department>) {
        return this.organizationService.updateDepartment(id, data);
    }

    @Delete('departments/:id')
    deleteDepartment(@Param('id') id: string) {
        return this.organizationService.deleteDepartment(id);
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { Branch } from './entities/branch.entity';
import { Department } from './entities/department.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        @InjectRepository(Branch)
        private branchRepository: Repository<Branch>,
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ) { }

    // Organization CRUD
    async createOrganization(data: Partial<Organization>): Promise<Organization> {
        const organization = this.organizationRepository.create(data);
        return this.organizationRepository.save(organization);
    }

    async findAllOrganizations(): Promise<Organization[]> {
        return this.organizationRepository.find({
            relations: ['branches', 'branches.departments'],
        });
    }

    async findOrganization(id: string): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
            where: { id },
            relations: ['branches', 'branches.departments', 'users'],
        });
        if (!organization) {
            throw new NotFoundException(`Organization with ID ${id} not found`);
        }
        return organization;
    }

    async updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
        await this.organizationRepository.update(id, data);
        return this.findOrganization(id);
    }

    async deleteOrganization(id: string): Promise<void> {
        const result = await this.organizationRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Organization with ID ${id} not found`);
        }
    }

    // Branch CRUD
    async createBranch(organizationId: string, data: Partial<Branch>): Promise<Branch> {
        const organization = await this.findOrganization(organizationId);
        const branch = this.branchRepository.create({
            ...data,
            organization,
        });
        return this.branchRepository.save(branch);
    }

    async findBranchesByOrganization(organizationId: string): Promise<Branch[]> {
        return this.branchRepository.find({
            where: { organization: { id: organizationId } },
            relations: ['departments'],
        });
    }

    async findBranch(id: string): Promise<Branch> {
        const branch = await this.branchRepository.findOne({
            where: { id },
            relations: ['organization', 'departments'],
        });
        if (!branch) {
            throw new NotFoundException(`Branch with ID ${id} not found`);
        }
        return branch;
    }

    async updateBranch(id: string, data: Partial<Branch>): Promise<Branch> {
        await this.branchRepository.update(id, data);
        return this.findBranch(id);
    }

    async deleteBranch(id: string): Promise<void> {
        const result = await this.branchRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Branch with ID ${id} not found`);
        }
    }

    // Department CRUD
    async createDepartment(branchId: string, data: Partial<Department>): Promise<Department> {
        const branch = await this.findBranch(branchId);
        const department = this.departmentRepository.create({
            ...data,
            branch,
        });
        return this.departmentRepository.save(department);
    }

    async findDepartmentsByBranch(branchId: string): Promise<Department[]> {
        return this.departmentRepository.find({
            where: { branch: { id: branchId } },
        });
    }

    async findDepartment(id: string): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['branch', 'branch.organization'],
        });
        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }

    async updateDepartment(id: string, data: Partial<Department>): Promise<Department> {
        await this.departmentRepository.update(id, data);
        return this.findDepartment(id);
    }

    async deleteDepartment(id: string): Promise<void> {
        const result = await this.departmentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
    }
}

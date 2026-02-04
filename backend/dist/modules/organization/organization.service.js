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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("./entities/organization.entity");
const branch_entity_1 = require("./entities/branch.entity");
const department_entity_1 = require("./entities/department.entity");
let OrganizationService = class OrganizationService {
    organizationRepository;
    branchRepository;
    departmentRepository;
    constructor(organizationRepository, branchRepository, departmentRepository) {
        this.organizationRepository = organizationRepository;
        this.branchRepository = branchRepository;
        this.departmentRepository = departmentRepository;
    }
    async createOrganization(data) {
        const organization = this.organizationRepository.create(data);
        return this.organizationRepository.save(organization);
    }
    async findAllOrganizations() {
        return this.organizationRepository.find({
            relations: ['branches', 'branches.departments'],
        });
    }
    async findOrganization(id) {
        const organization = await this.organizationRepository.findOne({
            where: { id },
            relations: ['branches', 'branches.departments', 'users'],
        });
        if (!organization) {
            throw new common_1.NotFoundException(`Organization with ID ${id} not found`);
        }
        return organization;
    }
    async updateOrganization(id, data) {
        await this.organizationRepository.update(id, data);
        return this.findOrganization(id);
    }
    async deleteOrganization(id) {
        const result = await this.organizationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Organization with ID ${id} not found`);
        }
    }
    async createBranch(organizationId, data) {
        const organization = await this.findOrganization(organizationId);
        const branch = this.branchRepository.create({
            ...data,
            organization,
        });
        return this.branchRepository.save(branch);
    }
    async findBranchesByOrganization(organizationId) {
        return this.branchRepository.find({
            where: { organization: { id: organizationId } },
            relations: ['departments'],
        });
    }
    async findBranch(id) {
        const branch = await this.branchRepository.findOne({
            where: { id },
            relations: ['organization', 'departments'],
        });
        if (!branch) {
            throw new common_1.NotFoundException(`Branch with ID ${id} not found`);
        }
        return branch;
    }
    async updateBranch(id, data) {
        await this.branchRepository.update(id, data);
        return this.findBranch(id);
    }
    async deleteBranch(id) {
        const result = await this.branchRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Branch with ID ${id} not found`);
        }
    }
    async createDepartment(branchId, data) {
        const branch = await this.findBranch(branchId);
        const department = this.departmentRepository.create({
            ...data,
            branch,
        });
        return this.departmentRepository.save(department);
    }
    async findDepartmentsByBranch(branchId) {
        return this.departmentRepository.find({
            where: { branch: { id: branchId } },
        });
    }
    async findDepartment(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['branch', 'branch.organization'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async updateDepartment(id, data) {
        await this.departmentRepository.update(id, data);
        return this.findDepartment(id);
    }
    async deleteDepartment(id) {
        const result = await this.departmentRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(branch_entity_1.Branch)),
    __param(2, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map
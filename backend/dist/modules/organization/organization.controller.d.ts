import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { Branch } from './entities/branch.entity';
import { Department } from './entities/department.entity';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    createOrganization(data: Partial<Organization>): Promise<Organization>;
    findAllOrganizations(): Promise<Organization[]>;
    findOrganization(id: string): Promise<Organization>;
    updateOrganization(id: string, data: Partial<Organization>): Promise<Organization>;
    deleteOrganization(id: string): Promise<void>;
    createBranch(organizationId: string, data: Partial<Branch>): Promise<Branch>;
    findBranchesByOrganization(organizationId: string): Promise<Branch[]>;
    findBranch(id: string): Promise<Branch>;
    updateBranch(id: string, data: Partial<Branch>): Promise<Branch>;
    deleteBranch(id: string): Promise<void>;
    createDepartment(branchId: string, data: Partial<Department>): Promise<Department>;
    findDepartmentsByBranch(branchId: string): Promise<Department[]>;
    findDepartment(id: string): Promise<Department>;
    updateDepartment(id: string, data: Partial<Department>): Promise<Department>;
    deleteDepartment(id: string): Promise<void>;
}

import { Organization } from './organization.entity';
import { Department } from './department.entity';
export declare class Branch {
    id: string;
    name: string;
    location: string;
    address: string;
    contactEmail: string;
    contactPhone: string;
    isActive: boolean;
    organization: Organization;
    departments: Department[];
    createdAt: Date;
    updatedAt: Date;
}

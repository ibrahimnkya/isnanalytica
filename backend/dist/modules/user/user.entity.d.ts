import { Organization } from '../organization/entities/organization.entity';
import { Branch } from '../organization/entities/branch.entity';
import { Department } from '../organization/entities/department.entity';
export declare enum UserRole {
    ADMIN = "admin",
    ANALYST = "analyst",
    VIEWER = "viewer"
}
export declare class User {
    id: string;
    email: string;
    fullName: string | null;
    passwordHash: string;
    role: UserRole;
    organization: Organization | null;
    branch: Branch | null;
    department: Department | null;
    resetToken: string | null;
    resetTokenExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

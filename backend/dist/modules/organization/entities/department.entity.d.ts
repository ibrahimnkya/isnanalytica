import { Branch } from './branch.entity';
export declare class Department {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    branch: Branch;
    createdAt: Date;
    updatedAt: Date;
}

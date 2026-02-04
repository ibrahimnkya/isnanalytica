import { Branch } from './branch.entity';
import { User } from '../../user/user.entity';
export declare class Organization {
    id: string;
    name: string;
    industry: string;
    settings: any;
    isActive: boolean;
    branches: Branch[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}

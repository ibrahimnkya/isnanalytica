import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { Branch } from '../organization/entities/branch.entity';
import { Department } from '../organization/entities/department.entity';

export enum UserRole {
    ADMIN = 'admin',
    ANALYST = 'analyst',
    VIEWER = 'viewer',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    fullName: string | null;

    @Column()
    passwordHash: string;

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.VIEWER,
    })
    role: UserRole;

    @ManyToOne(() => Organization, (org) => org.users, { nullable: true })
    organization: Organization | null;

    @ManyToOne(() => Branch, { nullable: true })
    branch: Branch | null;

    @ManyToOne(() => Department, { nullable: true })
    department: Department | null;

    @Column({ type: 'varchar', nullable: true })
    resetToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpires: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

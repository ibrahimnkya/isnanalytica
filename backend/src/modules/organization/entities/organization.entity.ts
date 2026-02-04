import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Branch } from './branch.entity';
import { User } from '../../user/user.entity';

@Entity('organizations')
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    industry: string; // retail, logistics, lending, warehousing, etc.

    @Column({ type: 'jsonb', nullable: true })
    settings: any; // Organization-specific settings

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Branch, (branch) => branch.organization, { cascade: true })
    branches: Branch[];

    @OneToMany(() => User, (user) => user.organization)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

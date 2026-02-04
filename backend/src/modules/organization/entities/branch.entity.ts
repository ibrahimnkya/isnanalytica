import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { Department } from './department.entity';

@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    contactEmail: string;

    @Column({ nullable: true })
    contactPhone: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Organization, (org) => org.branches, { onDelete: 'CASCADE' })
    organization: Organization;

    @OneToMany(() => Department, (dept) => dept.branch, { cascade: true })
    departments: Department[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

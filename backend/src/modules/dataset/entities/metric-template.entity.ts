import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum BusinessSector {
    RETAIL = 'Retail',
    LOGISTICS = 'Logistics',
    FINANCE = 'Finance',
    AGRICULTURE = 'Agriculture',
}

@Entity('metric_templates')
export class MetricTemplateEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'simple-enum', enum: BusinessSector })
    sector: BusinessSector;

    @Column({ type: 'text' })
    expressionTemplate: string; // e.g., "SUM({{amount_column}})"

    @Column({ type: 'simple-array' })
    requiredColumns: string[]; // e.g., ['amount_column']

    @Column({ nullable: true })
    businessContext: string;

    @Column({ nullable: true })
    unit: string;

    @CreateDateColumn()
    createdAt: Date;
}

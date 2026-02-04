import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { DataSourceEntity } from '../../data-source/entities/data-source.entity';

export enum DataType {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    BOOLEAN = 'boolean',
}

export enum TargetPeriod {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    YEARLY = 'yearly',
}

@Entity('datasets')
export class DatasetEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    tableName: string;

    @Column({ nullable: true })
    schema: string;

    @ManyToOne(() => DataSourceEntity, { onDelete: 'CASCADE' })
    dataSource: DataSourceEntity;

    @OneToMany(() => MetricEntity, (metric) => metric.dataset, { cascade: true })
    metrics: MetricEntity[];

    @OneToMany(() => DimensionEntity, (dimension) => dimension.dataset, { cascade: true })
    dimensions: DimensionEntity[];

    @OneToMany(() => CalculatedFieldEntity, (field) => field.dataset, { cascade: true })
    calculatedFields: CalculatedFieldEntity[];

    @Column({ type: 'text', nullable: true })
    businessContext: string; // Business description for LLM and decision context

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity('metrics')
export class MetricEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    expression: string; // e.g., "SUM(amount)"

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    target: number; // KPI target value

    @Column({ type: 'simple-enum', enum: TargetPeriod, nullable: true })
    targetPeriod: TargetPeriod;

    @Column({ type: 'text', nullable: true })
    businessContext: string; // What this metric means for business decisions

    @Column({ nullable: true })
    unit: string; // e.g., 'TZS', 'USD', '%', 'units'

    @ManyToOne(() => DatasetEntity, (dataset) => dataset.metrics, { onDelete: 'CASCADE' })
    dataset: DatasetEntity;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity('dimensions')
export class DimensionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    expression: string; // e.g., "created_at" or "date_trunc('day', created_at)"

    @ManyToOne(() => DatasetEntity, (dataset) => dataset.dimensions, { onDelete: 'CASCADE' })
    dataset: DatasetEntity;

    @Column({ type: 'simple-enum', enum: DataType, default: DataType.STRING })
    dataType: DataType;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity('calculated_fields')
export class CalculatedFieldEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    expression: string; // SQL expression or formula

    @Column({ type: 'simple-enum', enum: DataType, default: DataType.STRING })
    dataType: DataType;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => DatasetEntity, (dataset) => dataset.calculatedFields, { onDelete: 'CASCADE' })
    dataset: DatasetEntity;

    @CreateDateColumn()
    createdAt: Date;
}

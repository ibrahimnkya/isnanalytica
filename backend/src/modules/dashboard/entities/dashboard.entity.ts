import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ChartEntity } from '../../chart/entities/chart.entity';

@Entity('dashboards')
export class DashboardEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    layout: any; // [{ i: chartId, x: 0, y: 0, w: 4, h: 4 }, ...]

    @ManyToMany(() => ChartEntity)
    @JoinTable({ name: 'dashboard_charts' })
    charts: ChartEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

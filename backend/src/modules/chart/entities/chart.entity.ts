import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { DatasetEntity } from '../../dataset/entities/dataset.entity';

@Entity('charts')
export class ChartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    type: string; // bar, line, pie, etc.

    @Column({ type: 'jsonb' })
    config: any; // { dimensions: [], metrics: [], title: '', theme: '' }

    @ManyToOne(() => DatasetEntity)
    dataset: DatasetEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

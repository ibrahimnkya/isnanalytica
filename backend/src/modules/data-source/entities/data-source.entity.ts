import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DataSourceType {
    POSTGRES = 'postgres',
    MYSQL = 'mysql',
    MSSQL = 'mssql',
    BIGQUERY = 'bigquery',
    SQLITE = 'sqlite',
}

@Entity('data_sources')
export class DataSourceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: DataSourceType,
        default: DataSourceType.POSTGRES,
    })
    type: DataSourceType;

    @Column({ type: 'jsonb' })
    connectionConfig: any; // Host, port, user, pass, db...

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

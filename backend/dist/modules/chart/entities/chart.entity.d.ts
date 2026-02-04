import { DatasetEntity } from '../../dataset/entities/dataset.entity';
export declare class ChartEntity {
    id: string;
    name: string;
    description: string;
    type: string;
    config: any;
    dataset: DatasetEntity;
    createdAt: Date;
    updatedAt: Date;
}

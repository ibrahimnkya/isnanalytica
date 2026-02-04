import { DataSourceEntity } from '../../data-source/entities/data-source.entity';
export declare enum DataType {
    STRING = "string",
    NUMBER = "number",
    DATE = "date",
    BOOLEAN = "boolean"
}
export declare enum TargetPeriod {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    QUARTERLY = "quarterly",
    YEARLY = "yearly"
}
export declare class DatasetEntity {
    id: string;
    name: string;
    description: string;
    tableName: string;
    schema: string;
    dataSource: DataSourceEntity;
    metrics: MetricEntity[];
    dimensions: DimensionEntity[];
    calculatedFields: CalculatedFieldEntity[];
    businessContext: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class MetricEntity {
    id: string;
    name: string;
    expression: string;
    target: number;
    targetPeriod: TargetPeriod;
    businessContext: string;
    unit: string;
    dataset: DatasetEntity;
    createdAt: Date;
}
export declare class DimensionEntity {
    id: string;
    name: string;
    expression: string;
    dataset: DatasetEntity;
    dataType: DataType;
    createdAt: Date;
}
export declare class CalculatedFieldEntity {
    id: string;
    name: string;
    expression: string;
    dataType: DataType;
    description: string;
    dataset: DatasetEntity;
    createdAt: Date;
}

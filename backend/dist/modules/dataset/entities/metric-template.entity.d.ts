export declare enum BusinessSector {
    RETAIL = "Retail",
    LOGISTICS = "Logistics",
    FINANCE = "Finance",
    AGRICULTURE = "Agriculture"
}
export declare class MetricTemplateEntity {
    id: string;
    name: string;
    description: string;
    sector: BusinessSector;
    expressionTemplate: string;
    requiredColumns: string[];
    businessContext: string;
    unit: string;
    createdAt: Date;
}

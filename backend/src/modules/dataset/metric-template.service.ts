import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricTemplateEntity, BusinessSector } from './entities/metric-template.entity';
import { DatasetEntity, MetricEntity } from './entities/dataset.entity';

@Injectable()
export class MetricTemplateService {
    constructor(
        @InjectRepository(MetricTemplateEntity)
        private templateRepository: Repository<MetricTemplateEntity>,
        @InjectRepository(MetricEntity)
        private metricRepository: Repository<MetricEntity>,
        @InjectRepository(DatasetEntity)
        private datasetRepository: Repository<DatasetEntity>,
    ) { }

    async findAll(): Promise<MetricTemplateEntity[]> {
        return this.templateRepository.find();
    }

    async findBySector(sector: BusinessSector): Promise<MetricTemplateEntity[]> {
        return this.templateRepository.find({ where: { sector } });
    }

    async applyTemplate(
        templateId: string,
        datasetId: string,
        mapping: Record<string, string>
    ): Promise<MetricEntity> {
        const template = await this.templateRepository.findOne({ where: { id: templateId } });
        if (!template) throw new NotFoundException('Template not found');

        const dataset = await this.datasetRepository.findOne({ where: { id: datasetId } });
        if (!dataset) throw new NotFoundException('Dataset not found');

        // Substitute placeholders in expressionTemplate
        // e.g., "SUM({{amount}})" with { amount: "price" } => "SUM(price)"
        let expression = template.expressionTemplate;
        for (const [placeholder, columnName] of Object.entries(mapping)) {
            const regex = new RegExp(`{{${placeholder}}}`, 'g');
            expression = expression.replace(regex, columnName);
        }

        const newMetric = this.metricRepository.create({
            name: template.name,
            expression,
            businessContext: template.businessContext,
            unit: template.unit,
            dataset,
        });

        return this.metricRepository.save(newMetric);
    }

    // Seed method for basic templates
    async seedTemplates() {
        const count = await this.templateRepository.count();
        if (count > 0) return;

        const templates: Partial<MetricTemplateEntity>[] = [
            // Retail
            {
                name: 'Total Sales Revenue',
                sector: BusinessSector.RETAIL,
                description: 'Sum of all sales transactions for the period.',
                expressionTemplate: 'SUM({{amount}})',
                requiredColumns: ['amount'],
                businessContext: 'Core revenue tracking for branch-wise performance.',
                unit: 'TZS'
            },
            {
                name: 'Gross Margin %',
                sector: BusinessSector.RETAIL,
                description: 'Profit percentage after cost of goods sold.',
                expressionTemplate: '(SUM({{revenue}}) - SUM({{cost}})) / SUM({{revenue}}) * 100',
                requiredColumns: ['revenue', 'cost'],
                businessContext: 'Profitability metric for cross-branch comparison.',
                unit: '%'
            },
            // Lending
            {
                name: 'NPL Ratio',
                sector: BusinessSector.FINANCE,
                description: 'Percentage of non-performing loans in the portfolio.',
                expressionTemplate: 'SUM(CASE WHEN {{days_past_due}} > 90 THEN {{balance}} ELSE 0 END) / SUM({{balance}}) * 100',
                requiredColumns: ['days_past_due', 'balance'],
                businessContext: 'Critical risk monitoring for micro-finance institutions.',
                unit: '%'
            },
            // Logistics
            {
                name: 'On-time Delivery Rate',
                sector: BusinessSector.LOGISTICS,
                description: 'Percentage of shipments delivered within SLA.',
                expressionTemplate: 'COUNT(CASE WHEN {{delivered_at}} <= {{promised_at}} THEN 1 END) / COUNT(*) * 100',
                requiredColumns: ['delivered_at', 'promised_at'],
                businessContext: 'Reliability metric for supply chain performance.',
                unit: '%'
            }
        ];

        await this.templateRepository.save(this.templateRepository.create(templates));
    }
}

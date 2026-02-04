"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dataset_entity_1 = require("./entities/dataset.entity");
let DatasetService = class DatasetService {
    datasetRepository;
    metricRepository;
    dimensionRepository;
    constructor(datasetRepository, metricRepository, dimensionRepository) {
        this.datasetRepository = datasetRepository;
        this.metricRepository = metricRepository;
        this.dimensionRepository = dimensionRepository;
    }
    async create(data) {
        const dataset = this.datasetRepository.create(data);
        return this.datasetRepository.save(dataset);
    }
    async findAll() {
        return this.datasetRepository.find({ relations: ['metrics', 'dimensions', 'dataSource'] });
    }
    async findOne(id) {
        const dataset = await this.datasetRepository.findOne({
            where: { id },
            relations: ['metrics', 'dimensions', 'dataSource'],
        });
        if (!dataset) {
            throw new common_1.NotFoundException(`Dataset with ID ${id} not found`);
        }
        return dataset;
    }
    async addMetric(datasetId, metricData) {
        const dataset = await this.findOne(datasetId);
        const metric = this.metricRepository.create({ ...metricData, dataset });
        return this.metricRepository.save(metric);
    }
    async addDimension(datasetId, dimensionData) {
        const dataset = await this.findOne(datasetId);
        const dimension = this.dimensionRepository.create({ ...dimensionData, dataset });
        return this.dimensionRepository.save(dimension);
    }
    async removeMetric(id) {
        await this.metricRepository.delete(id);
    }
    async removeDimension(id) {
        await this.dimensionRepository.delete(id);
    }
    async generateSql(datasetId, options) {
        const dataset = await this.findOne(datasetId);
        const selectedDimensions = dataset.dimensions.filter(d => options.dimensions.includes(d.id));
        const selectedMetrics = dataset.metrics.filter(m => options.metrics.includes(m.id));
        if (selectedDimensions.length === 0 && selectedMetrics.length === 0) {
            return `SELECT * FROM ${dataset.tableName} LIMIT 100`;
        }
        const selectParts = [];
        const groupByParts = [];
        selectedDimensions.forEach(d => {
            selectParts.push(`${d.expression} AS "${d.name}"`);
            groupByParts.push(`${d.expression}`);
        });
        selectedMetrics.forEach(m => {
            selectParts.push(`${m.expression} AS "${m.name}"`);
        });
        let sql = `SELECT ${selectParts.join(', ')} FROM ${dataset.tableName}`;
        if (groupByParts.length > 0) {
            sql += ` GROUP BY ${groupByParts.join(', ')}`;
        }
        return sql;
    }
};
exports.DatasetService = DatasetService;
exports.DatasetService = DatasetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dataset_entity_1.DatasetEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(dataset_entity_1.MetricEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(dataset_entity_1.DimensionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DatasetService);
//# sourceMappingURL=dataset.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_service_1 = require("./data-source.service");
const data_source_controller_1 = require("./data-source.controller");
const data_source_entity_1 = require("./entities/data-source.entity");
const adapter_factory_1 = require("./adapters/adapter.factory");
const audit_module_1 = require("../audit/audit.module");
let DataSourceModule = class DataSourceModule {
};
exports.DataSourceModule = DataSourceModule;
exports.DataSourceModule = DataSourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([data_source_entity_1.DataSourceEntity]),
            audit_module_1.AuditModule
        ],
        providers: [data_source_service_1.DataSourceService, adapter_factory_1.AdapterFactory],
        controllers: [data_source_controller_1.DataSourceController],
        exports: [data_source_service_1.DataSourceService, adapter_factory_1.AdapterFactory],
    })
], DataSourceModule);
//# sourceMappingURL=data-source.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapterFactory = void 0;
const common_1 = require("@nestjs/common");
const data_source_entity_1 = require("../entities/data-source.entity");
const postgres_adapter_1 = require("./postgres.adapter");
const sqlite_adapter_1 = require("./sqlite.adapter");
let AdapterFactory = class AdapterFactory {
    getAdapter(type, config) {
        switch (type) {
            case data_source_entity_1.DataSourceType.POSTGRES:
                return new postgres_adapter_1.PostgresAdapter(config);
            case data_source_entity_1.DataSourceType.SQLITE:
                return new sqlite_adapter_1.SQLiteAdapter(config);
            default:
                throw new Error(`Unsupported data source type: ${type}`);
        }
    }
};
exports.AdapterFactory = AdapterFactory;
exports.AdapterFactory = AdapterFactory = __decorate([
    (0, common_1.Injectable)()
], AdapterFactory);
//# sourceMappingURL=adapter.factory.js.map
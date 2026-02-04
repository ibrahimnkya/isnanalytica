"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryModule = void 0;
const common_1 = require("@nestjs/common");
const query_service_1 = require("./query.service");
const query_controller_1 = require("./query.controller");
const data_source_module_1 = require("../data-source/data-source.module");
let QueryModule = class QueryModule {
};
exports.QueryModule = QueryModule;
exports.QueryModule = QueryModule = __decorate([
    (0, common_1.Module)({
        imports: [data_source_module_1.DataSourceModule],
        providers: [query_service_1.QueryService],
        controllers: [query_controller_1.QueryController],
    })
], QueryModule);
//# sourceMappingURL=query.module.js.map
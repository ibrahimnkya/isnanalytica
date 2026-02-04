import { DataSourceService } from '../data-source/data-source.service';
import { User } from '../user/user.entity';
export declare class QueryService {
    private readonly dataSourceService;
    private validator;
    constructor(dataSourceService: DataSourceService);
    executeQuery(dataSourceId: string, sql: string, user?: User): Promise<any>;
    private applyRLS;
}

import { QueryService } from './query.service';
export declare class QueryController {
    private readonly queryService;
    constructor(queryService: QueryService);
    executeQuery(dataSourceId: string, sql: string, req: any): Promise<any>;
}

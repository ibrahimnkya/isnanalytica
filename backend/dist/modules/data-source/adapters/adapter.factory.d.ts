import { DataSourceType } from '../entities/data-source.entity';
import { DataAdapter } from './data-adapter.interface';
export declare class AdapterFactory {
    getAdapter(type: DataSourceType, config: any): DataAdapter;
}

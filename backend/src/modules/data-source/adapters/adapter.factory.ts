import { Injectable } from '@nestjs/common';
import { DataSourceType } from '../entities/data-source.entity';
import { DataAdapter } from './data-adapter.interface';
import { PostgresAdapter } from './postgres.adapter';
import { SQLiteAdapter } from './sqlite.adapter';

@Injectable()
export class AdapterFactory {
    getAdapter(type: DataSourceType, config: any): DataAdapter {
        switch (type) {
            case DataSourceType.POSTGRES:
                return new PostgresAdapter(config);
            case DataSourceType.SQLITE:
                return new SQLiteAdapter(config);
            // Add other adapters here as needed
            default:
                throw new Error(`Unsupported data source type: ${type}`);
        }
    }
}

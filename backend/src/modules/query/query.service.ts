import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSourceService } from '../data-source/data-source.service';
import { SqlValidator } from './sql-validator';
import { User } from '../user/user.entity';

@Injectable()
export class QueryService {
    private validator: SqlValidator;

    constructor(private readonly dataSourceService: DataSourceService) {
        this.validator = new SqlValidator();
    }

    async executeQuery(dataSourceId: string, sql: string, user?: User): Promise<any> {
        const dataSource = await this.dataSourceService.findOne(dataSourceId);

        // 1. Validate read-only
        if (!this.validator.validateReadOnly(sql, dataSource.type)) {
            throw new BadRequestException('Only SELECT queries are allowed for security reasons.');
        }

        // 2. Sanitize
        let processedSql = this.validator.sanitize(sql);

        // 3. Enforce Row-Level Security (RLS)
        if (user && user.organization) {
            processedSql = this.applyRLS(processedSql, user);
        }

        console.log(`[QueryService] Executing SQL: "${processedSql}" on data-source: ${dataSourceId}`);

        // 4. Execute
        try {
            return await this.dataSourceService.runRawQuery(dataSourceId, processedSql, user?.id);
        } catch (error) {
            throw new BadRequestException(`Query Execution Error: ${error.message}`);
        }
    }

    /**
     * Simple RLS implementation that adds a WHERE clause filter
     * This assumes the table has an 'organization_id' or similar column.
     * In a real enterprise app, we'd use a more robust SQL parser to inject filters.
     */
    private applyRLS(sql: string, user: User): string {
        if (!user.organization) return sql;
        const orgId = user.organization.id;

        // Very basic RLS: if query doesn't have WHERE, add one. If it does, append AND.
        // This is a naive implementation for the MVP.
        const rlsFilter = `organization_id = '${orgId}'`;

        if (sql.toLowerCase().includes('where')) {
            // Find where to insert. This is tricky with subqueries/joins.
            // For MVP, we'll just append it if it's a simple query.
            // A better way is using node-sql-parser (which is in package.json)
            return sql.replace(/where/i, `WHERE (${rlsFilter}) AND `);
        } else {
            // Append after table name or before ORDER BY / LIMIT
            if (sql.toLowerCase().includes('order by')) {
                return sql.replace(/order by/i, `WHERE ${rlsFilter} ORDER BY`);
            }
            if (sql.toLowerCase().includes('limit')) {
                return sql.replace(/limit/i, `WHERE ${rlsFilter} LIMIT`);
            }
            return `${sql} WHERE ${rlsFilter}`;
        }
    }
}

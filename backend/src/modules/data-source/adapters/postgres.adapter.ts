import { Client } from 'pg';
import { DataAdapter, QueryResult, ColumnInfo } from '../adapters/data-adapter.interface';

export class PostgresAdapter implements DataAdapter {
    private client: Client;

    constructor(private config: any) {
        this.client = new Client(this.config);
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
        } catch (error) {
            console.error('Postgres connect error:', error);
            throw error;
        }
    }

    async test(): Promise<boolean> {
        const testClient = new Client(this.config);
        try {
            await testClient.connect();
            await testClient.end();
            return true;
        } catch (error) {
            console.error('Postgres test error:', error);
            return false;
        }
    }

    async getSchemas(): Promise<string[]> {
        const sql = `SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog')`;
        const res = await this.runQuery(sql);
        return res.rows.map(r => r.schema_name);
    }

    async getTables(schema: string): Promise<string[]> {
        const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE'`;
        const res = await this.runRawQuery(sql, [schema]);
        return res.rows.map(r => r.table_name);
    }

    async getColumns(schema: string, table: string): Promise<ColumnInfo[]> {
        const sql = `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position`;
        const res = await this.runRawQuery(sql, [schema, table]);
        return res.rows;
    }

    async runQuery(sql: string): Promise<QueryResult> {
        return this.runRawQuery(sql);
    }

    private async runRawQuery(sql: string, params: any[] = []): Promise<QueryResult> {
        const runClient = new Client(this.config);
        try {
            await runClient.connect();
            const res = await runClient.query(sql, params);
            await runClient.end();
            return {
                columns: res.fields.map(f => f.name),
                rows: res.rows,
                rowCount: res.rowCount || 0,
            };
        } catch (error) {
            await runClient.end();
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        await this.client.end();
    }
}

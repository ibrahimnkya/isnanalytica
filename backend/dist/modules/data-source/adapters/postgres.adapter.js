"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAdapter = void 0;
const pg_1 = require("pg");
class PostgresAdapter {
    config;
    client;
    constructor(config) {
        this.config = config;
        this.client = new pg_1.Client(this.config);
    }
    async connect() {
        try {
            await this.client.connect();
        }
        catch (error) {
            console.error('Postgres connect error:', error);
            throw error;
        }
    }
    async test() {
        const testClient = new pg_1.Client(this.config);
        try {
            await testClient.connect();
            await testClient.end();
            return true;
        }
        catch (error) {
            console.error('Postgres test error:', error);
            return false;
        }
    }
    async getSchemas() {
        const sql = `SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog')`;
        const res = await this.runQuery(sql);
        return res.rows.map(r => r.schema_name);
    }
    async getTables(schema) {
        const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE'`;
        const res = await this.runRawQuery(sql, [schema]);
        return res.rows.map(r => r.table_name);
    }
    async getColumns(schema, table) {
        const sql = `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position`;
        const res = await this.runRawQuery(sql, [schema, table]);
        return res.rows;
    }
    async runQuery(sql) {
        return this.runRawQuery(sql);
    }
    async runRawQuery(sql, params = []) {
        const runClient = new pg_1.Client(this.config);
        try {
            await runClient.connect();
            const res = await runClient.query(sql, params);
            await runClient.end();
            return {
                columns: res.fields.map(f => f.name),
                rows: res.rows,
                rowCount: res.rowCount || 0,
            };
        }
        catch (error) {
            await runClient.end();
            throw error;
        }
    }
    async disconnect() {
        await this.client.end();
    }
}
exports.PostgresAdapter = PostgresAdapter;
//# sourceMappingURL=postgres.adapter.js.map
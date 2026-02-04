'use client';

import { useState, useEffect } from 'react';
import { Database, Table, ChevronRight, ChevronDown, Loader2, Search } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface SchemaBrowserProps {
    dataSourceId: string;
    onItemClick?: (value: string) => void;
}

export function SchemaBrowser({ dataSourceId, onItemClick }: SchemaBrowserProps) {
    const [schemas, setSchemas] = useState<string[]>([]);
    const [expandedSchemas, setExpandedSchemas] = useState<Record<string, boolean>>({});
    const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({});
    const [tables, setTables] = useState<Record<string, string[]>>({});
    const [columns, setColumns] = useState<Record<string, any[]>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!dataSourceId) return;
        const loadSchemas = async () => {
            setIsLoading(true);
            try {
                const data = await fetchApi(`/data-sources/${dataSourceId}/schemas`);
                setSchemas(data);
                // Auto-expand public schema if it exists
                if (data.includes('public')) {
                    setExpandedSchemas({ public: true });
                    loadTables('public');
                }
            } catch (error) {
                console.error('Failed to load schemas:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadSchemas();
    }, [dataSourceId]);

    const loadTables = async (schema: string) => {
        if (tables[schema]) return;
        try {
            const data = await fetchApi(`/data-sources/${dataSourceId}/schemas/${schema}/tables`);
            setTables(prev => ({ ...prev, [schema]: data }));
        } catch (error) {
            console.error('Failed to load tables:', error);
        }
    };

    const loadColumns = async (schema: string, table: string) => {
        const key = `${schema}.${table}`;
        if (columns[key]) return;
        try {
            const data = await fetchApi(`/data-sources/${dataSourceId}/schemas/${schema}/tables/${table}/columns`);
            setColumns(prev => ({ ...prev, [key]: data }));
        } catch (error) {
            console.error('Failed to load columns:', error);
        }
    };

    const toggleSchema = (schema: string) => {
        setExpandedSchemas(prev => {
            const isExpanded = !prev[schema];
            if (isExpanded) loadTables(schema);
            return { ...prev, [schema]: isExpanded };
        });
    };

    const toggleTable = (schema: string, table: string) => {
        const key = `${schema}.${table}`;
        setExpandedTables(prev => {
            const isExpanded = !prev[key];
            if (isExpanded) loadColumns(schema, table);
            return { ...prev, [key]: isExpanded };
        });
    };

    if (!dataSourceId) {
        return (
            <div className="text-center py-12 text-zinc-400 italic text-sm">
                Select a data source to browse schemas
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-300" />
                </div>
            ) : schemas.map((schema) => (
                <div key={schema} className="space-y-1">
                    <button
                        onClick={() => toggleSchema(schema)}
                        className="flex w-full items-center rounded-md px-2 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
                    >
                        {expandedSchemas[schema] ? (
                            <ChevronDown className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                        ) : (
                            <ChevronRight className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                        )}
                        <Database className="mr-2 h-3.5 w-3.5 text-zinc-400" />
                        {schema}
                    </button>

                    {expandedSchemas[schema] && (
                        <div className="ml-4 space-y-1 border-l border-zinc-100 pl-2">
                            {tables[schema]?.map((table) => {
                                const tableKey = `${schema}.${table}`;
                                return (
                                    <div key={table}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTable(schema, table);
                                                onItemClick?.(table);
                                            }}
                                            className="flex w-full items-center rounded-md px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer group"
                                        >
                                            {expandedTables[tableKey] ? (
                                                <ChevronDown className="mr-1.5 h-3 w-3 text-zinc-400" />
                                            ) : (
                                                <ChevronRight className="mr-1.5 h-3 w-3 text-zinc-400" />
                                            )}
                                            <Table className="mr-2 h-3.5 w-3.5 text-zinc-300 group-hover:text-primary transition-colors" />
                                            <span className="group-hover:text-zinc-900 transition-colors">{table}</span>
                                        </button>

                                        {expandedTables[tableKey] && (
                                            <div className="ml-4 space-y-0.5 border-l border-zinc-100 pl-2 py-1">
                                                {columns[tableKey]?.map((col) => (
                                                    <div
                                                        key={col.column_name}
                                                        className="flex items-center justify-between px-2 py-0.5 text-[10px] hover:bg-zinc-50 rounded cursor-pointer group"
                                                        onClick={() => onItemClick?.(col.column_name)}
                                                    >
                                                        <span className="text-zinc-500 font-medium group-hover:text-zinc-900 transition-colors">{col.column_name}</span>
                                                        <span className="text-zinc-300 italic uppercase group-hover:text-zinc-400 transition-colors">{col.data_type}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            {!tables[schema] && <div className="py-2 pl-6"><Loader2 className="h-3 w-3 animate-spin text-zinc-300" /></div>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

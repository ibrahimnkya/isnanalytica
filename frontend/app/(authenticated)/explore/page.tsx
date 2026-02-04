'use client';

import { useState, useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import {
    Play,
    Database,
    Table,
    ChevronRight,
    Loader2,
    AlertCircle,
    Download,
    Clock,
    Layers,
    Zap,
    CheckCircle2,
    XCircle,
    Menu,
    ChevronLeft,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { DataSource } from '@/types';
import { SchemaBrowser } from '@/components/SchemaBrowser';

export default function ExplorePage() {
    const [dataSources, setDataSources] = useState<DataSource[]>([]);
    const [selectedDataSource, setSelectedDataSource] = useState<string>('');
    const [sql, setSql] = useState('SELECT * FROM users LIMIT 10');
    const [results, setResults] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataSourcesLoading, setIsDataSourcesLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [executionTime, setExecutionTime] = useState<number | null>(null);
    const [isBrowserCollapsed, setIsBrowserCollapsed] = useState(false);
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const handleInsertText = (text: string) => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const selection = editor.getSelection();
            const range = {
                startLineNumber: selection.startLineNumber,
                startColumn: selection.startColumn,
                endLineNumber: selection.endLineNumber,
                endColumn: selection.endColumn,
            };
            editor.executeEdits('schema-browser', [
                { range, text, forceMoveMarkers: true },
            ]);
            editor.focus();
        } else {
            // Fallback if editor not mounted
            setSql(prev => prev + ' ' + text);
        }
    };

    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const data = await fetchApi('/data-sources');
                setDataSources(data);
                if (data.length > 0) setSelectedDataSource(data[0].id);
            } catch (error) {
                console.error('Failed to fetch data sources:', error);
            } finally {
                setIsDataSourcesLoading(false);
            }
        };
        fetchDataSources();
    }, []);

    const handleRunQuery = async () => {
        if (!selectedDataSource) return;
        setIsLoading(true);
        setError(null);
        const startTime = performance.now();

        try {
            const data = await fetchApi(`/query/${selectedDataSource}`, {
                method: 'POST',
                body: JSON.stringify({ sql }),
            });
            setResults(data);
            setExecutionTime(performance.now() - startTime);
        } catch (err: any) {
            setError(err.message);
            setResults(null);
            setExecutionTime(null);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedSource = dataSources.find(ds => ds.id === selectedDataSource);

    return (
        <div className="min-h-[calc(100vh-140px)] flex flex-col pb-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg" />
                                <div className="relative h-11 w-11 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20">
                                    <Play className="h-5 w-5 text-primary fill-primary" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                                    SQL Laboratory
                                </h1>
                                <p className="text-sm text-foreground-secondary font-medium mt-0.5">
                                    Direct database access and query execution
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Control Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Data Source Selector */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                            <select
                                className="w-full relative px-4 py-2.5 bg-surface border border-border rounded-xl text-sm font-semibold text-foreground sm:min-w-[240px] appearance-none cursor-pointer hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                value={selectedDataSource}
                                onChange={(e) => setSelectedDataSource(e.target.value)}
                            >
                                {dataSources.map((ds) => (
                                    <option key={ds.id} value={ds.id}>
                                        {ds.name} • {ds.type.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <Database className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" strokeWidth={2} />
                        </div>

                        {/* Execute Button */}
                        <button
                            onClick={handleRunQuery}
                            disabled={isLoading || !selectedDataSource}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 group-disabled:opacity-25 transition-opacity" />
                            <div className="relative w-full px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center justify-center gap-2 group-hover:scale-105 group-disabled:scale-100 group-disabled:opacity-50 transition-all shadow-lg shadow-primary/20">
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                                ) : (
                                    <Play className="h-4 w-4 fill-black" strokeWidth={2.5} />
                                )}
                                {isLoading ? 'Executing...' : 'Run Query'}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Status Bar */}
                {selectedSource && (
                    <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 px-4 py-3 bg-surface/50 border border-border/50 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,106,0.6)] animate-pulse" />
                            <span className="text-xs font-bold text-foreground">Connected</span>
                        </div>
                        <div className="hidden sm:block h-4 w-px bg-border" />
                        <div className="flex items-center gap-2 text-xs text-foreground-secondary font-medium">
                            <Database className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                            <span>{selectedSource.type === 'sqlite' ? 'Ephemeral Storage' : selectedSource.connectionConfig.database}</span>
                        </div>
                        {executionTime !== null && (
                            <>
                                <div className="hidden sm:block h-4 w-px bg-border" />
                                <div className="flex items-center gap-2 text-xs text-foreground-secondary font-medium">
                                    <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                                    <span>{executionTime.toFixed(0)}ms</span>
                                </div>
                            </>
                        )}
                        {results && (
                            <>
                                <div className="hidden sm:block h-4 w-px bg-border" />
                                <div className="flex items-center gap-2 text-xs text-foreground-secondary font-medium">
                                    <Layers className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                                    <span>{results.rowCount} rows returned</span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                {/* Schema Browser - Left Sidebar (Above on Mobile) */}
                <div className={`
                    w-full shrink-0 transition-all duration-300 ease-in-out
                    ${isBrowserCollapsed ? 'lg:w-[60px]' : 'lg:w-80'}
                    flex flex-col
                `}>
                    <div className="relative group h-[300px] lg:h-full">
                        <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                        <div className="relative h-full glass-card rounded-2xl border border-border overflow-hidden flex flex-col backdrop-blur-xl">
                            {/* Header */}
                            <div className="px-5 py-4 border-b border-border/50 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-sm">
                                <div className="flex items-center justify-between w-full">
                                    {!isBrowserCollapsed && (
                                        <div className="flex items-center gap-2 animate-in fade-in duration-300">
                                            <Database className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                            <h3 className="font-bold text-[10px] tracking-wider text-foreground uppercase whitespace-nowrap">
                                                Schema Browser
                                            </h3>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setIsBrowserCollapsed(!isBrowserCollapsed)}
                                        className="p-1 hover:bg-surface-hover rounded-md transition-colors text-foreground-muted hover:text-primary"
                                        title={isBrowserCollapsed ? "Expand Browser" : "Collapse Browser"}
                                    >
                                        {isBrowserCollapsed ? (
                                            <PanelLeftOpen className="h-4 w-4" strokeWidth={2} />
                                        ) : (
                                            <PanelLeftClose className="h-4 w-4" strokeWidth={2} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Browser Content */}
                            <div className={`flex-1 overflow-y-auto bg-card-bg transition-opacity duration-300 ${isBrowserCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <SchemaBrowser
                                    dataSourceId={selectedDataSource}
                                    onItemClick={handleInsertText}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor and Results - Main Area */}
                <div className="flex-1 flex flex-col gap-6 min-h-0">
                    {/* SQL Editor */}
                    <div className="h-[300px] lg:h-[45%] lg:min-h-[250px] relative group shrink-0">
                        <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                        <div className="relative h-full rounded-2xl border border-border bg-surface overflow-hidden backdrop-blur-xl">
                            {/* Editor Header */}
                            <div className="absolute top-0 left-0 right-0 z-10 px-5 py-3 bg-gradient-to-b from-surface via-surface/95 to-surface/0 border-b border-border/30 backdrop-blur-sm flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                    <span className="text-xs font-bold tracking-wider text-foreground uppercase">Query Editor</span>
                                </div>
                                <div className="flex items-center gap-2 text-foreground-muted text-[10px]">
                                    <span className="bg-surface/60 px-2 py-1 rounded border border-border/50 uppercase tracking-wider">
                                        SQL
                                    </span>
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <div className="h-full pt-12">
                                <Editor
                                    height="100%"
                                    defaultLanguage="sql"
                                    theme="vs-dark"
                                    value={sql}
                                    onChange={(value) => setSql(value || '')}
                                    onMount={handleEditorDidMount}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Monaco, "Courier New", monospace',
                                        fontLigatures: true,
                                        padding: { top: 16, bottom: 16 },
                                        scrollBeyondLastLine: false,
                                        lineNumbers: 'on',
                                        renderLineHighlight: 'all',
                                        cursorBlinking: 'smooth',
                                        smoothScrolling: true,
                                        contextmenu: true,
                                        suggest: {
                                            showKeywords: true,
                                            showSnippets: true,
                                        },
                                        wordWrap: 'on',
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Query Results */}
                    <div className="flex-1 relative group overflow-hidden">
                        <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                        <div className="relative h-full glass-card rounded-2xl border border-border overflow-hidden flex flex-col backdrop-blur-xl">
                            {/* Results Header */}
                            <div className="px-5 py-4 border-b border-border/50 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-sm flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <Table className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                    <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
                                        Query Results
                                    </h3>
                                    {results && (
                                        <div className="flex items-center gap-2 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg">
                                            <CheckCircle2 className="h-3 w-3 text-primary" strokeWidth={2.5} />
                                            <span className="text-xs font-bold text-primary">
                                                {results.rowCount} rows
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {results && !error && (
                                    <button className="group/export flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-foreground-secondary hover:text-foreground bg-surface/50 hover:bg-surface border border-border/50 hover:border-primary/30 rounded-lg transition-all">
                                        <Download className="h-3.5 w-3.5 group-hover/export:translate-y-0.5 transition-transform" strokeWidth={2} />
                                        Export CSV
                                    </button>
                                )}
                            </div>

                            {/* Results Content */}
                            <div className="flex-1 overflow-auto bg-card-bg">
                                {/* Error State */}
                                {error && (
                                    <div className="p-8 max-w-3xl mx-auto">
                                        <div className="relative group/error">
                                            <div className="absolute -inset-px bg-gradient-to-b from-red-500/20 to-transparent rounded-2xl blur-sm" />
                                            <div className="relative rounded-2xl bg-red-500/5 p-6 border border-red-500/20 flex items-start gap-4">
                                                <div className="relative shrink-0">
                                                    <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg" />
                                                    <div className="relative h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                                        <XCircle className="h-6 w-6 text-red-400" strokeWidth={2} />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                                                            Query Execution Failed
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm text-foreground-secondary font-medium leading-relaxed break-words">
                                                        {error}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Loading State */}
                                {isLoading && (
                                    <div className="flex h-full items-center justify-center">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                                                <div className="relative h-16 w-16 rounded-2xl border-2 border-primary/20 bg-surface/50 flex items-center justify-center">
                                                    <Loader2 className="h-8 w-8 animate-spin text-primary" strokeWidth={2.5} />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-2">
                                                <p className="text-sm font-bold text-foreground">Executing Query</p>
                                                <p className="text-xs text-foreground-muted">Processing your request...</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Results Table */}
                                {results && !error && (
                                    <div className="relative">
                                        <table className="w-full text-left text-sm border-collapse">
                                            <thead className="sticky top-0 bg-surface/95 backdrop-blur-md border-b border-border z-10">
                                                <tr>
                                                    {results.columns.map((col: string, idx: number) => (
                                                        <th
                                                            key={col}
                                                            className="px-6 py-3.5 font-bold text-foreground-muted text-xs uppercase tracking-wider first:pl-8 last:pr-8"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {col}
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/50">
                                                {results.rows.map((row: any, i: number) => (
                                                    <tr
                                                        key={i}
                                                        className="group hover:bg-primary/5 transition-colors"
                                                    >
                                                        {results.columns.map((col: string, idx: number) => (
                                                            <td
                                                                key={col}
                                                                className="px-6 py-3.5 text-foreground-secondary font-medium whitespace-nowrap group-hover:text-foreground transition-colors first:pl-8 last:pr-8"
                                                            >
                                                                {row[col] !== null && row[col] !== undefined ? (
                                                                    <span>{row[col].toString()}</span>
                                                                ) : (
                                                                    <span className="text-foreground-muted/50 italic text-xs font-normal">
                                                                        NULL
                                                                    </span>
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Empty State */}
                                {!isLoading && !results && !error && (
                                    <div className="flex h-full items-center justify-center">
                                        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                                                <div className="relative h-20 w-20 bg-gradient-to-br from-surface-alt to-surface rounded-3xl flex items-center justify-center border border-border/50">
                                                    <Play className="h-10 w-10 text-foreground-muted fill-foreground-muted/10" strokeWidth={2} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-base font-bold text-foreground">Ready to Execute</h3>
                                                <p className="text-sm text-foreground-muted leading-relaxed">
                                                    Write your SQL query above and click "Run Query" to see results here.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
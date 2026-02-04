'use client';

import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { MoreVertical, Maximize2, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { Chart } from '@/types';
import { useTheme } from './ThemeProvider';

interface DashboardCardProps {
    chart: Chart;
}

export function DashboardCard({ chart }: DashboardCardProps) {
    const { theme } = useTheme();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const sqlResp = await fetchApi(`/datasets/${chart.dataset.id}/generate-sql`, {
                method: 'POST',
                body: JSON.stringify({
                    dimensions: chart.config.dimensions,
                    metrics: chart.config.metrics,
                }),
            });

            const queryData = await fetchApi(`/query/${chart.dataset.dataSource.id}`, {
                method: 'POST',
                body: JSON.stringify({ sql: sqlResp }),
            });

            setData(queryData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [chart]);

    const getOption = () => {
        if (!data) return {};
        const xAxisData = data.rows.map((r: any) => r[data.columns[0]]);
        const series = data.columns.slice(1).map((col: string) => ({
            name: col,
            type: chart.type === 'pie' ? 'pie' : chart.type,
            data: data.rows.map((r: any) => r[col]),
            smooth: chart.type === 'line',
            color: theme === 'dark' ? '#ffffff' : '#000000',
        }));

        return {
            backgroundColor: 'transparent',
            textStyle: { color: theme === 'dark' ? '#fafafa' : '#09090b' },
            tooltip: {
                trigger: chart.type === 'pie' ? 'item' : 'axis',
                backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
                textStyle: { color: theme === 'dark' ? '#fafafa' : '#09090b' }
            },
            xAxis: chart.type === 'pie' ? undefined : {
                type: 'category',
                data: xAxisData,
                axisLine: { lineStyle: { color: theme === 'dark' ? '#27272a' : '#e4e4e7' } },
                axisLabel: { color: theme === 'dark' ? '#a1a1aa' : '#71717a' }
            },
            yAxis: chart.type === 'pie' ? undefined : {
                type: 'value',
                splitLine: { lineStyle: { color: theme === 'dark' ? '#18181b' : '#f4f4f5' } },
                axisLabel: { color: theme === 'dark' ? '#a1a1aa' : '#71717a' }
            },
            series: series,
            grid: { top: 20, bottom: 40, left: 40, right: 20 },
        };
    };

    return (
        <div className="flex flex-col rounded-2xl border border-border bg-card-bg backdrop-blur-sm overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group h-full">
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface-alt/50">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider truncate">{chart.name}</h3>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={loadData} className="p-1.5 rounded-lg hover:bg-surface text-foreground-muted hover:text-primary transition-all">
                        <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-surface text-foreground-muted hover:text-foreground transition-all">
                        <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 p-4 relative min-h-[300px]">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <AlertCircle className="h-8 w-8 text-red-500 mb-2 opacity-20" />
                        <p className="text-xs text-zinc-500 max-w-[200px] font-medium">{error}</p>
                    </div>
                ) : data ? (
                    chart.type === 'table' ? (
                        <div className="w-full overflow-auto max-h-full text-[10px] font-medium">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border">
                                        {data.columns.map((c: string) => <th key={c} className="py-3 pr-4 font-black uppercase tracking-widest text-zinc-500">{c}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.rows.slice(0, 10).map((r: any, i: number) => (
                                        <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                                            {data.columns.map((c: string) => <td key={c} className="py-3 pr-4 text-foreground">{r[c]}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <ReactECharts
                            option={getOption()}
                            style={{ height: '100%', width: '100%' }}
                            theme={theme === 'dark' ? 'dark' : undefined}
                            notMerge={true}
                        />
                    )
                ) : null}
            </div>
        </div>
    );
}

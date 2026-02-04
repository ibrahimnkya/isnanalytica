'use client';

import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import {
    BarChart,
    LineChart,
    PieChart as PieChartIcon,
    Table as TableIcon,
    Play,
    Save,
    ChevronRight,
    Plus,
    X,
    Loader2,
    CheckCircle2,
    Database,
    Zap
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { Dataset, Metric, Dimension } from '@/types';

export function ChartBuilder() {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
    const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'table'>('bar');
    const [chartData, setChartData] = useState<any>(null);
    const [chartName, setChartName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDatasetsLoading, setIsDatasetsLoading] = useState(true);

    useEffect(() => {
        const loadDatasets = async () => {
            try {
                const data = await fetchApi('/datasets');
                setDatasets(data);
                if (data.length > 0) setSelectedDataset(data[0]);
            } catch (error) {
                console.error('Failed to load datasets:', error);
            } finally {
                setIsDatasetsLoading(false);
            }
        };
        loadDatasets();
    }, []);

    const handleRun = async () => {
        if (!selectedDataset) return;
        setIsLoading(true);
        try {
            const sqlResp = await fetchApi(`/datasets/${selectedDataset.id}/generate-sql`, {
                method: 'POST',
                body: JSON.stringify({
                    dimensions: selectedDimensions,
                    metrics: selectedMetrics,
                }),
            });

            const data = await fetchApi(`/query/${selectedDataset.dataSource.id}`, {
                method: 'POST',
                body: JSON.stringify({ sql: sqlResp }),
            });

            setChartData(data);
        } catch (error) {
            alert('Failed to generate chart: ' + error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedDataset || !chartName) {
            alert('Please provide a chart name and select a dataset.');
            return;
        }
        setIsSaving(true);
        try {
            await fetchApi('/charts', {
                method: 'POST',
                body: JSON.stringify({
                    name: chartName,
                    type: chartType,
                    datasetId: selectedDataset.id,
                    config: {
                        dimensions: selectedDimensions,
                        metrics: selectedMetrics,
                    }
                }),
            });
            alert('Chart saved successfully!');
        } catch (error) {
            alert('Failed to save chart: ' + error);
        } finally {
            setIsSaving(false);
        }
    };

    const getEChartsOption = () => {
        if (!chartData) return {};

        const xAxisData = chartData.rows.map((r: any) => r[chartData.columns[0]]);
        const series = chartData.columns.slice(1).map((col: string) => ({
            name: col,
            type: chartType === 'pie' ? 'pie' : chartType,
            data: chartData.rows.map((r: any) => r[col]),
            smooth: chartType === 'line',
            radius: chartType === 'pie' ? ['40%', '70%'] : undefined,
            itemStyle: {
                borderRadius: chartType === 'bar' ? [4, 4, 0, 0] : 0,
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }));

        return {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: chartType === 'pie' ? 'item' : 'axis',
                backgroundColor: '#18181b',
                borderColor: '#27272a',
                textStyle: { color: '#fafafa' }
            },
            legend: {
                bottom: 0,
                textStyle: { color: '#a1a1aa' },
                icon: 'circle'
            },
            xAxis: chartType === 'pie' ? undefined : {
                type: 'category',
                data: xAxisData,
                axisLine: { lineStyle: { color: '#27272a' } },
                axisLabel: { color: '#71717a' }
            },
            yAxis: chartType === 'pie' ? undefined : {
                type: 'value',
                splitLine: { lineStyle: { color: '#18181b' } },
                axisLabel: { color: '#71717a' }
            },
            series: series,
            grid: { top: 40, bottom: 60, left: 60, right: 40 },
            color: ['#00FF41', '#00CC33', '#00AA2A', '#008822', '#FFFFFF', '#B3B3B3']
        };
    };

    return (
        <div className="grid grid-cols-12 h-[calc(100vh-160px)] gap-6 animate-in">
            {/* Left panel: Data selection */}
            <div className="col-span-3 glass-card rounded-2xl flex flex-col overflow-hidden border border-zinc-900 shadow-xl">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 font-bold text-sm tracking-wide text-zinc-300 flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    DATA CONFIGURATION
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-8">
                    <section>
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Target Dataset</label>
                        <select
                            className="w-full"
                            value={selectedDataset?.id || ''}
                            onChange={(e) => setSelectedDataset(datasets.find(d => d.id === e.target.value) || null)}
                        >
                            {datasets.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </section>

                    <section>
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Dimensions (X-Axis)</label>
                        <div className="space-y-2">
                            {selectedDataset?.dimensions.map(dim => (
                                <label key={dim.id} className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${selectedDimensions.includes(dim.id)
                                    ? "bg-primary/5 border-primary/20 text-primary"
                                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                    }`}>
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute h-4 w-4 cursor-pointer"
                                            checked={selectedDimensions.includes(dim.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedDimensions([...selectedDimensions, dim.id]);
                                                else setSelectedDimensions(selectedDimensions.filter(id => id !== dim.id));
                                            }}
                                        />
                                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${selectedDimensions.includes(dim.id) ? "bg-primary border-primary" : "border-zinc-600"
                                            }`}>
                                            {selectedDimensions.includes(dim.id) && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                    </div>
                                    <span className="ml-3 text-sm font-medium">{dim.name}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section>
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Metrics (Y-Axis)</label>
                        <div className="space-y-2">
                            {selectedDataset?.metrics.map(metric => (
                                <label key={metric.id} className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${selectedMetrics.includes(metric.id)
                                    ? "bg-primary/5 border-primary/20 text-primary"
                                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                    }`}>
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute h-4 w-4 cursor-pointer"
                                            checked={selectedMetrics.includes(metric.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedMetrics([...selectedMetrics, metric.id]);
                                                else setSelectedMetrics(selectedMetrics.filter(id => id !== metric.id));
                                            }}
                                        />
                                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${selectedMetrics.includes(metric.id) ? "bg-primary border-primary" : "border-zinc-600"
                                            }`}>
                                            {selectedMetrics.includes(metric.id) && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                    </div>
                                    <span className="ml-3 text-sm font-medium">{metric.name}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
                    <button
                        onClick={handleRun}
                        disabled={isLoading || !selectedDataset}
                        className="w-full flex items-center justify-center rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-950 hover:bg-white disabled:opacity-50 transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4 fill-zinc-950" />}
                        Generate Visualization
                    </button>
                </div>
            </div>

            {/* Center: Chart Preview */}
            <div className="col-span-12 lg:col-span-6 glass-card rounded-2xl flex flex-col overflow-hidden border border-zinc-900 shadow-xl">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                    <span className="font-bold text-xs tracking-widest text-zinc-500 uppercase">PREVIEW</span>
                    <div className="flex bg-zinc-950/80 p-1 rounded-xl border border-zinc-800">
                        {(['bar', 'line', 'pie', 'table'] as const).map(t => (
                            <button
                                key={t}
                                onClick={() => setChartType(t)}
                                title={t.charAt(0).toUpperCase() + t.slice(1)}
                                className={`p-2 rounded-lg transition-all ${chartType === t ? 'bg-zinc-800 text-primary shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {t === 'bar' && <BarChart className="h-4.5 w-4.5" />}
                                {t === 'line' && <LineChart className="h-4.5 w-4.5" />}
                                {t === 'pie' && <PieChartIcon className="h-4.5 w-4.5" />}
                                {t === 'table' && <TableIcon className="h-4.5 w-4.5" />}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-8 bg-zinc-950/20">
                    {chartData ? (
                        chartType === 'table' ? (
                            <div className="w-full overflow-auto max-h-full rounded-xl border border-zinc-900 bg-zinc-900/20">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="sticky top-0 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
                                        <tr>
                                            {chartData.columns.map((c: string) => <th key={c} className="px-5 py-3 font-bold text-zinc-400 text-xs uppercase tracking-wider">{c}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-900">
                                        {chartData.rows.map((r: any, i: number) => (
                                            <tr key={i} className="hover:bg-zinc-900/40 transition-colors">
                                                {chartData.columns.map((c: string) => <td key={c} className="px-5 py-3 text-zinc-400 font-medium">{r[c]}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <ReactECharts
                                option={getEChartsOption()}
                                style={{ height: '100%', width: '100%' }}
                                notMerge={true}
                                lazyUpdate={true}
                            />
                        )
                    ) : (
                        <div className="text-center group">
                            <div className="h-20 w-20 bg-zinc-900/50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-zinc-800 group-hover:border-primary/20 group-hover:bg-zinc-900 transition-all duration-500">
                                <BarChart className="h-10 w-10 text-zinc-700 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-zinc-300 font-semibold mb-1">Canvas is empty</h3>
                            <p className="text-zinc-500 text-sm max-w-[200px] leading-relaxed">Select dimensions and metrics to build your story.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right panel: Config */}
            <div className="col-span-12 lg:col-span-3 glass-card rounded-2xl flex flex-col overflow-hidden border border-zinc-900 shadow-xl">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 font-bold text-sm tracking-wide text-zinc-300">
                    VISUAL OPTIONS
                </div>
                <div className="p-5 space-y-8 flex-1 overflow-y-auto">
                    <section>
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Chart Identity</label>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] text-zinc-600 font-bold mb-1.5 block">TITLE</label>
                                <input
                                    type="text"
                                    className="w-full text-base font-medium py-3"
                                    placeholder="e.g., Q4 Revenue Growth"
                                    value={chartName}
                                    onChange={(e) => setChartName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-600 font-bold mb-1.5 block">DESCRIPTION</label>
                                <textarea
                                    className="w-full text-sm resize-none"
                                    rows={3}
                                    placeholder="Add context to this chart..."
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Visual Style</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-white text-black border border-white text-xs font-black uppercase rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">Minimalist</button>
                            <button className="p-3 bg-zinc-950 border border-zinc-800 text-zinc-600 text-xs font-black uppercase rounded-xl hover:text-zinc-400 transition-colors">Classic</button>
                        </div>
                    </section>
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !chartData}
                        className="w-full flex items-center justify-center rounded-xl bg-[#00FF41] px-4 py-3 text-sm font-black text-black hover:bg-[#00CC33] disabled:opacity-50 transition-all shadow-lg shadow-[#00FF41]/20 active:scale-[0.98]"
                    >
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Persist Visualization
                    </button>
                </div>
            </div>
        </div>
    );
}

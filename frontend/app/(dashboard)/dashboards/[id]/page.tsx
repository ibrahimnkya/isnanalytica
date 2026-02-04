'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Plus,
    Save,
    Trash2,
    Loader2,
    Maximize2,
    Calendar,
    Settings,
    ChevronLeft,
    BarChart3
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import { fetchApi } from '@/lib/api';
import { Dashboard, Chart } from '@/types';

export default function DashboardDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) loadDashboard();
    }, [id]);

    const loadDashboard = async () => {
        try {
            const data = await fetchApi(`/dashboards/${id}`);
            setDashboard(data);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEChartsOption = (chart: Chart) => {
        // Simple mock option generation for preview
        // In reality, this would use the chart.config and potentially fetch data
        return {
            backgroundColor: 'transparent',
            tooltip: { trigger: 'axis' },
            legend: { show: false },
            xAxis: { type: 'category', show: false },
            yAxis: { type: 'value', show: false },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: chart.type === 'table' ? 'bar' : chart.type,
                smooth: true,
                color: '#bef264'
            }],
            grid: { top: 0, bottom: 0, left: 0, right: 0 }
        };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-bold text-white">Dashboard not found</h2>
                <button onClick={() => router.back()} className="mt-4 text-primary hover:underline">Go back</button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboards')}
                        className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3 lowercase">
                            <span className="text-primary font-black opacity-40">/</span>
                            {dashboard.name}
                        </h1>
                        <div className="flex items-center gap-3 text-zinc-500 text-xs mt-1">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Updated {new Date(dashboard.updatedAt).toLocaleDateString()}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-zinc-800" />
                            <span className="flex items-center gap-1">
                                <BarChart3 className="h-3.5 w-3.5" />
                                {dashboard.charts?.length || 0} Visualizations
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold rounded-lg hover:border-zinc-700 transition-all">
                        <Settings className="h-4 w-4" />
                        Layout Editor
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/10">
                        <Plus className="h-4 w-4" />
                        Add Widget
                    </button>
                </div>
            </div>

            {/* Grid */}
            {(!dashboard.charts || dashboard.charts.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-32 glass-card rounded-3xl border-dashed border-zinc-800">
                    <div className="h-16 w-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-zinc-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-300">Dashboard is empty</h3>
                    <p className="text-zinc-500 mt-1 max-w-xs text-center">
                        Add existing charts or create new ones to build your data cockpit.
                    </p>
                    <div className="mt-8 flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary-hover transition-all">
                            Add Existing Chart
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-700 transition-all">
                            Explore Data
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-12 auto-rows-[280px] gap-6">
                    {dashboard.charts.map((chart, idx) => (
                        <div
                            key={chart.id}
                            className={`group glass-card rounded-2xl p-6 flex flex-col border border-zinc-900 shadow-xl overflow-hidden
                                ${idx % 3 === 0 ? 'col-span-12 lg:col-span-8' : 'col-span-12 lg:col-span-4'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-bold text-zinc-200 tracking-tight leading-none">{chart.name}</h3>
                                    <p className="text-[10px] text-zinc-600 font-black uppercase mt-1.5 tracking-tighter">{chart.type}</p>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800">
                                        <Maximize2 className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0">
                                {chart.type === 'table' ? (
                                    <div className="h-full overflow-hidden text-zinc-500 text-sm flex items-center justify-center bg-zinc-950/20 rounded-xl border border-zinc-900 border-dashed">
                                        [ Table View Placeholder ]
                                    </div>
                                ) : (
                                    <ReactECharts
                                        option={getEChartsOption(chart)}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

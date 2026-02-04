'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    Plus,
    Search,
    Trash2,
    ExternalLink,
    Filter,
    Table as TableIcon,
    PieChart,
    Activity,
    Database,
    TrendingUp,
    Loader2,
    Grid3x3,
    Edit,
    Eye,
    AreaChart,
    LineChart
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { Chart } from '@/types';

export default function ChartsPage() {
    const [charts, setCharts] = useState<Chart[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    useEffect(() => {
        loadCharts();
    }, []);

    const loadCharts = async () => {
        try {
            const data = await fetchApi('/charts');
            setCharts(data);
        } catch (error) {
            console.error('Failed to load charts:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteChart = async (id: string) => {
        if (!confirm('Are you sure you want to delete this chart?')) return;
        try {
            await fetchApi(`/charts/${id}`, { method: 'DELETE' });
            setCharts(charts.filter(c => c.id !== id));
        } catch (error) {
            alert('Failed to delete chart');
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'bar': return <BarChart3 className="h-5 w-5" strokeWidth={2} />;
            case 'line': return <LineChart className="h-5 w-5" strokeWidth={2} />;
            case 'area': return <AreaChart className="h-5 w-5" strokeWidth={2} />;
            case 'pie': return <PieChart className="h-5 w-5" strokeWidth={2} />;
            case 'table': return <TableIcon className="h-5 w-5" strokeWidth={2} />;
            default: return <BarChart3 className="h-5 w-5" strokeWidth={2} />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'bar': return 'from-blue-500 to-cyan-500';
            case 'line': return 'from-purple-500 to-pink-500';
            case 'area': return 'from-green-500 to-emerald-500';
            case 'pie': return 'from-orange-500 to-red-500';
            case 'table': return 'from-primary to-primary-dark';
            default: return 'from-primary to-primary-dark';
        }
    };

    const filteredCharts = charts.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || c.type.toLowerCase() === typeFilter;
        return matchesSearch && matchesType;
    });

    const stats = [
        {
            label: 'Total Charts',
            value: charts.length,
            icon: Grid3x3,
            color: 'from-primary to-primary-dark'
        },
        {
            label: 'Chart Types',
            value: new Set(charts.map(c => c.type)).size,
            icon: TrendingUp,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            label: 'Data Sources',
            value: new Set(charts.map(c => c.dataset?.id).filter(Boolean)).size,
            icon: Database,
            color: 'from-purple-500 to-pink-500'
        }
    ];

    return (
        <div className="space-y-8 animate-in pb-20">
            {/* Enhanced Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
                                <div className="relative h-12 w-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                                    <BarChart3 className="h-6 w-6 text-black" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                    Charts Gallery
                                </h1>
                                <p className="text-foreground-secondary text-sm font-medium mt-1">
                                    {charts.length} visualization{charts.length !== 1 ? 's' : ''} • Explore and manage your reports
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link 
                        href="/charts/new"
                        className="group relative self-start"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                        <div className="relative px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                            <Plus className="h-5 w-5" strokeWidth={2.5} />
                            New Chart
                        </div>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, i) => (
                        <div 
                            key={i} 
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                            <div className="relative glass-card p-5 rounded-2xl backdrop-blur-xl hover:border-primary/30 transition-all duration-500 flex items-center gap-4">
                                <div className={`relative h-12 w-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-medium text-foreground-muted mb-0.5">{stat.label}</div>
                                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters & Search */}
            <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-4 glass-card p-5 rounded-2xl backdrop-blur-xl border border-border/50">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Search charts by name..."
                            className="w-full pl-11 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm font-medium text-foreground placeholder:text-foreground-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative group/select">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-xl opacity-0 group-hover/select:opacity-100 transition-opacity blur-sm" />
                        <div className="relative flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2.5 min-w-[200px]">
                            <Filter className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={2} />
                            <select
                                className="flex-1 bg-transparent border-none text-sm font-semibold text-foreground focus:ring-0 outline-none cursor-pointer appearance-none pr-6"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="bar">Bar Chart</option>
                                <option value="line">Line Chart</option>
                                <option value="area">Area Chart</option>
                                <option value="pie">Pie Chart</option>
                                <option value="table">Table</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div 
                            key={i} 
                            className="h-64 rounded-2xl bg-surface-alt/30 animate-pulse border border-border/30"
                        />
                    ))}
                </div>
            ) : filteredCharts.length === 0 ? (
                <div className="relative group">
                    <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl blur-sm" />
                    <div className="relative flex flex-col items-center justify-center py-32 glass-card rounded-3xl border-dashed backdrop-blur-xl">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                            <div className="relative h-20 w-20 bg-gradient-to-br from-surface-alt to-surface rounded-3xl flex items-center justify-center border border-border/50 shadow-xl">
                                <BarChart3 className="h-10 w-10 text-foreground-muted" strokeWidth={2} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {searchQuery || typeFilter !== 'all' ? 'No charts match your filters' : 'No charts yet'}
                        </h3>
                        <p className="text-foreground-secondary max-w-md text-center font-medium leading-relaxed mb-8">
                            {searchQuery || typeFilter !== 'all' 
                                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                                : 'Start visualizing your data by creating your first chart.'
                            }
                        </p>
                        {!(searchQuery || typeFilter !== 'all') && (
                            <Link
                                href="/charts/new"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                                <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center gap-2">
                                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                                    Create Your First Chart
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCharts.map((chart, i) => (
                        <div 
                            key={chart.id} 
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.03}s` }}
                        >
                            <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                            
                            <div className="relative glass-card rounded-2xl backdrop-blur-xl hover:border-primary/30 transition-all duration-500 flex flex-col h-full overflow-hidden min-h-[240px]">
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className={`relative h-12 w-12 bg-gradient-to-br ${getTypeColor(chart.type)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <div className="text-white">
                                                    {getTypeIcon(chart.type)}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteChart(chart.id)}
                                            className="p-2 text-foreground-muted hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10 opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-4 w-4" strokeWidth={2} />
                                        </button>
                                    </div>

                                    {/* Chart Info */}
                                    <div className="flex-1">
                                        <Link href={`/explore?chartId=${chart.id}`} className="block">
                                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                                                {chart.name}
                                            </h3>
                                        </Link>
                                        
                                        <div className="flex items-center gap-2 text-foreground-muted text-xs font-medium">
                                            <Database className="h-3.5 w-3.5 text-primary flex-shrink-0" strokeWidth={2} />
                                            <span className="truncate">{chart.dataset?.name || 'Unknown Dataset'}</span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                                        <div className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                                {chart.type}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/explore?chartId=${chart.id}`}
                                            className="group/btn flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary hover:text-primary transition-colors"
                                        >
                                            <Edit className="h-3.5 w-3.5" strokeWidth={2} />
                                            Edit
                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 -ml-1 group-hover/btn:ml-0 transition-all" strokeWidth={2} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
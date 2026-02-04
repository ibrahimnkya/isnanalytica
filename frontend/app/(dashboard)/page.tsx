'use client';

import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Plus,
    Filter,
    Share2,
    Loader2,
    BarChart3,
    Database,
    Layers,
    Activity,
    ArrowUpRight,
    ShieldCheck,
    Zap,
    History,
    FileText,
    Upload,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    Server,
    Box,
    Sparkles
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { Dashboard, Chart } from '@/types';
import { DashboardCard } from '@/components/DashboardCard';
import Link from 'next/link';

interface OverviewStats {
    totalSources: number;
    totalDatasets: number;
    totalCharts: number;
    totalDashboards: number;
    platformHealth: {
        postgres: string;
        redis: string;
        hybridEngine: string;
    };
}

export default function DashboardPage() {
    const [dashboards, setDashboards] = useState<Dashboard[]>([]);
    const [stats, setStats] = useState<OverviewStats | null>(null);
    const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    const loadData = async () => {
        try {
            const [dashes, overviewStats] = await Promise.all([
                fetchApi('/dashboards'),
                fetchApi('/stats/overview')
            ]);

            setDashboards(dashes);
            setStats(overviewStats);

            if (dashes.length > 0) {
                const fullDash = await fetchApi(`/dashboards/${dashes[0].id}`);
                setSelectedDashboard(fullDash);
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const metrics = [
        { 
            label: 'Data Sources', 
            value: stats?.totalSources || 0, 
            icon: Database, 
            color: 'from-primary to-primary-dark',
            change: '+12%',
            trend: 'up'
        },
        { 
            label: 'Active Datasets', 
            value: stats?.totalDatasets || 0, 
            icon: Layers, 
            color: 'from-blue-500 to-cyan-500',
            change: '+8%',
            trend: 'up'
        },
        { 
            label: 'Visualizations', 
            value: stats?.totalCharts || 0, 
            icon: BarChart3, 
            color: 'from-purple-500 to-pink-500',
            change: '+24%',
            trend: 'up'
        },
        { 
            label: 'Dashboards', 
            value: stats?.totalDashboards || 0, 
            icon: LayoutDashboard, 
            color: 'from-amber-500 to-orange-500',
            change: '+5%',
            trend: 'up'
        }
    ];

    const platformServices = [
        { 
            name: 'PostgreSQL Database', 
            status: 'Operational', 
            type: 'Core Engine',
            icon: Database,
            latency: '12ms',
            uptime: '99.99%'
        },
        { 
            name: 'SQLite Adapter', 
            status: 'Active', 
            type: 'Ephemeral Layer',
            icon: Box,
            latency: '8ms',
            uptime: '100%'
        },
        { 
            name: 'Superset API', 
            status: 'Healthy', 
            type: 'Analytics Core',
            icon: Server,
            latency: '45ms',
            uptime: '99.98%'
        }
    ];

    const recentActivity = [
        { 
            action: 'Chart Created', 
            name: 'Q4 Revenue Analysis', 
            time: '12m ago',
            user: 'Sarah Chen',
            icon: BarChart3
        },
        { 
            action: 'Source Connected', 
            name: 'Customer_Data.xlsx', 
            time: '2h ago',
            user: 'Michael Ross',
            icon: Upload
        },
        { 
            action: 'Dashboard Shared', 
            name: 'Sales Overview 2026', 
            time: '5h ago',
            user: 'Emma Wilson',
            icon: Share2
        },
        { 
            action: 'Query Optimized', 
            name: 'Product Performance', 
            time: '8h ago',
            user: 'System',
            icon: Zap
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
                                    <Activity className="h-6 w-6 text-black animate-pulse" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                                    <span className="h-2 w-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                                    System Online
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mt-1">
                                    Command Center
                                </h1>
                            </div>
                        </div>
                        <p className="text-foreground-secondary text-base font-medium max-w-2xl">
                            Monitor your data infrastructure, track analytics performance, and manage your business intelligence ecosystem.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface/50 border border-border/50 rounded-xl backdrop-blur-sm">
                            <Clock className="h-4 w-4 text-foreground-muted" />
                            <span className="text-sm font-medium text-foreground-secondary">
                                {currentTime.toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: true 
                                })}
                            </span>
                        </div>
                        <Link 
                            href="/data-sources" 
                            className="group px-5 py-2.5 bg-surface/50 border border-border/50 rounded-xl text-foreground-secondary text-sm font-semibold hover:border-primary/30 hover:bg-surface/80 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                        >
                            <Upload className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                            Quick Import
                        </Link>
                        <Link 
                            href="/charts/new" 
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="relative px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black text-sm font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                                <Plus className="h-5 w-5" strokeWidth={2.5} />
                                Create Chart
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Enhanced Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, i) => (
                    <div 
                        key={i} 
                        className="group relative animate-in"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        {/* Hover glow */}
                        <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                        
                        <div className="relative glass-card p-6 rounded-3xl hover:border-primary/30 transition-all duration-500 cursor-pointer h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                                    <div className={`relative h-12 w-12 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <metric.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
                                    <TrendingUp className="h-3 w-3 text-primary" strokeWidth={2.5} />
                                    <span className="text-xs font-bold text-primary">{metric.change}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-foreground tracking-tight">
                                    {metric.value.toLocaleString()}
                                </div>
                                <div className="text-sm font-medium text-foreground-muted">
                                    {metric.label}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Workspace Area */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20">
                                <Layers className="h-5 w-5 text-primary" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Active Workspace</h3>
                                <p className="text-xs text-foreground-muted font-medium">Live visualization preview</p>
                            </div>
                        </div>
                        <Link 
                            href="/dashboards" 
                            className="group flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
                        >
                            View All
                            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="h-[500px] glass-card rounded-3xl flex flex-col items-center justify-center gap-4 backdrop-blur-xl">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                <Loader2 className="relative h-10 w-10 animate-spin text-primary" strokeWidth={2.5} />
                            </div>
                            <p className="text-sm font-medium text-foreground-muted">Loading workspace data...</p>
                        </div>
                    ) : selectedDashboard && selectedDashboard.charts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedDashboard.charts.slice(0, 4).map((chart, i) => (
                                <div 
                                    key={chart.id} 
                                    className="h-[360px] animate-in"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <DashboardCard chart={chart} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="relative group">
                            <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl blur-sm" />
                            <div className="relative h-[500px] glass-card rounded-3xl border-dashed flex flex-col items-center justify-center p-12 text-center backdrop-blur-xl">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                                    <div className="relative h-20 w-20 bg-gradient-to-br from-surface-alt to-surface rounded-3xl flex items-center justify-center border border-border/50 shadow-xl">
                                        <BarChart3 className="h-10 w-10 text-foreground-muted" strokeWidth={2} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">No Active Visualizations</h3>
                                <p className="text-foreground-secondary max-w-md font-medium leading-relaxed mb-8">
                                    Get started by connecting a data source or creating your first visualization to populate your analytics workspace.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <Link 
                                        href="/data-sources" 
                                        className="px-6 py-3 bg-surface/50 border border-border/50 text-foreground font-semibold rounded-xl hover:border-primary/30 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                                    >
                                        <Database className="h-4 w-4 text-primary" />
                                        Connect Data
                                    </Link>
                                    <Link 
                                        href="/charts/new" 
                                        className="group relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                                        <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Create Chart
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Platform Health Monitor */}
                    <div className="glass-card p-6 rounded-3xl backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                <h3 className="text-sm font-bold text-foreground">System Health</h3>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                                <span className="text-xs font-bold text-primary">All Systems Go</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {platformServices.map((service, i) => (
                                <div 
                                    key={i} 
                                    className="group p-4 rounded-2xl bg-surface-alt/30 border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                            <service.icon className="h-5 w-5 text-primary" strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-bold text-foreground">{service.name}</span>
                                                <span className="h-2 w-2 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse" />
                                            </div>
                                            <div className="text-xs text-foreground-muted font-medium mb-2">{service.type}</div>
                                            <div className="flex items-center gap-4 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3 text-foreground-muted" />
                                                    <span className="text-foreground-secondary font-semibold">{service.latency}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Activity className="h-3 w-3 text-foreground-muted" />
                                                    <span className="text-foreground-secondary font-semibold">{service.uptime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="glass-card p-6 rounded-3xl backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <History className="h-5 w-5 text-primary" strokeWidth={2.5} />
                            <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
                        </div>
                        <div className="space-y-3">
                            {recentActivity.map((activity, i) => (
                                <div 
                                    key={i} 
                                    className="group p-3 rounded-xl bg-surface-alt/20 hover:bg-surface-alt/40 border border-transparent hover:border-border/50 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="h-9 w-9 bg-gradient-to-br from-surface-alt to-surface rounded-lg flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors flex-shrink-0">
                                            <activity.icon className="h-4 w-4 text-foreground-muted group-hover:text-primary transition-colors" strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-foreground truncate mb-1">
                                                {activity.name}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-foreground-muted">
                                                <span className="font-medium">{activity.action}</span>
                                                <span>•</span>
                                                <span>{activity.time}</span>
                                            </div>
                                            <div className="text-xs text-foreground-muted mt-1">
                                                by <span className="font-semibold">{activity.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link 
                            href="/activity" 
                            className="w-full mt-4 py-2.5 border border-border/50 rounded-xl text-sm font-semibold text-foreground-secondary hover:text-foreground hover:border-border transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            View Full History
                            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Security Status Card */}
                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                        <div className="relative glass-card p-6 rounded-3xl border-primary/20 bg-primary/5 backdrop-blur-xl overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                <ShieldCheck className="h-full w-full text-primary rotate-12" strokeWidth={1} />
                            </div>
                            
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                                        <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-primary">Security Protocol</h3>
                                        <p className="text-xs text-primary/80 font-medium">Enterprise Grade</p>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-foreground-secondary leading-relaxed">
                                    Zero-trust architecture with read-only enforcement on all connectors. SOC 2 Type II compliant with continuous monitoring.
                                </p>
                                <div className="mt-4 pt-4 border-t border-primary/20 flex items-center justify-between text-xs">
                                    <span className="text-primary/80 font-semibold">Last Security Audit</span>
                                    <span className="text-primary font-bold">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
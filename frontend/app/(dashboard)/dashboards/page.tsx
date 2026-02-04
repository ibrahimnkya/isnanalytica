'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Plus,
    MoreVertical,
    Clock,
    BarChart2,
    Search,
    Trash2,
    ExternalLink,
    Edit,
    Grid3x3,
    List,
    Filter,
    SortAsc,
    Star,
    Users,
    Eye,
    TrendingUp,
    Sparkles,
    Calendar
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { Dashboard } from '@/types';

type ViewMode = 'grid' | 'list';
type SortBy = 'recent' | 'name' | 'charts';

export default function DashboardsPage() {
    const [dashboards, setDashboards] = useState<Dashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortBy>('recent');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        loadDashboards();
    }, []);

    const loadDashboards = async () => {
        try {
            const data = await fetchApi('/dashboards');
            setDashboards(data);
        } catch (error) {
            console.error('Failed to load dashboards:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteDashboard = async (id: string) => {
        if (!confirm('Are you sure you want to delete this dashboard?')) return;
        try {
            await fetchApi(`/dashboards/${id}`, { method: 'DELETE' });
            setDashboards(dashboards.filter(d => d.id !== id));
        } catch (error) {
            alert('Failed to delete dashboard');
        }
    };

    const filteredDashboards = dashboards
        .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'charts':
                    return (b.charts?.length || 0) - (a.charts?.length || 0);
                case 'recent':
                default:
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }
        });

    const getRelativeTime = (date: string) => {
        const now = new Date();
        const then = new Date(date);
        const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return then.toLocaleDateString();
    };

    return (
        <div className="space-y-8 animate-in pb-20">
            {/* Enhanced Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#00FF41]/20 rounded-xl blur-lg" />
                                <div className="relative h-12 w-12 bg-[#00FF41] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF41]/30">
                                    <LayoutDashboard className="h-6 w-6 text-black" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                    Dashboards
                                </h1>
                                <p className="text-foreground-secondary text-sm font-medium mt-1">
                                    {dashboards.length} dashboard{dashboards.length !== 1 ? 's' : ''} • {dashboards.reduce((acc, d) => acc + (d.charts?.length || 0), 0)} total visualizations
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link 
                        href="/dashboards/new" 
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-[#00FF41] rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                        <div className="relative px-6 py-3 bg-[#00FF41] text-black font-bold rounded-xl shadow-lg shadow-[#00FF41]/20 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                            <Plus className="h-5 w-5" strokeWidth={2.5} />
                            Create Dashboard
                        </div>
                    </Link>
                </div>

                {/* Enhanced Filters Bar */}
                <div className="glass-card p-5 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Search dashboards..."
                            className="w-full pl-12 pr-4 py-3 bg-surface/50 border border-border/50 rounded-xl text-sm font-medium text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSortBy('recent')}
                            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                sortBy === 'recent'
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'bg-surface/50 text-foreground-secondary border border-border/30 hover:border-border/50'
                            }`}
                        >
                            Recent
                        </button>
                        <button
                            onClick={() => setSortBy('name')}
                            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                sortBy === 'name'
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'bg-surface/50 text-foreground-secondary border border-border/30 hover:border-border/50'
                            }`}
                        >
                            Name
                        </button>
                        <button
                            onClick={() => setSortBy('charts')}
                            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                sortBy === 'charts'
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'bg-surface/50 text-foreground-secondary border border-border/30 hover:border-border/50'
                            }`}
                        >
                            Charts
                        </button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-surface-alt/50 rounded-lg border border-border/30">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all duration-300 ${
                                viewMode === 'grid'
                                    ? 'bg-primary text-black shadow-lg shadow-primary/20'
                                    : 'text-foreground-muted hover:text-foreground'
                            }`}
                        >
                            <Grid3x3 className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all duration-300 ${
                                viewMode === 'list'
                                    ? 'bg-primary text-black shadow-lg shadow-primary/20'
                                    : 'text-foreground-muted hover:text-foreground'
                            }`}
                        >
                            <List className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div 
                            key={i} 
                            className={`${viewMode === 'grid' ? 'h-64' : 'h-24'} rounded-2xl bg-surface-alt/30 animate-pulse border border-border/30`}
                        />
                    ))}
                </div>
            ) : filteredDashboards.length === 0 ? (
                <div className="relative group">
                    <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl blur-sm" />
                    <div className="relative flex flex-col items-center justify-center py-32 glass-card rounded-3xl border-dashed backdrop-blur-xl">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                            <div className="relative h-20 w-20 bg-gradient-to-br from-surface-alt to-surface rounded-3xl flex items-center justify-center border border-border/50 shadow-xl">
                                <LayoutDashboard className="h-10 w-10 text-foreground-muted" strokeWidth={2} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {searchQuery ? 'No matching dashboards' : 'No dashboards yet'}
                        </h3>
                        <p className="text-foreground-secondary max-w-md text-center font-medium leading-relaxed mb-8">
                            {searchQuery 
                                ? "Try adjusting your search or create a new dashboard to get started." 
                                : "Create your first dashboard to start organizing and visualizing your data insights."}
                        </p>
                        <Link 
                            href="/dashboards/new" 
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-[#00FF41] rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                            <div className="relative px-6 py-3 bg-[#00FF41] text-black font-bold rounded-xl flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Create Your First Dashboard
                            </div>
                        </Link>
                    </div>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDashboards.map((dashboard, i) => (
                        <div 
                            key={dashboard.id} 
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {/* Hover glow */}
                            <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                            
                            <div className="relative glass-card rounded-2xl p-6 overflow-hidden backdrop-blur-xl hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative p-3 bg-gradient-to-br from-surface-alt to-surface rounded-xl border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                                            <LayoutDashboard className="h-6 w-6 text-primary" strokeWidth={2} />
                                        </div>
                                    </div>
                                    
                                    <div className="relative">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === dashboard.id ? null : dashboard.id)}
                                            className="p-2 text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface-alt/50"
                                        >
                                            <MoreVertical className="h-4 w-4" strokeWidth={2} />
                                        </button>
                                        
                                        {activeDropdown === dashboard.id && (
                                            <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl border border-border/50 shadow-2xl backdrop-blur-xl z-10 overflow-hidden">
                                                <Link 
                                                    href={`/dashboards/${dashboard.id}/edit`}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-surface-alt/50 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4 text-primary" strokeWidth={2} />
                                                    Edit Dashboard
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        deleteDashboard(dashboard.id);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" strokeWidth={2} />
                                                    Delete Dashboard
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <Link href={`/dashboards/${dashboard.id}`} className="block flex-1">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-1">
                                        {dashboard.name}
                                    </h3>
                                    <p className="text-foreground-secondary text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                        {dashboard.description || 'No description provided.'}
                                    </p>
                                </Link>

                                {/* Footer */}
                                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-foreground-muted">
                                        <div className="flex items-center gap-1.5">
                                            <BarChart2 className="h-4 w-4 text-primary" strokeWidth={2} />
                                            <span>{dashboard.charts?.length || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" strokeWidth={2} />
                                            <span>{getRelativeTime(dashboard.updatedAt)}</span>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        href={`/dashboards/${dashboard.id}`}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-xs font-bold text-primary"
                                    >
                                        Open
                                        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredDashboards.map((dashboard, i) => (
                        <div 
                            key={dashboard.id}
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.03}s` }}
                        >
                            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                            
                            <div className="relative glass-card rounded-2xl p-5 backdrop-blur-xl hover:border-primary/30 transition-all duration-500">
                                <div className="flex items-center gap-6">
                                    {/* Icon */}
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative h-14 w-14 bg-gradient-to-br from-surface-alt to-surface rounded-xl flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                                            <LayoutDashboard className="h-6 w-6 text-primary" strokeWidth={2} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <Link href={`/dashboards/${dashboard.id}`} className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate mb-1">
                                            {dashboard.name}
                                        </h3>
                                        <p className="text-sm text-foreground-secondary truncate">
                                            {dashboard.description || 'No description provided.'}
                                        </p>
                                    </Link>

                                    {/* Stats */}
                                    <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-foreground-muted">
                                        <div className="flex items-center gap-2">
                                            <BarChart2 className="h-4 w-4 text-primary" strokeWidth={2} />
                                            <span>{dashboard.charts?.length || 0} charts</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" strokeWidth={2} />
                                            <span>{getRelativeTime(dashboard.updatedAt)}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/dashboards/${dashboard.id}`}
                                            className="p-2 text-foreground-muted hover:text-primary transition-colors rounded-lg hover:bg-surface-alt/50"
                                        >
                                            <ExternalLink className="h-4 w-4" strokeWidth={2} />
                                        </Link>
                                        <div className="relative">
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === dashboard.id ? null : dashboard.id)}
                                                className="p-2 text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface-alt/50"
                                            >
                                                <MoreVertical className="h-4 w-4" strokeWidth={2} />
                                            </button>
                                            
                                            {activeDropdown === dashboard.id && (
                                                <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl border border-border/50 shadow-2xl backdrop-blur-xl z-10 overflow-hidden">
                                                    <Link 
                                                        href={`/dashboards/${dashboard.id}/edit`}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-surface-alt/50 transition-colors"
                                                    >
                                                        <Edit className="h-4 w-4 text-primary" strokeWidth={2} />
                                                        Edit Dashboard
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            deleteDashboard(dashboard.id);
                                                            setActiveDropdown(null);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" strokeWidth={2} />
                                                        Delete Dashboard
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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

'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Table,
    Layers,
    ChevronRight,
    Loader2,
    Database,
    MoreVertical,
    PlusCircle,
    Activity,
    Settings2,
    Search,
    Trash2,
    TrendingUp,
    BarChart3,
    Filter,
    Grid3x3,
    List,
    ExternalLink,
    Sparkles,
    Box,
    Zap,
    BookOpen
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { fetchApi } from '@/lib/api';
import { Dataset, DataSource } from '@/types';
import Link from 'next/link';

type ViewMode = 'grid' | 'list';

export default function DatasetsPage() {
    const { success, error: toastError } = useToast();
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [dataSources, setDataSources] = useState<DataSource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    // Form state
    const [name, setName] = useState('');
    const [selectedDataSource, setSelectedDataSource] = useState('');
    const [tableName, setTableName] = useState('');
    const [schema, setSchema] = useState('public');

    const fetchData = async () => {
        try {
            const [dsData, dsetsData] = await Promise.all([
                fetchApi('/data-sources'),
                fetchApi('/datasets'),
            ]);
            setDataSources(dsData);
            setDatasets(dsetsData);
            if (dsData.length > 0 && !selectedDataSource) setSelectedDataSource(dsData[0].id);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDataset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDataSource) return;

        setIsSubmitting(true);
        try {
            await fetchApi('/datasets', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    tableName,
                    schema,
                    dataSource: { id: selectedDataSource },
                }),
            });
            setIsAddModalOpen(false);
            success('Semantic model registered successfully');
            fetchData();
            // Reset
            setName('');
            setTableName('');
            setSchema('public');
        } catch (error: any) {
            toastError('Failed to add dataset: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredDatasets = datasets.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tableName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalMetrics = datasets.reduce((acc, d) => acc + d.metrics.length, 0);
    const totalDimensions = datasets.reduce((acc, d) => acc + d.dimensions.length, 0);

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
                                    <Layers className="h-6 w-6 text-black" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                    Semantic Models
                                </h1>
                                <p className="text-foreground-secondary text-sm font-medium mt-1">
                                    {datasets.length} model{datasets.length !== 1 ? 's' : ''} • {totalMetrics} metrics • {totalDimensions} dimensions
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                        <div className="relative px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                            <Plus className="h-5 w-5" strokeWidth={2.5} />
                            Register Model
                        </div>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: Box,
                            label: 'Active Models',
                            value: datasets.length,
                            color: 'from-primary to-primary-dark'
                        },
                        {
                            icon: TrendingUp,
                            label: 'Total Metrics',
                            value: totalMetrics,
                            color: 'from-blue-500 to-cyan-500'
                        },
                        {
                            icon: BarChart3,
                            label: 'Dimensions',
                            value: totalDimensions,
                            color: 'from-purple-500 to-pink-500'
                        }
                    ].map((stat, i) => (
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

                {/* Search & Filters */}
                <div className="glass-card p-5 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Search semantic models..."
                            className="w-full pl-12 pr-4 py-3 bg-surface/50 border border-border/50 rounded-xl text-sm font-medium text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-1 p-1 bg-surface-alt/50 rounded-lg border border-border/30">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'list'
                                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                                : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            <List className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'grid'
                                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                                : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            <Grid3x3 className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Register Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Register Semantic Model"
                className="max-w-3xl"
            >
                <form onSubmit={handleAddDataset} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Model Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Marketing Performance Model"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Data Source</label>
                            <select
                                required
                                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                value={selectedDataSource}
                                onChange={(e) => setSelectedDataSource(e.target.value)}
                            >
                                {dataSources.map((ds) => (
                                    <option key={ds.id} value={ds.id}>
                                        {ds.name} ({ds.type})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Schema</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="public"
                                value={schema}
                                onChange={(e) => setSchema(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Table Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="marketing_leads_v2"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0" strokeWidth={2} />
                        <p className="text-sm text-foreground-secondary font-medium">
                            After registration, you can define metrics and dimensions to create your semantic layer.
                        </p>
                    </div>

                    <div className="flex justify-end items-center gap-3 pt-4 border-t border-border/30">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-6 py-2.5 text-sm font-semibold text-foreground-secondary hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="relative px-8 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center gap-2 disabled:opacity-50">
                                {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                                ) : (
                                    <Zap className="h-4 w-4" strokeWidth={2.5} />
                                )}
                                {isSubmitting ? 'Initializing...' : 'Initialize Model'}
                            </div>
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Content */}
            {isLoading ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div
                            key={i}
                            className={`${viewMode === 'grid' ? 'h-64' : 'h-32'} rounded-2xl bg-surface-alt/30 animate-pulse border border-border/30`}
                        />
                    ))}
                </div>
            ) : filteredDatasets.length === 0 ? (
                <div className="relative group">
                    <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl blur-sm" />
                    <div className="relative flex flex-col items-center justify-center py-32 glass-card rounded-3xl border-dashed backdrop-blur-xl">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                            <div className="relative h-20 w-20 bg-gradient-to-br from-surface-alt to-surface rounded-3xl flex items-center justify-center border border-border/50 shadow-xl">
                                <Layers className="h-10 w-10 text-foreground-muted" strokeWidth={2} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {searchQuery ? 'No matching models' : 'No semantic models yet'}
                        </h3>
                        <p className="text-foreground-secondary max-w-md text-center font-medium leading-relaxed mb-8">
                            {searchQuery
                                ? "Try adjusting your search or register a new model."
                                : "Register your first semantic model to define metrics and dimensions for analysis."}
                        </p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Register Your First Model
                            </div>
                        </button>
                    </div>
                </div>
            ) : viewMode === 'list' ? (
                <div className="space-y-4">
                    {filteredDatasets.map((dset, i) => (
                        <div
                            key={dset.id}
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.03}s` }}
                        >
                            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />

                            <div className="relative glass-card rounded-2xl backdrop-blur-xl hover:border-primary/30 transition-all duration-500 overflow-hidden">
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex flex-col lg:flex-row">
                                    {/* Main Content */}
                                    <div className="flex-1 p-6 flex items-center gap-5">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative h-14 w-14 bg-gradient-to-br from-surface-alt to-surface rounded-xl flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                                                <Table className="h-7 w-7 text-primary" strokeWidth={2} />
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 truncate">
                                                {dset.name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary bg-surface/50 px-3 py-1 rounded-lg border border-border/50">
                                                    <Database className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                                                    {dset.dataSource.name}
                                                </span>
                                                <span className="text-xs text-foreground-muted font-medium">
                                                    {dset.schema}.{dset.tableName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats & Actions */}
                                    <div className="lg:w-96 flex items-center justify-between gap-6 p-6 bg-gradient-to-b from-transparent to-surface-alt/30 border-t lg:border-t-0 lg:border-l border-border/30">
                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {dset.metrics.length}
                                                </div>
                                                <div className="text-xs font-medium text-foreground-muted mt-1">Metrics</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {dset.dimensions.length}
                                                </div>
                                                <div className="text-xs font-medium text-foreground-muted mt-1">Dimensions</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/datasets/${dset.id}/templates`}
                                                className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary/20 transition-all flex items-center gap-2 text-xs font-bold"
                                            >
                                                <BookOpen className="h-4 w-4" strokeWidth={2.5} />
                                                KPI LIBRARY
                                            </Link>
                                            <button className="p-2.5 bg-surface/50 border border-border/50 rounded-xl text-foreground-muted hover:text-foreground hover:border-border transition-all">
                                                <Settings2 className="h-5 w-5" strokeWidth={2} />
                                            </button>
                                            <Link
                                                href={`/datasets/${dset.id}`}
                                                className="group/btn relative"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-md opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300" />
                                                <div className="relative px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl text-xs flex items-center gap-2 group-hover/btn:scale-105 transition-transform duration-300">
                                                    EXPLORE
                                                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer with Tags */}
                                {(dset.metrics.length > 0 || dset.dimensions.length > 0) && (
                                    <div className="px-6 py-4 bg-surface-alt/20 border-t border-border/30 flex items-center gap-4">
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Activity className="h-4 w-4 text-foreground-muted" strokeWidth={2} />
                                            <span className="text-xs font-semibold text-foreground-muted">Schema:</span>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto">
                                            {dset.metrics.slice(0, 3).map((m, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-medium text-foreground-secondary whitespace-nowrap bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg"
                                                >
                                                    {m.name}
                                                </span>
                                            ))}
                                            {dset.dimensions.slice(0, 3).map((d, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-medium text-foreground-secondary whitespace-nowrap bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg"
                                                >
                                                    {d.name}
                                                </span>
                                            ))}
                                            {(dset.metrics.length + dset.dimensions.length > 6) && (
                                                <span className="text-xs font-medium text-foreground-muted whitespace-nowrap px-3 py-1">
                                                    +{dset.metrics.length + dset.dimensions.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDatasets.map((dset, i) => (
                        <div
                            key={dset.id}
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />

                            <div className="relative glass-card rounded-2xl p-6 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 flex flex-col h-full">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative h-14 w-14 bg-gradient-to-br from-surface-alt to-surface rounded-xl flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                                            <Table className="h-7 w-7 text-primary" strokeWidth={2} />
                                        </div>
                                    </div>
                                    <button className="p-2 text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface-alt/50">
                                        <MoreVertical className="h-4 w-4" strokeWidth={2} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                    {dset.name}
                                </h3>

                                <div className="space-y-2 mb-6">
                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary bg-surface/50 px-3 py-1 rounded-lg border border-border/50">
                                        <Database className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                                        {dset.dataSource.name}
                                    </div>
                                    <div className="text-xs text-foreground-muted font-medium truncate">
                                        {dset.schema}.{dset.tableName}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                                        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {dset.metrics.length}
                                        </div>
                                        <div className="text-xs font-medium text-foreground-muted mt-1">Metrics</div>
                                    </div>
                                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {dset.dimensions.length}
                                        </div>
                                        <div className="text-xs font-medium text-foreground-muted mt-1">Dimensions</div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-border/30 flex items-center gap-2">
                                    <Link
                                        href={`/datasets/${dset.id}/templates`}
                                        className="flex-1 p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary/20 transition-all text-xs font-bold flex items-center justify-center gap-2"
                                    >
                                        <BookOpen className="h-3 w-3" />
                                        KPIs
                                    </Link>
                                    <button className="flex-1 p-2.5 bg-surface/50 border border-border/50 rounded-xl text-foreground-muted hover:text-foreground hover:border-border transition-all text-xs font-semibold">
                                        Config
                                    </button>
                                    <Link
                                        href={`/datasets/${dset.id}`}
                                        className="flex-1 group/btn relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-md opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300" />
                                        <div className="relative p-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl text-xs text-center">
                                            Explore
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
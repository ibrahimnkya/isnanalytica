'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Database,
    Trash2,
    Loader2,
    Upload,
    FileText,
    ChevronRight,
    Server,
    Shield,
    Zap,
    Table,
    Check,
    AlertCircle,
    Settings,
    Link as LinkIcon,
    Cloud,
    HardDrive,
    Activity,
    Lock,
    Edit
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { DataSource, DataSourceType } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { ConfirmModal } from '@/components/ConfirmModal';

export default function DataSourcesPage() {
    const { success, error: toastError } = useToast();
    const [dataSources, setDataSources] = useState<DataSource[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    // Form state (Connection)
    const [editingSource, setEditingSource] = useState<DataSource | null>(null);
    const [name, setName] = useState('');
    const [type, setType] = useState<DataSourceType>(DataSourceType.POSTGRES);
    const [useConnectionString, setUseConnectionString] = useState(false);
    const [connectionString, setConnectionString] = useState('');
    const [host, setHost] = useState('localhost');
    const [port, setPort] = useState(5432);
    const [user, setUser] = useState('admin');
    const [password, setPassword] = useState('password');
    const [database, setDatabase] = useState('postgres');

    // Form state (Upload)
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadName, setUploadName] = useState('');
    const [uploadTableName, setUploadTableName] = useState('data');
    const [isDragging, setIsDragging] = useState(false);
    const [sourceToDelete, setSourceToDelete] = useState<string | null>(null);

    const fetchDataSources = async () => {
        try {
            const data = await fetchApi('/data-sources');
            setDataSources(data);
        } catch (error) {
            console.error('Failed to fetch data sources:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataSources();
    }, []);

    const handleTestConnection = async () => {
        setIsTesting(true);
        try {
            const config = useConnectionString ? { connectionString } : { host, port, user, password, database };
            const res = await fetchApi('/data-sources/test', {
                method: 'POST',
                body: JSON.stringify({ type, connectionConfig: config }),
            });
            if (res.success) {
                success('Connection test successful');
            } else {
                toastError('Connection test failed');
            }
        } catch (err: any) {
            toastError('Connection test error: ' + err.message);
        } finally {
            setIsTesting(false);
        }
    };

    const handleAddDataSource = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const config = useConnectionString ? { connectionString } : { host, port, user, password, database };
            await fetchApi('/data-sources', {
                method: 'POST',
                body: JSON.stringify({ name, type, connectionConfig: config }),
            });
            setIsAddModalOpen(false);
            success('Database connection established successfully');
            fetchDataSources();
            resetConnectionForm();
        } catch (err: any) {
            toastError('Failed to add data source: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditDataSource = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSource) return;
        setIsSubmitting(true);
        try {
            const config = useConnectionString ? { connectionString } : { host, port, user, password, database };
            await fetchApi(`/data-sources/${editingSource.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, type, connectionConfig: config }),
            });
            setIsEditModalOpen(false);
            success('Data source updated successfully');
            fetchDataSources();
            resetConnectionForm();
        } catch (err: any) {
            toastError('Failed to update data source: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetConnectionForm = () => {
        setName('');
        setHost('localhost');
        setUser('admin');
        setPassword('password');
        setDatabase('postgres');
        setUseConnectionString(false);
        setConnectionString('');
        setEditingSource(null);
    };

    const openEditModal = (ds: DataSource) => {
        setEditingSource(ds);
        setName(ds.name);
        setType(ds.type);
        if (ds.connectionConfig.connectionString) {
            setUseConnectionString(true);
            setConnectionString(ds.connectionConfig.connectionString);
        } else {
            setUseConnectionString(false);
            setHost(ds.connectionConfig.host || '');
            setPort(ds.connectionConfig.port || 5432);
            setUser(ds.connectionConfig.user || '');
            setDatabase(ds.connectionConfig.database || '');
            setPassword(''); // Don't pre-fill password for security
        }
        setIsEditModalOpen(true);
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadFile || !uploadName) return;

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('name', uploadName);
        formData.append('tableName', uploadTableName);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003'}/data-sources/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Upload failed');

            success('File uploaded and ingested successfully');
            setIsUploadModalOpen(false);
            fetchDataSources();
            setUploadFile(null);
            setUploadName('');
            setUploadTableName('data');
        } catch (err: any) {
            toastError('Failed to upload file: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!sourceToDelete) return;
        setIsSubmitting(true);
        try {
            await fetchApi(`/data-sources/${sourceToDelete}`, { method: 'DELETE' });
            success('Data source deleted');
            fetchDataSources();
            setIsDeleteModalOpen(false);
        } catch (err: any) {
            toastError('Failed to delete data source');
        } finally {
            setIsSubmitting(false);
            setSourceToDelete(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
            setUploadFile(file);
            if (!uploadName) setUploadName(file.name.split('.')[0]);
        }
    };

    const infrastructureStats = [
        {
            icon: Shield,
            label: 'Security Layer',
            value: 'Read-Only',
            description: 'Zero-write enforcement',
            color: 'from-primary to-primary-dark'
        },
        {
            icon: Zap,
            label: 'Processing Engine',
            value: 'Hybrid V1',
            description: 'Multi-source adapter',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Table,
            label: 'Data Retention',
            value: '72 Hours',
            description: 'Ephemeral storage',
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
                                    <Server className="h-6 w-6 text-black animate-pulse" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                    Data Infrastructure
                                </h1>
                                <p className="text-foreground-secondary text-sm font-medium mt-1">
                                    {dataSources.length} active connection{dataSources.length !== 1 ? 's' : ''} • Enterprise-grade security
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="group px-5 py-2.5 bg-surface/50 border border-border/50 text-foreground-secondary font-semibold rounded-xl hover:border-primary/30 hover:bg-surface/80 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                        >
                            <Upload className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                            Quick Import
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="relative px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                                <Plus className="h-5 w-5" strokeWidth={2.5} />
                                New Connection
                            </div>
                        </button>
                    </div>
                </div>

                {/* Infrastructure Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {infrastructureStats.map((stat, i) => (
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
                                    <div className="text-base font-bold text-foreground">{stat.value}</div>
                                    <div className="text-xs text-foreground-secondary font-medium">{stat.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* NEW/EDIT CONNECTION MODAL */}
            <Modal
                isOpen={isAddModalOpen || isEditModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    resetConnectionForm();
                }}
                title={isEditModalOpen ? "Edit Connection" : "Register Database Connection"}
                className="max-w-2xl"
            >
                <form onSubmit={isEditModalOpen ? handleEditDataSource : handleAddDataSource} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Connection Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Production Analytics Database"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Database Type</label>
                            <select
                                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                value={type}
                                onChange={(e) => setType(e.target.value as DataSourceType)}
                            >
                                <option value={DataSourceType.POSTGRES}>PostgreSQL</option>
                                <option value={DataSourceType.MYSQL}>MySQL</option>
                                <option value={DataSourceType.MSSQL}>Microsoft SQL Server</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            id="useConnectionString"
                            className="rounded border-border bg-surface text-primary focus:ring-primary h-4 w-4"
                            checked={useConnectionString}
                            onChange={(e) => setUseConnectionString(e.target.checked)}
                        />
                        <label htmlFor="useConnectionString" className="text-sm font-medium text-foreground cursor-pointer">
                            Use Connection String (URI)
                        </label>
                    </div>

                    {useConnectionString ? (
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Connection URI</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="postgresql://user:password@host:port/database"
                                value={connectionString}
                                onChange={(e) => setConnectionString(e.target.value)}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Host</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="localhost"
                                        value={host}
                                        onChange={(e) => setHost(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Port</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        value={port}
                                        onChange={(e) => setPort(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                                    <input
                                        type="password"
                                        required={!isEditModalOpen}
                                        className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder={isEditModalOpen ? "Leave blank to keep current" : "Password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">Database Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={database}
                                    onChange={(e) => setDatabase(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <Lock className="h-5 w-5 text-primary flex-shrink-0" strokeWidth={2} />
                        <p className="text-sm text-foreground-secondary font-medium">
                            All connections use read-only access by default. Your credentials are encrypted at rest.
                        </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border/30">
                        <button
                            type="button"
                            onClick={handleTestConnection}
                            disabled={isTesting}
                            className="px-6 py-2.5 bg-surface text-foreground-secondary font-semibold rounded-xl border border-border/50 hover:bg-surface-hover hover:text-foreground transition-all flex items-center gap-2"
                        >
                            {isTesting ? <Loader2 className="h-4 w-4 animate-spin text-primary" strokeWidth={2.5} /> : <Activity className="h-4 w-4 text-primary" strokeWidth={2.5} />}
                            {isTesting ? 'Testing...' : 'Test Connection'}
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setIsEditModalOpen(false);
                                    resetConnectionForm();
                                }}
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
                                        <Check className="h-4 w-4" strokeWidth={2.5} />
                                    )}
                                    {isSubmitting ? (isEditModalOpen ? 'Updating...' : 'Connecting...') : (isEditModalOpen ? 'Update Connection' : 'Establish Connection')}
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* UPLOAD FILE MODAL */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                title="Upload Dataset"
            >
                <form onSubmit={handleFileUpload} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Dataset Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Q4 Sales Analysis"
                            value={uploadName}
                            onChange={(e) => setUploadName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Target Table Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="data"
                            value={uploadTableName}
                            onChange={(e) => setUploadTableName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">File Upload</label>
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isDragging
                                ? 'border-primary bg-primary/5 scale-[0.98]'
                                : uploadFile
                                    ? 'border-primary/50 bg-primary/5'
                                    : 'border-border hover:border-primary/50 hover:bg-surface/50'
                                }`}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setUploadFile(file);
                                        if (!uploadName) setUploadName(file.name.split('.')[0]);
                                    }
                                }}
                            />
                            {uploadFile ? (
                                <div className="space-y-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
                                        <div className="relative h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 mx-auto">
                                            <FileText className="h-8 w-8 text-primary" strokeWidth={2} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-foreground">{uploadFile.name}</p>
                                        <p className="text-sm text-foreground-secondary mt-1">
                                            {(uploadFile.size / 1024).toFixed(1)} KB • Ready to process
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setUploadFile(null);
                                        }}
                                        className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors"
                                    >
                                        Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="h-16 w-16 bg-surface-alt rounded-2xl flex items-center justify-center border border-border/50 mx-auto">
                                        <Upload className="h-8 w-8 text-foreground-muted" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-foreground">Drop your file here</p>
                                        <p className="text-sm text-foreground-secondary mt-1">
                                            or click to browse • Excel (.xlsx, .xls) or CSV files
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <Cloud className="h-5 w-5 text-blue-400 flex-shrink-0" strokeWidth={2} />
                        <p className="text-sm text-foreground-secondary font-medium">
                            Files are stored in ephemeral SQLite and automatically purged after 72 hours.
                        </p>
                    </div>

                    <div className="flex justify-end items-center gap-3 pt-4 border-t border-border/30">
                        <button
                            type="button"
                            onClick={() => setIsUploadModalOpen(false)}
                            className="px-6 py-2.5 text-sm font-semibold text-foreground-secondary hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !uploadFile}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="relative px-8 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center gap-2 disabled:opacity-50">
                                {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                                ) : (
                                    <Upload className="h-4 w-4" strokeWidth={2.5} />
                                )}
                                {isSubmitting ? 'Processing...' : 'Upload & Ingest'}
                            </div>
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Data Sources Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div
                            key={i}
                            className="h-64 rounded-2xl bg-surface-alt/30 animate-pulse border border-border/30"
                        />
                    ))}
                </div>
            ) : dataSources.length === 0 ? (
                <div className="relative group">
                    <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl blur-sm" />
                    <div className="relative flex flex-col items-center justify-center py-32 glass-card rounded-3xl border-dashed backdrop-blur-xl">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                            <div className="relative h-20 w-20 bg-gradient-to-br from-surface-alt to-surface rounded-3xl flex items-center justify-center border border-border/50 shadow-xl">
                                <Database className="h-10 w-10 text-foreground-muted" strokeWidth={2} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">No Data Sources Connected</h3>
                        <p className="text-foreground-secondary max-w-md text-center font-medium leading-relaxed mb-8">
                            Connect your first database or upload a dataset to start building powerful analytics and visualizations.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <button
                                onClick={() => setIsUploadModalOpen(true)}
                                className="px-6 py-3 bg-surface/50 border border-border/50 text-foreground font-semibold rounded-xl hover:border-primary/30 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4 text-primary" />
                                Upload File
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                                <div className="relative px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-xl flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Connect Database
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataSources.map((ds, i) => (
                        <div
                            key={ds.id}
                            className="group relative animate-in"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />

                            <div className="relative glass-card rounded-2xl backdrop-blur-xl hover:border-primary/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Header */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative h-14 w-14 bg-gradient-to-br from-surface-alt to-surface rounded-xl flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                                                {ds.type === 'sqlite' ? (
                                                    <HardDrive className="h-7 w-7 text-primary" strokeWidth={2} />
                                                ) : (
                                                    <Database className="h-7 w-7 text-primary" strokeWidth={2} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEditModal(ds)}
                                                className="p-2 text-foreground-muted hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                                                title="Edit Connection"
                                            >
                                                <Edit className="h-4 w-4" strokeWidth={2} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSourceToDelete(ds.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2 text-foreground-muted hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                                                title="Delete Source"
                                            >
                                                <Trash2 className="h-4 w-4" strokeWidth={2} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-1">
                                        {ds.name}
                                    </h3>

                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg">
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                                            {ds.type === 'sqlite' ? 'Ephemeral SQLite' : `${ds.type.toUpperCase()}`}
                                        </span>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-foreground-muted font-medium flex items-center gap-2">
                                                <LinkIcon className="h-4 w-4" strokeWidth={2} />
                                                Host
                                            </span>
                                            <span className="text-foreground font-semibold truncate max-w-[140px]">
                                                {ds.type === 'sqlite' ? 'upload.db' : ds.connectionConfig.host}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-foreground-muted font-medium flex items-center gap-2">
                                                <Table className="h-4 w-4" strokeWidth={2} />
                                                Database
                                            </span>
                                            <span className="text-foreground font-semibold truncate max-w-[140px]">
                                                {ds.type === 'sqlite' ? 'data' : ds.connectionConfig.database}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto px-6 py-4 bg-gradient-to-b from-transparent to-surface-alt/50 border-t border-border/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,106,0.6)] animate-pulse" />
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                                            Active
                                        </span>
                                    </div>
                                    <button className="group/btn text-xs font-semibold text-foreground-secondary hover:text-primary transition-colors flex items-center gap-1">
                                        Test Connection
                                        <ChevronRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Data Source"
                message="Are you sure you want to delete this data source? All dependent charts and dashboards will stop working. This action cannot be undone."
                confirmText="Delete Source"
                isLoading={isSubmitting}
            />
        </div>
    );
}
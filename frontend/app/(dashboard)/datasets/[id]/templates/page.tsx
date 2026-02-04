'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Database,
    BookOpen,
    Plus,
    ChevronRight,
    Check,
    ArrowLeft,
    Search,
    Filter,
    Layers,
    AlertCircle,
    Info,
    Settings2
} from 'lucide-react';

interface MetricTemplate {
    id: string;
    name: string;
    description: string;
    sector: string;
    requiredColumns: string[];
    unit: string;
}

export default function KPITemplatesPage() {
    const params = useParams();
    const router = useRouter();
    const datasetId = params.id as string;

    const [templates, setTemplates] = useState<MetricTemplate[]>([
        {
            id: 't1',
            name: 'Total Sales Revenue',
            sector: 'Retail',
            description: 'Sum of all sales transactions for the period.',
            requiredColumns: ['amount'],
            unit: 'TZS'
        },
        {
            id: 't2',
            name: 'Gross Margin %',
            sector: 'Retail',
            description: 'Profit percentage after cost of goods sold.',
            requiredColumns: ['revenue', 'cost'],
            unit: '%'
        },
        {
            id: 't3',
            name: 'NPL Ratio',
            sector: 'Finance',
            description: 'Percentage of non-performing loans in the portfolio.',
            requiredColumns: ['days_past_due', 'balance'],
            unit: '%'
        }
    ]);

    const [selectedTemplate, setSelectedTemplate] = useState<MetricTemplate | null>(null);
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [isMapping, setIsMapping] = useState(false);

    const handleInstall = async () => {
        // In a real app, we would POST to /api/datasets/:id/templates/:templateId/apply
        console.log('Installing template:', selectedTemplate?.name, 'with mapping:', mapping);
        setIsMapping(false);
        setSelectedTemplate(null);
        // router.push(`/datasets/${datasetId}`);
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-surface rounded-xl transition-colors text-foreground-muted hover:text-foreground"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Industry KPI Library</h1>
                    <p className="text-foreground-muted mt-1">Discover and install standardized metrics for your sector.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Templates List */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                            <input
                                type="text"
                                placeholder="Search KPI templates..."
                                className="w-full bg-surface/50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl hover:bg-surface transition-all text-sm font-medium">
                            <Filter className="h-4 w-4" />
                            Sector
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="glass p-6 rounded-3xl border border-border/50 hover:border-primary/30 transition-all group flex justify-between items-center cursor-pointer"
                                onClick={() => {
                                    setSelectedTemplate(template);
                                    setIsMapping(true);
                                }}
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{template.name}</h3>
                                        <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md text-[10px] font-bold uppercase">{template.sector}</span>
                                    </div>
                                    <p className="text-sm text-foreground-muted">{template.description}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground-muted group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                                    <Plus className="h-5 w-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="glass p-8 rounded-[32px] border border-border/50 space-y-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">About KPI Templates</h3>
                            <p className="text-sm text-foreground-muted leading-relaxed">
                                Our KPI Library contains standardized metrics designed by industry experts. Installing a template automatically adds a calculated metric to your dataset using sector-standard logic.
                            </p>
                        </div>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-3">
                                <div className="mt-1"><Check className="h-4 w-4 text-primary" /></div>
                                <p className="text-xs font-medium">Regional standard formulas (Tanzania compliance)</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1"><Check className="h-4 w-4 text-primary" /></div>
                                <p className="text-xs font-medium">Automatic goal and target set-points</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mapping Modal */}
            {isMapping && selectedTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-background border border-border w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="p-8 border-b border-border flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                    <Settings2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Map Columns</h2>
                                    <p className="text-xs text-foreground-muted">Template: {selectedTemplate.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsMapping(false)} className="p-2 hover:bg-surface rounded-full transition-colors"><Plus className="h-6 w-6 rotate-45" /></button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl flex gap-3">
                                <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed text-blue-100/80">
                                    To install this KPI, select the corresponding columns from your database that match the template requirements.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {selectedTemplate.requiredColumns.map((col) => (
                                    <div key={col} className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted ml-1">Template Variable: {col}</label>
                                            {mapping[col] && <Check className="h-4 w-4 text-primary" />}
                                        </div>
                                        <select
                                            className="w-full bg-surface/50 border border-border rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium appearance-none"
                                            value={mapping[col] || ''}
                                            onChange={(e) => setMapping({ ...mapping, [col]: e.target.value })}
                                        >
                                            <option value="">Select a column...</option>
                                            <option value="price">price</option>
                                            <option value="amount">amount</option>
                                            <option value="cost_price">cost_price</option>
                                            <option value="total_revenue">total_revenue</option>
                                            <option value="loan_balance">loan_balance</option>
                                            <option value="dpd">days_past_due</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-white/[0.02] border-t border-border flex gap-3">
                            <button
                                onClick={() => setIsMapping(false)}
                                className="flex-1 px-6 py-3 border border-border rounded-2xl font-bold hover:bg-surface transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleInstall}
                                disabled={selectedTemplate.requiredColumns.some(c => !mapping[c])}
                                className="flex-1 px-6 py-3 bg-primary text-black rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
                            >
                                Install KPI
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

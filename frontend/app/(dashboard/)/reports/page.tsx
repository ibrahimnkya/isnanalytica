'use client';

import { useState, useEffect } from 'react';
import {
    FileText,
    Plus,
    MoreVertical,
    Download,
    Share2,
    Clock,
    Calendar,
    Search,
    Play,
    Mail
} from 'lucide-react';

interface Report {
    id: string;
    name: string;
    dashboard: string;
    frequency: string;
    lastRun: string;
    nextRun: string;
    formats: string[];
    recipients: number;
}

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data for initial UI implementation
    const mockReports: Report[] = [
        {
            id: '1',
            name: 'Monthly Executive Summary',
            dashboard: 'Main Operational View',
            frequency: 'monthly',
            lastRun: '2024-02-01',
            nextRun: '2024-03-01',
            formats: ['pdf', 'email'],
            recipients: 5
        },
        {
            id: '2',
            name: 'Weekly Sales Performance',
            dashboard: 'Sales Analytics',
            frequency: 'weekly',
            lastRun: '3 days ago',
            nextRun: 'In 4 days',
            formats: ['pdf'],
            recipients: 3
        },
        {
            id: '3',
            name: 'Daily Inventory Snapshot',
            dashboard: 'Warehouse Inventory',
            frequency: 'daily',
            lastRun: 'Today, 8:00 AM',
            nextRun: 'Tomorrow, 8:00 AM',
            formats: ['excel'],
            recipients: 2
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setReports(mockReports);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Scheduled Reports</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Automate your reporting with scheduled dashboard exports.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                    <Plus className="h-5 w-5" />
                    Create New Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Scheduled Reports', value: '8', icon: Calendar, color: 'text-primary' },
                    { label: 'Exports Generated', value: '124', icon: FileText, color: 'text-blue-500' },
                    { label: 'Avg. Delivery Time', value: '1.2s', icon: Clock, color: 'text-purple-500' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-3xl border border-border/50 flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                            <div className="text-3xl font-bold mt-1">{stat.value}</div>
                        </div>
                        <div className={`h-12 w-12 rounded-2xl bg-surface-alt flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card rounded-3xl border border-border/50 overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-border/30 flex items-center justify-between bg-surface-alt/20">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search reports..."
                            className="w-full bg-surface border border-border/50 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface-alt/10 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/30">
                                <th className="px-8 py-5">Report Name</th>
                                <th className="px-8 py-5">Dashboard</th>
                                <th className="px-8 py-5">Frequency</th>
                                <th className="px-8 py-5">Last Run</th>
                                <th className="px-8 py-5">Next Run</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-8 py-5 h-20 bg-surface/10"></td>
                                    </tr>
                                ))
                            ) : reports.map((report) => (
                                <tr key={report.id} className="hover:bg-surface-alt/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center border border-border/30">
                                                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{report.name}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {report.formats.map(f => (
                                                        <span key={f} className="text-[10px] font-black uppercase text-muted-foreground/70 bg-surface-alt px-1.5 py-0.5 rounded border border-border/30">{f}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm">
                                        {report.dashboard}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-surface-alt border border-border/50 capitalize">
                                            {report.frequency}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-muted-foreground">
                                        {report.lastRun}
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-foreground">
                                        {report.nextRun}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-surface-alt rounded-xl transition-colors text-muted-foreground transition-colors" title="Run Now">
                                                <Play className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-surface-alt rounded-xl transition-colors text-muted-foreground" title="Download Last">
                                                <Download className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-surface-alt rounded-xl transition-colors">
                                                <MoreVertical className="h-5 w-5 text-muted-foreground" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

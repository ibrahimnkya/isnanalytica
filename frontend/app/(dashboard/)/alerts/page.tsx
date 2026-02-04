'use client';

import { useState, useEffect } from 'react';
import {
    Bell,
    Plus,
    MoreVertical,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Activity,
    Clock,
    Search
} from 'lucide-react';

interface Alert {
    id: string;
    name: string;
    type: string;
    metric: string;
    condition: string;
    status: string;
    lastTriggered: string;
    recipients: number;
}

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data for initial UI implementation
    const mockAlerts: Alert[] = [
        {
            id: '1',
            name: 'Low Stock Alert - Dar Store',
            type: 'threshold',
            metric: 'Inventory Level',
            condition: '< 50 units',
            status: 'active',
            lastTriggered: '2 hours ago',
            recipients: 3
        },
        {
            id: '2',
            name: 'Revenue Drop Trend - Weekly',
            type: 'trend',
            metric: 'Total Revenue',
            condition: 'WoW < -15%',
            status: 'triggered',
            lastTriggered: '10 mins ago',
            recipients: 5
        },
        {
            id: '3',
            name: 'High Fraud Probability - Payments',
            type: 'anomaly',
            metric: 'Transaction Risk',
            condition: 'Rule matched',
            status: 'active',
            lastTriggered: 'Never',
            recipients: 2
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setAlerts(mockAlerts);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Monitor your business KPIs with automated triggers.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                    <Plus className="h-5 w-5" />
                    Create New Alert
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Alerts', value: '12', icon: Activity, color: 'text-primary' },
                    { label: 'Triggered (24h)', value: '4', icon: AlertTriangle, color: 'text-amber-500' },
                    { label: 'Total Logs', value: '452', icon: Clock, color: 'text-blue-500' }
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
                            placeholder="Search alerts..."
                            className="w-full bg-surface border border-border/50 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border border-border/50 rounded-xl text-sm font-medium hover:bg-surface-alt transition-colors">All Status</button>
                        <button className="px-4 py-2 border border-border/50 rounded-xl text-sm font-medium hover:bg-surface-alt transition-colors">By Type</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface-alt/10 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/30">
                                <th className="px-8 py-5">Alert Name</th>
                                <th className="px-8 py-5">Type</th>
                                <th className="px-8 py-5">Condition</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Last Triggered</th>
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
                            ) : alerts.map((alert) => (
                                <tr key={alert.id} className="hover:bg-surface-alt/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-xl bg-surface items-center justify-center flex border border-border/30`}>
                                                <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{alert.name}</div>
                                                <div className="text-xs text-muted-foreground mt-1">Metric: {alert.metric}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-surface-alt border border-border/50 capitalize">
                                            {alert.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <code className="text-xs font-mono bg-surface-alt/50 px-2 py-1 rounded border border-border/30">
                                            {alert.condition}
                                        </code>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2 w-2 rounded-full ${alert.status === 'active' ? 'bg-primary' : 'bg-amber-500 animate-pulse'
                                                }`} />
                                            <span className="text-sm font-medium capitalize">{alert.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-muted-foreground">
                                        {alert.lastTriggered}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-surface-alt rounded-xl transition-colors">
                                            <MoreVertical className="h-5 w-5 text-muted-foreground" />
                                        </button>
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

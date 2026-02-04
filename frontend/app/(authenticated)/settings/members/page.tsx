'use client';

import { useState } from 'react';
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Shield,
    UserPlus,
    Trash2,
    Edit3,
    CheckCircle2,
    Clock
} from 'lucide-react';

interface Member {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Analyst' | 'Viewer';
    branch: string;
    status: 'Active' | 'Pending';
    joinedDate: string;
}

export default function TeamMembersPage() {
    const [members, setMembers] = useState<Member[]>([
        {
            id: '1',
            name: 'Amani Kwayu',
            email: 'amani@isn.co.tz',
            role: 'Admin',
            branch: 'Main HQ',
            status: 'Active',
            joinedDate: '2025-12-10'
        },
        {
            id: '2',
            name: 'Sarah Mbeke',
            email: 'sarah.m@isn.co.tz',
            role: 'Analyst',
            branch: 'Northern Branch',
            status: 'Active',
            joinedDate: '2026-01-15'
        },
        {
            id: '3',
            name: 'John Doe',
            email: 'j.doe@example.com',
            role: 'Viewer',
            branch: 'Main HQ',
            status: 'Pending',
            joinedDate: '2026-02-01'
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadge = (role: Member['role']) => {
        switch (role) {
            case 'Admin': return <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold">Admin</span>;
            case 'Analyst': return <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold">Analyst</span>;
            case 'Viewer': return <span className="px-2 py-1 bg-surface border border-border rounded-lg text-xs font-bold">Viewer</span>;
        }
    };

    const getStatusBadge = (status: Member['status']) => {
        if (status === 'Active') {
            return <span className="flex items-center gap-1.5 text-xs font-medium text-primary"><CheckCircle2 className="h-3 w-3" /> Active</span>;
        }
        return <span className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted"><Clock className="h-3 w-3" /> Pending</span>;
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-foreground-muted mt-1">Manage users, roles, and access within your organization.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
                    <UserPlus className="h-5 w-5" />
                    Invite Member
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass p-6 rounded-3xl border border-border/50">
                    <p className="text-sm font-medium text-foreground-muted">Total Members</p>
                    <p className="text-3xl font-bold mt-1">{members.length}</p>
                </div>
                <div className="glass p-6 rounded-3xl border border-border/50">
                    <p className="text-sm font-medium text-foreground-muted">Active Users</p>
                    <p className="text-3xl font-bold mt-1 text-primary">{members.filter(m => m.status === 'Active').length}</p>
                </div>
                <div className="glass p-6 rounded-3xl border border-border/50">
                    <p className="text-sm font-medium text-foreground-muted">Pending Invites</p>
                    <p className="text-3xl font-bold mt-1 text-orange-400">{members.filter(m => m.status === 'Pending').length}</p>
                </div>
                <div className="glass p-6 rounded-3xl border border-border/50">
                    <p className="text-sm font-medium text-foreground-muted">Storage Used</p>
                    <p className="text-3xl font-bold mt-1">12%</p>
                </div>
            </div>

            {/* Filters and Table */}
            <div className="glass rounded-3xl border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between bg-white/[0.01]">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl hover:bg-surface transition-all text-sm font-medium">
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border/50 bg-white/[0.02]">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">Member</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">Role</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">Branch</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground-muted">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground-muted text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-primary group-hover:scale-105 transition-transform">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">{member.name}</div>
                                                <div className="text-xs text-foreground-muted flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    {member.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{getRoleBadge(member.role)}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium">{member.branch}</span>
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(member.status)}</td>
                                    <td className="px-6 py-4 text-sm text-foreground-muted">{member.joinedDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button className="p-2 hover:bg-surface rounded-lg text-foreground-muted hover:text-foreground transition-colors"><Edit3 className="h-4 w-4" /></button>
                                            <button className="p-2 hover:bg-red-500/10 rounded-lg text-foreground-muted hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length === 0 && (
                    <div className="p-12 text-center">
                        <Users className="h-12 w-12 text-border mx-auto mb-4" />
                        <h3 className="font-bold text-lg">No members found</h3>
                        <p className="text-foreground-muted">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

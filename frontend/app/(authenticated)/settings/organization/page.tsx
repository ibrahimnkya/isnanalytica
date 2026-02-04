'use client';

import { useState } from 'react';
import {
    Briefcase,
    Plus,
    ChevronRight,
    MapPin,
    Building2,
    Trash2,
    Edit,
    Save,
    X,
    MoreVertical
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Department {
    id: string;
    name: string;
}

interface Branch {
    id: string;
    name: string;
    location: string;
    departments: Department[];
}

interface Organization {
    id: string;
    name: string;
    industry: string;
    branches: Branch[];
}

export default function OrganizationSettings() {
    const [organization, setOrganization] = useState<Organization>({
        id: '1',
        name: 'ISN Solutions',
        industry: 'Technology',
        branches: [
            {
                id: 'b1',
                name: 'Main HQ',
                location: 'Dar es Salaam, Masaki',
                departments: [
                    { id: 'd1', name: 'Software Engineering' },
                    { id: 'd2', name: 'Sales & Marketing' }
                ]
            },
            {
                id: 'b2',
                name: 'Northern Branch',
                location: 'Arusha, Clock Tower',
                departments: [
                    { id: 'd3', name: 'Operations' }
                ]
            }
        ]
    });

    const [isEditingOrg, setIsEditingOrg] = useState(false);
    const [orgForm, setOrgForm] = useState({ name: organization.name, industry: organization.industry });

    const handleSaveOrg = () => {
        setOrganization({ ...organization, ...orgForm });
        setIsEditingOrg(false);
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
                    <p className="text-foreground-muted mt-1">Manage your business identity and institutional hierarchy.</p>
                </div>
                {!isEditingOrg ? (
                    <button
                        onClick={() => setIsEditingOrg(true)}
                        className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-xl hover:bg-surface/80 transition-all font-medium"
                    >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditingOrg(false)}
                            className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-xl hover:bg-surface/80 transition-all font-medium"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveOrg}
                            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all font-bold"
                        >
                            <Save className="h-4 w-4" />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* Organization Info Card */}
            <div className="glass rounded-3xl p-8 border border-border/50">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-black shadow-xl shadow-primary/20">
                        <Building2 className="h-10 w-10" />
                    </div>
                    <div className="flex-1 space-y-4">
                        {isEditingOrg ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Company Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        value={orgForm.name}
                                        onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Industry</label>
                                    <select
                                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        value={orgForm.industry}
                                        onChange={(e) => setOrgForm({ ...orgForm, industry: e.target.value })}
                                    >
                                        <option value="Technology">Technology</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Logistics">Logistics</option>
                                        <option value="Finance">Finance</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold">{organization.name}</h2>
                                <p className="text-primary font-medium">{organization.industry} Sector</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Branches & Departments
                    </h2>
                    <button className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/20 transition-all font-bold">
                        <Plus className="h-4 w-4" />
                        Add Branch
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {organization.branches.map((branch) => (
                        <div key={branch.id} className="glass rounded-3xl overflow-hidden border border-border/50 group hover:border-primary/30 transition-all duration-300">
                            <div className="p-6 border-b border-border/50 flex justify-between items-center bg-white/[0.02]">
                                <div>
                                    <h3 className="font-bold text-lg">{branch.name}</h3>
                                    <p className="text-sm text-foreground-muted">{branch.location}</p>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-surface rounded-lg text-foreground-muted hover:text-foreground"><Edit className="h-4 w-4" /></button>
                                    <button className="p-2 hover:bg-red-500/10 rounded-lg text-foreground-muted hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Departments</span>
                                    <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                        <Plus className="h-3 w-3" />
                                        Add Dept
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {branch.departments.map((dept) => (
                                        <div key={dept.id} className="flex justify-between items-center bg-surface/50 border border-border/30 rounded-xl px-4 py-3 group/dept">
                                            <span className="text-sm font-medium">{dept.name}</span>
                                            <button className="opacity-0 group-hover/dept:opacity-100 p-1 hover:text-red-400 transition-all">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

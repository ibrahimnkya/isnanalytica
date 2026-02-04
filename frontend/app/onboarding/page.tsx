'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Building2,
    MapPin,
    Users,
    ArrowRight,
    Check,
    BarChart3,
    ArrowLeft,
    Building,
    Target,
    Layers
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        orgName: '',
        industry: '',
        branchName: '',
        location: '',
        teamEmail: ''
    });

    const totalSteps = 3;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const updateForm = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const steps = [
        { id: 1, title: 'Identity', icon: Building2 },
        { id: 2, title: 'Operations', icon: MapPin },
        { id: 3, title: 'Collaborate', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 mesh-bg">
            <div className="w-full max-w-2xl">
                {/* Branding */}
                <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="h-16 w-16 bg-[#00FF41] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#00FF41]/30 mb-4 transform hover:rotate-6 transition-transform">
                        <BarChart3 className="h-9 w-9 text-black" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">ISN <span className="text-[#00FF41] italic">Analytica</span></h1>
                    <p className="text-foreground-muted mt-2 font-medium">Powering decision intelligence across Tanzania.</p>
                </div>

                {/* Wizard Container */}
                <div className="glass rounded-[40px] border border-border/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-700">
                    {/* Progress Bar */}
                    <div className="bg-white/[0.03] border-b border-border/50 px-10 py-6">
                        <div className="flex justify-between items-center relative">
                            {/* Step Lines */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
                            <div
                                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                            />

                            {steps.map((s) => (
                                <div key={s.id} className="relative z-10 flex flex-col items-center">
                                    <div className={cn(
                                        "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 font-bold text-sm",
                                        step >= s.id
                                            ? "bg-primary border-primary text-black"
                                            : "bg-surface border-border text-foreground-muted"
                                    )}>
                                        {step > s.id ? <Check className="h-5 w-5" /> : s.id}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest mt-2 transition-all duration-500",
                                        step >= s.id ? "text-primary" : "text-foreground-muted"
                                    )}>
                                        {s.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="p-10 space-y-8 min-h-[400px]">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <Building className="text-primary h-6 w-6" />
                                        Organization Identity
                                    </h2>
                                    <p className="text-foreground-muted">Tell us about your business to help us tailor your experience.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted ml-1">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Serengeti Retailers"
                                            className="w-full bg-surface/50 border border-border rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                            value={formData.orgName}
                                            onChange={(e) => updateForm('orgName', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted ml-1">Industry Vertical</label>
                                        <select
                                            className="w-full bg-surface/50 border border-border rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium appearance-none"
                                            value={formData.industry}
                                            onChange={(e) => updateForm('industry', e.target.value)}
                                        >
                                            <option value="">Select industry...</option>
                                            <option value="Retail">Retail & Distribution</option>
                                            <option value="Logistics">Logistics & Supply Chain</option>
                                            <option value="Finance">Micro-Finance / MFI</option>
                                            <option value="Agri">Agri-Business</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <Target className="text-primary h-6 w-6" />
                                        Primary Operations
                                    </h2>
                                    <p className="text-foreground-muted">Where should we point your first analytical lens?</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted ml-1">Main Branch Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Dar Headquarters"
                                            className="w-full bg-surface/50 border border-border rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                            value={formData.branchName}
                                            onChange={(e) => updateForm('branchName', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted ml-1">Geo Location</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Masaki, Dar es Salaam"
                                            className="w-full bg-surface/50 border border-border rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                            value={formData.location}
                                            onChange={(e) => updateForm('location', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-4">
                                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                    <Layers className="h-10 w-10 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold">Ready for Impact?</h2>
                                    <p className="text-foreground-muted max-w-sm mx-auto">Your configuration is complete. You can now start connecting your data sources.</p>
                                </div>
                                <div className="bg-surface border border-border rounded-3xl p-8 text-left space-y-4 max-w-md mx-auto">
                                    <div className="flex justify-between border-b border-border/50 pb-2">
                                        <span className="text-xs font-bold text-foreground-muted uppercase">Org</span>
                                        <span className="text-sm font-bold text-primary">{formData.orgName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-border/50 pb-2">
                                        <span className="text-xs font-bold text-foreground-muted uppercase">Branch</span>
                                        <span className="text-sm font-medium">{formData.branchName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-bold text-foreground-muted uppercase">Sector</span>
                                        <span className="text-sm font-medium">{formData.industry}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="px-10 py-8 bg-white/[0.03] border-t border-border/50 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 text-foreground-muted hover:text-foreground font-bold transition-all"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Back
                            </button>
                        ) : <div />}

                        {step < totalSteps ? (
                            <button
                                onClick={nextStep}
                                disabled={step === 1 && !formData.orgName}
                                className="flex items-center gap-2 bg-[#00FF41] text-black px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#00FF41]/20 hover:shadow-[#00FF41]/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                            >
                                Continue
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        ) : (
                            <Link
                                href="/dashboards"
                                className="flex items-center gap-2 bg-[#00FF41] text-black px-8 py-4 rounded-2xl font-black shadow-xl shadow-[#00FF41]/20 hover:shadow-[#00FF41]/40 hover:scale-105 active:scale-95 transition-all"
                            >
                                Finish Setup
                                <Check className="h-5 w-5" />
                            </Link>
                        )}
                    </div>
                </div>

                <p className="text-center mt-6 text-sm text-foreground-muted">
                    Need help setting up? <button className="text-primary hover:underline font-bold">Contact Support</button>
                </p>
            </div>
        </div>
    );
}

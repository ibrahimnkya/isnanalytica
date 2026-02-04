'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BarChart3,
    Loader2,
    ArrowRight,
    ArrowLeft,
    Shield,
    Lock,
    Mail,
    User,
    Building2,
    CheckCircle2,
    LockKeyhole,
    Check,
    Globe,
    Github
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (step === 1 && (!formData.fullName || !formData.email)) {
            setError('Please fill in your identity details');
            return;
        }
        setError('');
        setStep(step + 1);
    };

    const prevStep = () => {
        setError('');
        setStep(step - 1);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetchApi('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    companyName: formData.companyName
                }),
            });

            if (res.access_token) {
                localStorage.setItem('token', res.access_token);
                // Set cookie for middleware
                document.cookie = `token=${res.access_token}; path=/; max-age=86400; samesite=lax`;
                router.push('/dashboards');
            } else {
                setError('Registration failed');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const steps = [
        { id: 1, name: 'Identity' },
        { id: 2, name: 'Business' },
        { id: 3, name: 'Security' }
    ];

    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground">
            {/* ── LEFT COLUMN: Stepper Interaction ── */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 justify-between bg-background relative overflow-hidden">
                {/* Logo */}
                <div className="flex justify-center lg:justify-start relative z-10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-black/20">
                            <BarChart3 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase text-foreground">
                            ISN <span className="text-foreground">Analytica</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Stepper Form */}
                <div className="flex flex-col items-center justify-center py-12 relative z-10">
                    <div className="w-full max-w-[420px] space-y-8">
                        {/* Step Progress Indicators */}
                        <div className="flex items-center justify-between px-2 mb-12">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex items-center group">
                                    <div className={`
                    flex items-center justify-center h-10 w-10 rounded-full border-2 transition-all duration-300
                    ${step === s.id ? 'border-primary bg-primary/10 text-primary' :
                                            step > s.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground-muted'}
                  `}>
                                        {step > s.id ? <Check className="h-5 w-5" strokeWidth={3} /> : <span className="font-black text-sm">{s.id}</span>}
                                    </div>
                                    <div className={`ml-3 hidden md:block transition-all duration-300 ${step === s.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-primary">{s.name}</span>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className={`h-[2px] w-8 md:w-12 mx-2 md:mx-4 transition-all duration-500 ${step > s.id ? 'bg-primary' : 'bg-border'}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-foreground">
                                {step === 1 && 'First, who are you?'}
                                {step === 2 && 'Tell us about your work'}
                                {step === 3 && 'Secure your account'}
                            </h1>
                            <p className="text-foreground-secondary font-medium">
                                {step === 1 && 'Join 500+ professionals making data-driven decisions.'}
                                {step === 2 && 'We use this to personalize your analytics dashboard.'}
                                {step === 3 && 'Create a strong password to protect your intelligence.'}
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-6">
                            {/* Step 1: Identity */}
                            {step === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Work Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                                placeholder="john@company.io"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Business */}
                            {step === 2 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Company Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                                placeholder="Acme Analytics"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-black/5 border border-black/10 rounded-xl flex gap-3">
                                        <Shield className="h-5 w-5 text-foreground shrink-0" />
                                        <p className="text-[11px] text-foreground-secondary leading-normal">
                                            Your data is isolated and encrypted. We never share enterprise information with third parties.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Security */}
                            {step === 3 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Create Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3 animate-in fade-in duration-300">
                                    <div className="h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">!</div>
                                    <p className="text-xs text-red-600 font-bold leading-tight">{error}</p>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 py-3.5 border border-border text-foreground font-bold rounded-xl hover:bg-surface-alt transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back
                                    </button>
                                )}

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="group/btn relative flex-[2]"
                                    >
                                        <div className="absolute inset-0 bg-black/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                        <div className="relative w-full py-3.5 bg-primary text-primary-foreground font-black rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-black/20 uppercase tracking-widest text-sm">
                                            Continue
                                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group/btn relative flex-[2]"
                                    >
                                        <div className="absolute inset-0 bg-black/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                        <div className="relative w-full py-3.5 bg-primary text-primary-foreground font-black rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-black/20 uppercase tracking-widest text-sm">
                                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                                <>
                                                    Complete Setup
                                                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                )}
                            </div>
                        </form>

                        <p className="text-center text-sm font-medium text-foreground-secondary">
                            Already have an account? <Link href="/login" className="text-primary font-black hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center lg:justify-start relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">
                        © 2026 ISN Analytica • Tanzanian Enterprise Intelligence
                    </p>
                </div>
            </div>

            {/* ── RIGHT COLUMN: Visual Showcase ── */}
            <div className="hidden lg:flex w-1/2 bg-bg-dark relative flex-col items-center justify-center p-20 overflow-hidden">
                {/* Background Visuals */}
                <div className="absolute inset-0 bg-white/5 z-0" />
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-gray-500/10 rounded-full blur-[120px]" />

                {/* Dashboard Preview Elements */}
                <div className="relative z-10 w-full max-w-[500px] flex flex-col gap-8 animate-in slide-in-from-right-12 duration-1000">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dark border border-white/5 rounded-full">
                            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">System Ready for Onboarding</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
                            A New Era of <span className="text-white">Operational Intelligence.</span>
                        </h2>
                        <p className="text-white/50 text-lg font-medium">
                            Join the network of data-driven leaders in Tanzania. Set up your enterprise environment in less than 2 minutes.
                        </p>
                    </div>

                    {/* Interactive UI Mockups */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1C1F26] border border-white/5 p-4 rounded-xl space-y-3 shadow-2xl skew-x-[-1deg] transition-transform duration-700 hover:scale-105">
                            <div className="flex justify-between items-center">
                                <div className="h-2 w-12 bg-white/10 rounded-full" />
                                <LockKeyhole className="h-4 w-4 text-white" />
                            </div>
                            <div className="space-y-1">
                                <div className="h-3 w-24 bg-white/20 rounded-full" />
                                <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                            </div>
                            <div className="h-12 w-full bg-gradient-to-br from-white/20 to-transparent rounded-lg border border-white/20 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-white" />
                            </div>
                        </div>

                        <div className="bg-[#1C1F26] border border-white/5 p-4 rounded-xl space-y-3 shadow-2xl mt-4 skew-y-[1deg] transition-transform duration-700 hover:scale-105">
                            <div className="flex gap-2">
                                <div className="h-6 w-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <Building2 className="h-3.5 w-3.5 text-blue-400" />
                                </div>
                                <div className="space-y-1 text-[8px] font-bold text-white/40 uppercase tracking-tighter">
                                    Enterprise Node
                                </div>
                            </div>
                            <div className="flex gap-1 items-end h-12">
                                <div className="w-full h-[40%] bg-white/20 rounded-t-sm" />
                                <div className="w-full h-[60%] bg-white/30 rounded-t-sm" />
                                <div className="w-full h-[85%] bg-white/60 rounded-t-sm" />
                                <div className="w-full h-[50%] bg-white/40 rounded-t-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute bottom-0 right-0 w-full h-1/2 flex gap-1 items-end px-4 opacity-5 pointer-events-none">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-white" style={{ height: `${Math.random() * 80}%` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

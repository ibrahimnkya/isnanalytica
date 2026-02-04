'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    Mail,
    ArrowRight,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    LockKeyhole,
    Building2
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetchApi('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
            setMessage(res.message);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground">
            {/* ── LEFT COLUMN: Request Reset Form ── */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 justify-between bg-background relative overflow-hidden">
                {/* Logo */}
                <div className="flex justify-center lg:justify-start relative z-10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                            <BarChart3 className="h-5 w-5 text-black" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase text-foreground">
                            ISN <span className="text-primary">Analytica</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Form */}
                <div className="flex flex-col items-center justify-center py-12 relative z-10">
                    <div className="w-full max-w-[380px] space-y-8">
                        <div className="text-center lg:text-left space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Reset Password</h1>
                            <p className="text-foreground-secondary font-medium">Enter your email and we'll send you recovery instructions.</p>
                        </div>

                        {message ? (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                    <p className="text-sm text-foreground-secondary font-medium leading-normal">
                                        {message}
                                    </p>
                                </div>
                                <Link
                                    href="/login"
                                    className="w-full py-3.5 bg-foreground text-foreground-inverse font-bold rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Login
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Work Email</label>
                                    <div className="relative">
                                        {/* <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" /> */}
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-foreground-muted"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3 animate-in fade-in duration-300">
                                        <div className="h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">!</div>
                                        <p className="text-xs text-red-600 font-bold leading-tight">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group/btn relative w-full pt-2"
                                >
                                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                    <div className="relative w-full py-3.5 bg-primary text-black font-black rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20 uppercase tracking-widest text-sm">
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                            <>
                                                Send Reset Link
                                                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>

                                <div className="text-center">
                                    <Link href="/login" className="text-sm font-bold text-foreground-secondary hover:text-primary transition-colors flex items-center justify-center gap-2 group">
                                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center lg:justify-start relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">
                        © 2026 ISN Analytica • Secure Access Layer
                    </p>
                </div>
            </div>

            {/* ── RIGHT COLUMN: Visual Showcase ── */}
            <div className="hidden lg:flex w-1/2 bg-bg-dark relative flex-col items-center justify-center p-20 overflow-hidden">
                {/* Background Visuals */}
                <div className="absolute inset-0 bg-primary/5 z-0" />
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

                {/* Password Reset Visual Motif */}
                <div className="relative z-10 w-full max-w-[440px] flex flex-col gap-12 animate-in slide-in-from-right-12 duration-1000">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dark border border-white/5 rounded-full">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,106,0.6)]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Enhanced Security Protocols</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
                            Forgot Your <span className="text-primary">Key?</span> No Room for Worry.
                        </h2>
                        <p className="text-white/50 text-lg font-medium">
                            We take security seriously. Our recovery process is encrypted and streamlined to get you back to your metrics swiftly.
                        </p>
                    </div>

                    <div className="bg-[#1C1F26] border border-white/5 p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LockKeyhole className="h-24 w-24 text-primary" />
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="h-2 w-32 bg-primary/20 rounded-full" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-white/5 rounded-lg border border-white/5" />
                                <div className="h-4 w-3/4 bg-white/5 rounded-lg border border-white/5" />
                            </div>
                            <div className="pt-4">
                                <div className="h-10 w-full rounded-xl bg-primary/10 border border-primary/20 flex items-center px-4 gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                    <div className="h-1.5 w-24 bg-primary/30 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    BarChart3,
    Lock,
    ArrowRight,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    Eye,
    EyeOff,
    ShieldCheck
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Invalid reset link. Token is missing.');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await fetchApi('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, password }),
            });
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password. The link might be expired.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 relative z-10">
            <div className="w-full max-w-[380px] space-y-8">
                <div className="text-center lg:text-left space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Update Password</h1>
                    <p className="text-foreground-secondary font-medium">Create a new secure password for your account.</p>
                </div>

                {success ? (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl flex flex-col items-center text-center gap-4">
                            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
                                <CheckCircle2 className="h-8 w-8 text-black" strokeWidth={3} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-black text-foreground">Password Reset Successful</h3>
                                <p className="text-sm text-foreground-secondary font-medium">Redirecting you to login in a few seconds...</p>
                            </div>
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
                            <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-11 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-foreground-muted"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Confirm New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-foreground-muted"
                                    placeholder="••••••••"
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
                            disabled={isLoading || !token}
                            className="group/btn relative w-full pt-2"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <div className="relative w-full py-3.5 bg-primary text-black font-black rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20 uppercase tracking-widest text-sm">
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                    <>
                                        Update Password
                                        <ShieldCheck className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground">
            {/* ── LEFT COLUMN: Reset Password Form ── */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 justify-between bg-background relative overflow-hidden">
                {/* Logo */}
                <div className="flex justify-center lg:justify-start relative z-10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-[#00FF41] rounded-lg flex items-center justify-center shadow-lg shadow-[#00FF41]/20">
                            <BarChart3 className="h-5 w-5 text-black" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase text-foreground">
                            ISN <span className="text-[#00FF41]">Analytica</span>
                        </span>
                    </Link>
                </div>

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-20 relative z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                }>
                    <ResetPasswordContent />
                </Suspense>

                {/* Footer */}
                <div className="flex justify-center lg:justify-start relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted">
                        © 2026 ISN Analytica • Cryptographic Update Node
                    </p>
                </div>
            </div>

            {/* ── RIGHT COLUMN: Visual Showcase ── */}
            <div className="hidden lg:flex w-1/2 bg-black relative flex-col items-center justify-center p-20 overflow-hidden">
                {/* Background Visuals */}
                <div className="absolute inset-0 bg-[#00FF41]/5 z-0" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00FF41]/10 rounded-full blur-[120px]" />

                <div className="relative z-10 w-full max-w-[440px] flex flex-col gap-12 animate-in slide-in-from-right-12 duration-1000">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 border border-[#00FF41]/20 rounded-full">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.6)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF41]/80">Authentication Authority</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
                            Stronger <span className="text-[#00FF41]">Defenses</span> for Your Insights.
                        </h2>
                        <p className="text-white/50 text-lg font-medium">
                            Updating your credentials ensures your enterprise data remains exclusive to you. Use at least 8 characters with a mix of symbols.
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        <div className="relative bg-[#1C1F26] border border-white/5 p-8 rounded-2xl space-y-6 shadow-2xl skew-y-[-1deg] hover:skew-y-0 transition-transform duration-500">
                            <div className="flex gap-4 items-center">
                                <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                    <Lock className="text-primary h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                                    <div className="h-1.5 w-32 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            <div className="h-px w-full bg-white/5" />
                            <div className="grid grid-cols-4 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-1 bg-primary/30 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

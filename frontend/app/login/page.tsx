'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    BarChart3,
    Loader2,
    ArrowRight,
    Shield,
    Lock,
    Mail,
    CheckCircle2,
    Eye,
    EyeOff,
    Github,
    Globe
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetchApi('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (res.access_token) {
                localStorage.setItem('token', res.access_token);
                // Set cookie for middleware
                document.cookie = `token=${res.access_token}; path=/; max-age=86400; samesite=lax`;
                router.push('/dashboards');
            } else {
                setError('Invalid credentials');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground">
            {/* ── LEFT COLUMN: Interaction Zone ── */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 justify-between bg-background">
                {/* Logo */}
                <div className="flex justify-center lg:justify-start">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-black/20">
                            <BarChart3 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase text-foreground">
                            ISN <span className="text-foreground">Analytica</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Form */}
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-full max-w-[380px] space-y-8">
                        <div className="text-center lg:text-left space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Welcome Back</h1>
                            <p className="text-foreground-secondary font-medium">Please enter your enterprise credentials to sign in.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary ml-1">Email Address</label>
                                <div className="relative">
                                    {/* <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" /> */}
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">Password</label>
                                    <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    {/* <Lock className="absolute  left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" /> */}
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-11 py-3 bg-surface border border-border rounded-lg text-sm font-medium focus:border-primary focus:ring-4 focus:ring-black/10 outline-none transition-all placeholder:text-foreground-muted"
                                        placeholder="••••••••"
                                        required
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
                                <div className="absolute inset-0 bg-black/20 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <div className="relative w-full py-3.5 bg-primary text-primary-foreground font-black rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-black/20 uppercase tracking-widest text-sm">
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                        <>
                                            Sign In
                                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        <p className="text-center text-sm font-medium text-foreground-secondary">
                            New to ISN? <Link href="/register" className="text-primary font-black hover:underline">Create an account</Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center lg:justify-start">
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
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Real-Time Data Active</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
                            Unlock the <span className="text-white">Full Potential</span> of Your Data.
                        </h2>
                        <p className="text-white/50 text-lg font-medium">
                            Join 500+ East African enterprises making smarter, faster decisions with our semantic analytics layer.
                        </p>
                    </div>

                    {/* Interactive UI Mockups (Abstracted as CSS widgets) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1C1F26] border border-white/5 p-4 rounded-xl space-y-3 shadow-2xl skew-x-[-1deg]">
                            <div className="flex justify-between items-center">
                                <div className="h-2 w-12 bg-white/10 rounded-full" />
                                <div className="h-4 w-4 bg-white/20 rounded text-white flex items-center justify-center text-[10px] font-bold">↗</div>
                            </div>
                            <div className="h-3 w-20 bg-white/20 rounded-full" />
                            <div className="h-8 w-full bg-gradient-to-t from-white/20 to-transparent rounded-lg border-b-2 border-white" />
                        </div>
                        <div className="bg-[#1C1F26] border border-white/5 p-4 rounded-xl space-y-3 shadow-2xl mt-4 skew-y-[1deg]">
                            <div className="flex gap-2">
                                <div className="h-6 w-6 rounded-full bg-blue-500/20" />
                                <div className="space-y-1">
                                    <div className="h-2 w-16 bg-white/20 rounded-full" />
                                    <div className="h-1.5 w-10 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            <div className="flex gap-1 items-end h-10">
                                <div className="w-full h-[30%] bg-white/5 rounded-t" />
                                <div className="w-full h-[60%] bg-white/5 rounded-t" />
                                <div className="w-full h-[45%] bg-white/10 rounded-t" />
                                <div className="w-full h-[90%] bg-white/40 rounded-t" />
                                <div className="w-full h-[70%] bg-white/5 rounded-t" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute bottom-0 right-0 w-full h-1/2 flex gap-1 items-end px-4 opacity-5 pointer-events-none">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-white" style={{ height: `${Math.random() * 100}%` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
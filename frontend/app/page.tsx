'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    ArrowRight,
    ShieldCheck,
    Zap,
    Database,
    Globe,
    Lock,
    ChevronRight,
    CheckCircle2,
    Sparkles,
    Play,
    Terminal
} from 'lucide-react';

const sectors = [
    {
        title: 'Retail & Distribution',
        desc: 'Optimize inventory levels and track branch-wise performance in real-time.',
        kpis: ['Sales per Store', 'Stock Turn Rate', 'Gross Margin']
    },
    {
        title: 'Logistics & Transport',
        desc: 'Monitor fleet efficiency and delivery turnaround times across the region.',
        kpis: ['Cost per Kilometer', 'On-time Delivery', 'Fuel Efficiency']
    },
    {
        title: 'Digital Lenders & MFIs',
        desc: 'Analyze portfolio at risk and collection efficiency with deep-dive drill downs.',
        kpis: ['NPL Ratio', 'Repayment Rate', 'AUM Growth']
    },
    {
        title: 'Wayhousing & Supply Chain',
        desc: 'Visibility into warehouse utilization and order fulfillment accuracy.',
        kpis: ['Utilization %', 'Picking Accuracy', 'Inbound Velocity']
    }
];

const securityFeatures = [
    { title: 'Read-Only Access', desc: 'Secure connection adapter ensures your database remains untouched.' },
    { title: 'Audit Trails', desc: 'Complete history of every query and data access event.' },
    { title: 'Multi-Tenant RBAC', desc: 'Role-based access with organization and branch level isolation.' },
    { title: 'Data Residency', desc: 'Configurable storage nodes to meet regional compliance needs.' }
];

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [activeTerminalLine, setActiveTerminalLine] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        const terminalInterval = setInterval(() => {
            setActiveTerminalLine(prev => (prev < 4 ? prev + 1 : 0));
        }, 3000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(terminalInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans mesh-bg transition-colors duration-500 overflow-hidden">
            {/* Cursor Glow Effect */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 0.06), transparent 80%)`
                }}
            />

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-background/60 border-b border-border/50 backdrop-blur-2xl shadow-lg'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative h-11 w-11 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
                                <BarChart3 className="h-6 w-6 text-black" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-foreground leading-none">ISN</span>
                            <span className="text-xs font-medium text-primary leading-none tracking-wide">ANALYTICA</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-medium">
                        <a href="#features" className="text-foreground-muted hover:text-foreground transition-colors duration-200 relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                        </a>
                        <a href="#sectors" className="text-foreground-muted hover:text-foreground transition-colors duration-200 relative group">
                            Sectors
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                        </a>
                        <a href="#security" className="text-foreground-muted hover:text-foreground transition-colors duration-200 relative group">
                            Security
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <div className="relative bg-gradient-to-r from-primary to-primary-dark text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
                                Get Started
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section ref={heroRef} className="relative pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-12">
                    {/* Animated gradient orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-70" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }} />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="space-y-8 animate-in" style={{ animationDelay: '0.1s' }}>
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm shadow-lg shadow-primary/5">
                                <Sparkles className="h-4 w-4 text-primary" strokeWidth={2} />
                                <span className="text-xs font-semibold text-primary tracking-wide">Tanzania's Decisions Intelligence Platform</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-foreground">
                                Data-driven
                                <br />
                                <span className="bg-gradient-to-r from-primary via-primary to-gray-400 bg-clip-text text-transparent">
                                    decisions.
                                </span>
                            </h1>

                            <p className="text-foreground-secondary text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                                Empower your enterprise with actionable intelligence. ISN Analytica transforms fragmented data into clear insights, forecasts, and confident decisions tailored for East African business realities.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                                <Link
                                    href="/register"
                                    className="group relative w-full sm:w-auto"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300" />
                                    <div className="relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-black font-bold rounded-2xl flex items-center justify-center gap-3 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-[1.02]">
                                        Start Your Journey
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                                    </div>
                                </Link>

                                <button className="group w-full sm:w-auto px-8 py-4 bg-surface/50 border border-border/50 text-foreground font-semibold rounded-2xl hover:border-primary/30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 hover:bg-surface/80">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Play className="relative h-5 w-5 fill-foreground-muted" />
                                    </div>
                                    View Sector Solutions
                                </button>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-6 pt-8">
                                {[
                                    { value: '50%+', label: 'Faster Time-to-Insight' },
                                    { value: '100%', label: 'Regional Localization' },
                                    { value: 'Read-only', label: 'Security Model' }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                                        <div className="text-xs text-foreground-muted font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Terminal */}
                        <div className="relative animate-in" style={{ animationDelay: '0.3s' }}>
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-gray-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                <div className="relative glass-card rounded-3xl border border-border/50 p-1 shadow-2xl backdrop-blur-xl overflow-hidden">
                                    <div className="bg-surface/80 rounded-2xl overflow-hidden border border-border/30">
                                        {/* Terminal Header */}
                                        <div className="px-5 py-4 bg-gradient-to-b from-surface-alt/50 to-transparent border-b border-border/30 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="h-3 w-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors cursor-pointer shadow-lg shadow-red-500/20" />
                                                <div className="h-3 w-3 rounded-full bg-amber-500/60 hover:bg-amber-500 transition-colors cursor-pointer shadow-lg shadow-amber-500/20" />
                                                <div className="h-3 w-3 rounded-full bg-primary/60 hover:bg-primary transition-colors cursor-pointer shadow-lg shadow-primary/20" />
                                            </div>
                                            <div className="flex items-center gap-2.5 text-xs font-semibold text-foreground-muted">
                                                <Terminal className="h-4 w-4" strokeWidth={2} />
                                                <span>isn-analytica.tz</span>
                                            </div>
                                        </div>

                                        {/* Terminal Content */}
                                        <div className="p-8 font-mono text-sm space-y-4 min-h-[280px] bg-gradient-to-b from-transparent to-surface-alt/20">
                                            {[
                                                { text: "> isn-analytica connect --pg-dar", type: "command" },
                                                { text: "✓ Secured connection to Dar es Salaam node.", type: "success" },
                                                { text: "> isn-analytica analyze --mode=decision", type: "command" },
                                                { text: "✓ 5 Anomalies detected in Wholesaler Portfolio.", type: "success" },
                                                { text: "> isn-analytica export --target=executive-pdf", type: "command" }
                                            ].map((line, i) => (
                                                <div
                                                    key={i}
                                                    className={`transition-all duration-700 ${i <= activeTerminalLine
                                                        ? 'opacity-100 translate-x-0'
                                                        : 'opacity-0 -translate-x-4'
                                                        } ${line.type === 'success'
                                                            ? 'text-primary font-semibold'
                                                            : 'text-foreground-secondary'
                                                        }`}
                                                >
                                                    {line.text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sector Solutions */}
                <section id="sectors" className="py-24 md:py-32 px-6 md:px-12 bg-surface-alt/30 border-y border-border/30 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                                Sector-Specific Intelligence
                            </h2>
                            <p className="text-foreground-secondary text-lg md:text-xl max-w-2xl mx-auto">
                                Predefined KPI templates and insight logic tailored for regional industries.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {sectors.map((sector, i) => (
                                <div key={i} className="glass-card p-8 rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-4">{sector.title}</h3>
                                    <p className="text-foreground-secondary text-sm mb-6">{sector.desc}</p>
                                    <div className="space-y-2">
                                        {sector.kpis.map((kpi, j) => (
                                            <div key={j} className="flex items-center gap-2 text-xs font-semibold text-primary">
                                                <CheckCircle2 className="h-3 w-3" />
                                                {kpi}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section id="security" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                                Enterprise-Grade
                                <br />
                                <span className="text-primary">Security.</span>
                            </h2>
                            <p className="text-lg text-foreground-secondary">
                                We understand data is your most valuable asset. ISN Analytica is built from the ground up to ensure zero data compromise.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {securityFeatures.map((f, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="font-bold text-foreground">{f.title}</div>
                                        <div className="text-sm text-foreground-muted">{f.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />
                            <div className="relative glass-card p-12 rounded-3xl border border-border/50 aspect-square flex items-center justify-center">
                                <ShieldCheck className="h-48 w-48 text-primary opacity-20" strokeWidth={1} />
                                <div className="absolute text-center space-y-2">
                                    <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <div className="text-2xl font-bold">100% Read-Only</div>
                                    <div className="text-sm text-foreground-muted">By architectural design</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 md:py-48 px-6 md:px-12 text-center relative overflow-hidden">
                    <div className="relative z-10 space-y-12">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9]">
                            Confidence in every
                            <br />
                            <span className="bg-gradient-to-r from-primary via-primary to-gray-400 bg-clip-text text-transparent">
                                decision.
                            </span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                            <Link
                                href="/register"
                                className="px-12 py-5 bg-gradient-to-r from-primary to-primary-dark text-black text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started Now
                            </Link>
                            <Link
                                href="/demo"
                                className="px-12 py-5 bg-surface/50 border border-border/50 text-foreground text-lg font-semibold rounded-2xl hover:border-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-surface/80"
                            >
                                Request Regional Demo
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-16 px-6 md:px-12 border-t border-border/30 bg-surface-alt/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <BarChart3 className="h-7 w-7 text-black" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-foreground">ISN</span>
                                <span className="text-xs font-medium text-primary tracking-wide">ANALYTICA</span>
                            </div>
                        </div>
                        <div className="text-sm text-foreground-muted">
                            Made with confidence in Tanzania.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
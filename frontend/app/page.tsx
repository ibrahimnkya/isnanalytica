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
import Footer from '@/components/Footer';
import SupportButton from '@/components/SupportButton';
import MegaMenu from '@/components/MegaMenu';

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

            {/* Navigation - Mega Menu */}
            <MegaMenu scrolled={scrolled} />

            <main>
                {/* Hero Section */}
                <section ref={heroRef} className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 md:px-12">
                    {/* Animated gradient orbs - hidden on mobile for performance */}
                    <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-50 sm:opacity-70" />
                    <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gray-500/10 rounded-full blur-3xl animate-float opacity-50 sm:opacity-70" style={{ animationDelay: '2s' }} />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
                        <div className="space-y-6 sm:space-y-8 animate-in text-center lg:text-left" style={{ animationDelay: '0.1s' }}>
                            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm shadow-lg shadow-primary/5">
                                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" strokeWidth={2} />
                                <span className="text-[10px] sm:text-xs font-semibold text-primary tracking-wide">Tanzania&apos;s Decision Intelligence Platform</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-foreground">
                                Data-driven
                                <br />
                                <span className="bg-gradient-to-r from-[#00FF41] via-[#00CC33] to-[#00AA2A] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                                    decisions.
                                </span>
                            </h1>

                            <p className="text-foreground-secondary text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Empower your enterprise with actionable intelligence. ISN Analytica transforms fragmented data into clear insights, forecasts, and confident decisions tailored for East African business realities.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                                <Link
                                    href="/register"
                                    className="group relative w-full sm:w-auto"
                                >
                                    <div className="absolute inset-0 bg-[#00FF41] rounded-xl sm:rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300" />
                                    <div className="relative px-6 sm:px-8 py-3.5 sm:py-4 bg-[#00FF41] text-black font-bold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 group-hover:shadow-2xl group-hover:shadow-[#00FF41]/40 transition-all duration-300 group-hover:scale-[1.02] text-sm sm:text-base">
                                        Start Your Journey
                                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                                    </div>
                                </Link>

                                <button className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-surface/50 border border-border/50 text-foreground font-semibold rounded-xl sm:rounded-2xl hover:border-primary/30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 hover:bg-surface/80 text-sm sm:text-base">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Play className="relative h-4 w-4 sm:h-5 sm:w-5 fill-foreground-muted" />
                                    </div>
                                    View Sector Solutions
                                </button>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                                {[
                                    { value: '50%+', label: 'Faster Insights' },
                                    { value: '100%', label: 'Localized' },
                                    { value: 'Read-only', label: 'Security' }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-0.5 sm:space-y-1">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                                        <div className="text-[10px] sm:text-xs text-foreground-muted font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Terminal */}
                        <div className="relative animate-in hidden sm:block" style={{ animationDelay: '0.3s' }}>
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-gray-500/20 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                <div className="relative glass-card rounded-2xl sm:rounded-3xl border border-border/50 p-0.5 sm:p-1 shadow-2xl backdrop-blur-xl overflow-hidden">
                                    <div className="bg-surface/80 rounded-xl sm:rounded-2xl overflow-hidden border border-border/30">
                                        {/* Terminal Header */}
                                        <div className="px-3 sm:px-5 py-3 sm:py-4 bg-gradient-to-b from-surface-alt/50 to-transparent border-b border-border/30 flex items-center justify-between">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]/60 hover:bg-[#FF5F56] transition-colors cursor-pointer shadow-lg shadow-[#FF5F56]/20" />
                                                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]/60 hover:bg-[#FFBD2E] transition-colors cursor-pointer shadow-lg shadow-[#FFBD2E]/20" />
                                                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#00FF41]/60 hover:bg-[#00FF41] transition-colors cursor-pointer shadow-lg shadow-[#00FF41]/20" />
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs font-semibold text-foreground-muted">
                                                <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                                                <span>isn-analytica.tz</span>
                                            </div>
                                        </div>

                                        {/* Terminal Content */}
                                        <div className="p-4 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm space-y-3 sm:space-y-4 min-h-[200px] sm:min-h-[280px] bg-gradient-to-b from-transparent to-surface-alt/20">
                                            {[
                                                { text: "> isn-analytica connect --pg-dar", type: "command" },
                                                { text: "✓ Secured connection to DSM node.", type: "success" },
                                                { text: "> isn-analytica analyze --mode=decision", type: "command" },
                                                { text: "✓ 5 Anomalies detected in Portfolio.", type: "success" },
                                                { text: "> isn-analytica export --target=pdf", type: "command" }
                                            ].map((line, i) => (
                                                <div
                                                    key={i}
                                                    className={`transition-all duration-700 break-all ${i <= activeTerminalLine
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
                <section id="sectors" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-surface-alt/30 border-y border-border/30 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground">
                                Sector-Specific Intelligence
                            </h2>
                            <p className="text-foreground-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
                                Predefined KPI templates and insight logic tailored for regional industries.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {sectors.map((sector, i) => (
                                <div key={i} className="glass-card p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-500">
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{sector.title}</h3>
                                    <p className="text-foreground-secondary text-sm mb-4 sm:mb-6">{sector.desc}</p>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {sector.kpis.map((kpi, j) => (
                                            <div key={j} className="flex items-center gap-2 text-xs font-semibold text-primary">
                                                <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
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
                <section id="security" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                        <div className="space-y-5 sm:space-y-8 text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground">
                                Enterprise-Grade
                                <br />
                                <span className="text-[#00FF41]">Security.</span>
                            </h2>
                            <p className="text-base sm:text-lg text-foreground-secondary max-w-xl mx-auto lg:mx-0">
                                We understand data is your most valuable asset. ISN Analytica is built from the ground up to ensure zero data compromise.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
                                {securityFeatures.map((f, i) => (
                                    <div key={i} className="space-y-1 sm:space-y-2">
                                        <div className="font-bold text-foreground text-sm sm:text-base">{f.title}</div>
                                        <div className="text-xs sm:text-sm text-foreground-muted">{f.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative order-first lg:order-last">
                            <div className="absolute inset-0 bg-[#00FF41]/5 rounded-2xl sm:rounded-3xl blur-3xl" />
                            <div className="relative glass-card p-8 sm:p-12 rounded-2xl sm:rounded-3xl border border-border/50 aspect-square flex items-center justify-center max-w-sm mx-auto lg:max-w-none">
                                <ShieldCheck className="h-32 w-32 sm:h-48 sm:w-48 text-[#00FF41] opacity-20" strokeWidth={1} />
                                <div className="absolute text-center space-y-1 sm:space-y-2">
                                    <Lock className="h-8 w-8 sm:h-12 sm:w-12 text-[#00FF41] mx-auto mb-2 sm:mb-4" />
                                    <div className="text-xl sm:text-2xl font-bold">100% Read-Only</div>
                                    <div className="text-xs sm:text-sm text-foreground-muted">By architectural design</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 text-center relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#00FF41]/5 rounded-full blur-3xl" />
                    
                    <div className="relative z-10 space-y-8 sm:space-y-12">
                        <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tight leading-[0.9]">
                            Confidence in every
                            <br />
                            <span className="bg-gradient-to-r from-[#00FF41] via-[#00CC33] to-[#00AA2A] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,65,0.3)]">
                                decision.
                            </span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-8 px-4 sm:px-0">
                            <Link
                                href="/register"
                                className="group relative text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-[#00FF41] rounded-xl sm:rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                                <div className="relative bg-[#00FF41] text-black px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl group-hover:shadow-2xl group-hover:shadow-[#00FF41]/40 transition-all">
                                    Get Started Now
                                </div>
                            </Link>
                            <Link
                                href="/demo"
                                className="px-8 sm:px-12 py-4 sm:py-5 bg-white/5 border border-white/10 text-foreground text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl hover:border-[#00FF41]/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                            >
                                Request Regional Demo
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <SupportButton />
        </div>
    );
}

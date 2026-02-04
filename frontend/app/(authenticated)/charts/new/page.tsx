'use client';

import { ChartBuilder } from '@/components/ChartBuilder';
import { ArrowLeft, Sparkles, BarChart3, Zap } from 'lucide-react';
import Link from 'next/link';

export default function NewChartPage() {
    return (
        <div className="space-y-8 animate-in pb-20">
            {/* Enhanced Header */}
            <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    {/* Back Button */}
                    <Link 
                        href="/charts"
                        className="group relative mt-1"
                    >
                        <div className="absolute -inset-2 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                        <div className="relative p-2.5 bg-surface border border-border rounded-xl hover:border-primary/30 transition-all">
                            <ArrowLeft className="h-5 w-5 text-foreground-secondary group-hover:text-primary transition-colors" strokeWidth={2} />
                        </div>
                    </Link>

                    {/* Title Section */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
                                <div className="relative h-12 w-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Sparkles className="h-6 w-6 text-black" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                                    Create New Chart
                                </h1>
                                <p className="text-foreground-secondary text-sm font-medium mt-1">
                                    Configure your data slice and build powerful visualizations
                                </p>
                            </div>
                        </div>

                        {/* Quick Info Banner */}
                        <div className="relative group max-w-3xl">
                            <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                            <div className="relative flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20 rounded-xl backdrop-blur-sm">
                                <div className="relative shrink-0 mt-0.5">
                                    <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                                    <div className="relative h-8 w-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border border-primary/20">
                                        <Zap className="h-4 w-4 text-primary" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-foreground mb-1">
                                        Build Interactive Visualizations
                                    </h3>
                                    <p className="text-sm text-foreground-secondary font-medium leading-relaxed">
                                        Select your data source, choose dimensions and metrics, then pick the perfect chart type to tell your data story.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Builder Component */}
            <div className="relative group">
                <div className="absolute -inset-px bg-gradient-to-b from-border/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative">
                    <ChartBuilder />
                </div>
            </div>
        </div>
    );
}
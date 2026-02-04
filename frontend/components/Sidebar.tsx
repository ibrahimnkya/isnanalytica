'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Database,
    LayoutDashboard,
    Plus,
    Compass,
    Bell,
    FileText,
    DatabaseBackup,
    Users,
    Briefcase,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/* ──────────────────────────────────────────────
   Nav data  (mirrors shadcn's items array pattern)
   ────────────────────────────────────────────── */
const navMain = [
    { name: 'Dashboards',   href: '/dashboards',    icon: LayoutDashboard },
    { name: 'Charts',       href: '/charts',        icon: BarChart3       },
    { name: 'Explore',      href: '/explore',       icon: Compass         },
    { name: 'Alerts',       href: '/alerts',        icon: Bell            },
    { name: 'Reports',      href: '/reports',       icon: FileText        },
    { name: 'Datasets',     href: '/datasets',      icon: Database        },
    { name: 'Data Sources', href: '/data-sources',  icon: DatabaseBackup  },
];

const navSettings = [
    { name: 'Organization', href: '/settings/organization', icon: Briefcase },
    { name: 'Team Members', href: '/settings/members',      icon: Users     },
];

/* ──────────────────────────────────────────────
   Sub-components  (mirrors shadcn's composable
   SidebarGroup / SidebarMenu / SidebarMenuButton)
   ────────────────────────────────────────────── */

/** Thin label above a nav group — matches SidebarGroupLabel */
function GroupLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-3 mb-1">
            <span className="text-[11px] font-semibold text-foreground-muted uppercase tracking-wider">
                {children}
            </span>
        </div>
    );
}

/** Single nav item — matches SidebarMenuButton with isActive */
function NavItem({ href, icon: Icon, name }: { href: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; name: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                // base — full-width, icon+label aligned, generous padding
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150',
                // inactive
                'text-foreground-muted hover:bg-surface hover:text-foreground',
                // active — soft tint, no border, no glow
                isActive && 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
            )}
        >
            <Icon
                className={cn(
                    'h-4 w-4 flex-shrink-0 transition-colors duration-150',
                    isActive ? 'text-primary' : 'text-foreground-muted group-hover:text-foreground',
                )}
                strokeWidth={isActive ? 2.2 : 1.8}
            />
            <span className="truncate">{name}</span>
        </Link>
    );
}

/* ──────────────────────────────────────────────
   Sidebar  (header / content / footer)
   ────────────────────────────────────────────── */
export function Sidebar() {
    return (
        <div className="flex h-full w-64 flex-col bg-background border-r border-border">

            {/* ── Header (sticky top) ── */}
            <div className="flex h-16 shrink-0 items-center px-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-4 w-4 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-base font-bold tracking-tight text-foreground">
                        ISN <span className="text-primary">Analytica</span>
                    </span>
                </div>
            </div>

            {/* ── Content (scrollable) ── */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">

                {/* Group 1 – Navigation */}
                <div>
                    <GroupLabel>Navigation</GroupLabel>
                    <div className="space-y-0.5">
                        {navMain.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>
                </div>

                {/* thin separator between groups */}
                <div className="mx-3 border-t border-border" />

                {/* Group 2 – Settings */}
                <div>
                    <GroupLabel>Settings</GroupLabel>
                    <div className="space-y-0.5">
                        {navSettings.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>
                </div>
            </nav>

            {/* ── Footer (sticky bottom) ── */}
            <div className="shrink-0 p-3 border-t border-border">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black hover:bg-primary-hover active:scale-[0.97] transition-all shadow-sm shadow-primary/20">
                    <Plus className="h-4 w-4" strokeWidth={2.2} />
                    New Chart
                </button>
            </div>
        </div>
    );
}
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    ChevronDown,
    LayoutDashboard,
    Database,
    LineChart,
    Bell,
    FileText,
    Shield,
    Zap,
    Globe,
    Lock,
    Users,
    Building2,
    Truck,
    Wallet,
    Package,
    ArrowRight,
    Sparkles,
    BookOpen,
    HelpCircle,
    MessageCircle,
    Menu,
    X,
    ChevronRight,
} from 'lucide-react';

const menuData = {
    features: {
        title: 'Features',
        sections: [
            {
                title: 'Analytics',
                items: [
                    { icon: LayoutDashboard, label: 'Dashboards', description: 'Custom analytics dashboards', href: '#features' },
                    { icon: LineChart, label: 'Charts', description: 'Advanced data visualizations', href: '#features' },
                    { icon: Database, label: 'Data Sources', description: 'Connect any database', href: '#features' },
                ],
            },
            {
                title: 'Automation',
                items: [
                    { icon: Bell, label: 'Alerts', description: 'Real-time notifications', href: '#features' },
                    { icon: FileText, label: 'Reports', description: 'Automated report generation', href: '#features' },
                    { icon: Zap, label: 'AI Insights', description: 'ML-powered analytics', href: '#features' },
                ],
            },
        ],
        featured: {
            title: 'New: AI-Powered Insights',
            description: 'Let our AI analyze your data and surface actionable insights automatically.',
            href: '#features',
            image: null,
        },
    },
    sectors: {
        title: 'Sectors',
        sections: [
            {
                title: 'Industries',
                items: [
                    { icon: Building2, label: 'Retail & Distribution', description: 'Inventory & sales analytics', href: '#sectors' },
                    { icon: Truck, label: 'Logistics & Transport', description: 'Fleet & delivery tracking', href: '#sectors' },
                    { icon: Wallet, label: 'Digital Lenders & MFIs', description: 'Portfolio risk analysis', href: '#sectors' },
                    { icon: Package, label: 'Warehousing', description: 'Supply chain visibility', href: '#sectors' },
                ],
            },
        ],
        featured: {
            title: 'Tanzania Focus',
            description: 'Purpose-built for East African enterprises with local compliance and data residency.',
            href: '#sectors',
            image: null,
        },
    },
    security: {
        title: 'Security',
        sections: [
            {
                title: 'Enterprise Security',
                items: [
                    { icon: Shield, label: 'Read-Only Access', description: 'Database protection', href: '#security' },
                    { icon: Lock, label: 'Multi-Tenant RBAC', description: 'Role-based access control', href: '#security' },
                    { icon: Globe, label: 'Data Residency', description: 'Regional compliance', href: '#security' },
                    { icon: Users, label: 'Audit Trails', description: 'Complete activity logging', href: '#security' },
                ],
            },
        ],
        featured: {
            title: 'SOC 2 Compliant',
            description: 'Enterprise-grade security with full audit trails and compliance certifications.',
            href: '#security',
            image: null,
        },
    },
    resources: {
        title: 'Resources',
        sections: [
            {
                title: 'Learn',
                items: [
                    { icon: BookOpen, label: 'Documentation', description: 'Guides and tutorials', href: '/docs' },
                    { icon: HelpCircle, label: 'Help Center', description: 'FAQs and support', href: '/help' },
                    { icon: MessageCircle, label: 'Community', description: 'Join the discussion', href: '/community' },
                ],
            },
        ],
        featured: null,
    },
};

type MenuKey = keyof typeof menuData;

interface MegaMenuProps {
    scrolled: boolean;
}

export default function MegaMenu({ scrolled }: MegaMenuProps) {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<MenuKey | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleMouseEnter = (key: MenuKey) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMenu(key);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    };

    const menuKeys = Object.keys(menuData) as MenuKey[];

    return (
        <nav
            ref={menuRef}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-background/80 border-b border-border/50 backdrop-blur-2xl shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 sm:gap-3 group cursor-pointer flex-shrink-0">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#00FF41]/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative h-9 w-9 sm:h-11 sm:w-11 bg-[#00FF41] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[#00FF41]/50 transition-all duration-300 group-hover:scale-105">
                            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground leading-none">ISN</span>
                        <span className="text-[10px] sm:text-xs font-medium text-[#00FF41] leading-none tracking-wide">ANALYTICA</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {menuKeys.map((key) => (
                        <div
                            key={key}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(key)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeMenu === key
                                    ? 'text-foreground bg-surface/50'
                                    : 'text-foreground-muted hover:text-foreground'
                                    }`}
                            >
                                {menuData[key].title}
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === key ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Desktop CTA Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200 px-4 py-2"
                    >
                        Sign In
                    </Link>
                    <Link href="/register" className="relative group">
                        <div className="absolute inset-0 bg-[#00FF41] rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                        <div className="relative bg-[#00FF41] text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#00FF41]/30 transition-all duration-300 group-hover:scale-105">
                            Get Started
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden relative h-10 w-10 flex items-center justify-center rounded-xl bg-surface/50 border border-border/50 text-foreground"
                    aria-label="Toggle menu"
                >
                    <Menu className={`h-5 w-5 transition-all duration-300 absolute ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                    <X className={`h-5 w-5 transition-all duration-300 absolute ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                </button>
            </div>

            {/* Desktop Mega Menu Dropdown */}
            {activeMenu && (
                <div
                    className="hidden lg:block absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-2xl"
                    onMouseEnter={() => handleMouseEnter(activeMenu)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="max-w-7xl mx-auto px-12 py-8">
                        <div className="grid grid-cols-12 gap-8">
                            {/* Menu Sections */}
                            <div className={`${menuData[activeMenu].featured ? 'col-span-8' : 'col-span-12'}`}>
                                <div className="grid grid-cols-2 gap-8">
                                    {menuData[activeMenu].sections.map((section, idx) => (
                                        <div key={idx}>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-4">
                                                {section.title}
                                            </h3>
                                            <div className="space-y-1">
                                                {section.items.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className="group flex items-start gap-4 p-3 rounded-xl hover:bg-surface/50 transition-all duration-200"
                                                        onClick={() => setActiveMenu(null)}
                                                    >
                                                        <div className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center group-hover:bg-[#00FF41]/10 transition-colors">
                                                            <item.icon className="h-5 w-5 text-foreground-muted group-hover:text-[#00FF41] transition-colors" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-foreground group-hover:text-[#00FF41] transition-colors">
                                                                {item.label}
                                                            </div>
                                                            <div className="text-sm text-foreground-muted">
                                                                {item.description}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Section */}
                            {menuData[activeMenu].featured && (
                                <div className="col-span-4">
                                    <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-[#00FF41]/10 to-transparent border border-[#00FF41]/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="h-4 w-4 text-[#00FF41]" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-[#00FF41]">Featured</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-foreground mb-2">
                                            {menuData[activeMenu].featured.title}
                                        </h4>
                                        <p className="text-sm text-foreground-muted mb-4">
                                            {menuData[activeMenu].featured.description}
                                        </p>
                                        <Link
                                            href={menuData[activeMenu].featured.href}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00FF41] hover:underline"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            Learn more <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 top-16 sm:top-20 bg-background/98 backdrop-blur-xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="h-full overflow-y-auto pb-20">
                    <div className="px-4 py-6 space-y-2">
                        {mobileSubmenu === null ? (
                            <>
                                {/* Main Menu Items */}
                                {menuKeys.map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setMobileSubmenu(key)}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-border/50 text-left"
                                    >
                                        <span className="font-semibold text-foreground">{menuData[key].title}</span>
                                        <ChevronRight className="h-5 w-5 text-foreground-muted" />
                                    </button>
                                ))}

                                {/* Mobile CTA */}
                                <div className="pt-6 space-y-3">
                                    <Link
                                        href="/login"
                                        className="block w-full py-3.5 text-center font-semibold text-foreground border border-border rounded-xl hover:bg-surface/50 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block w-full py-3.5 text-center font-bold text-black bg-[#00FF41] rounded-xl hover:bg-[#00CC33] transition-colors shadow-lg shadow-[#00FF41]/20"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Get Started Free
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Back Button */}
                                <button
                                    onClick={() => setMobileSubmenu(null)}
                                    className="flex items-center gap-2 p-3 text-foreground-muted hover:text-foreground transition-colors mb-4"
                                >
                                    <ChevronRight className="h-4 w-4 rotate-180" />
                                    <span className="text-sm font-medium">Back</span>
                                </button>

                                <h2 className="text-lg font-bold text-foreground px-3 mb-4">
                                    {menuData[mobileSubmenu].title}
                                </h2>

                                {/* Submenu Items */}
                                {menuData[mobileSubmenu].sections.map((section, idx) => (
                                    <div key={idx} className="mb-6">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted px-3 mb-3">
                                            {section.title}
                                        </h3>
                                        <div className="space-y-1">
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface/50 transition-colors"
                                                    onClick={() => {
                                                        setMobileMenuOpen(false);
                                                        setMobileSubmenu(null);
                                                    }}
                                                >
                                                    <div className="h-10 w-10 rounded-xl bg-surface/50 flex items-center justify-center">
                                                        <item.icon className="h-5 w-5 text-[#00FF41]" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-foreground">{item.label}</div>
                                                        <div className="text-sm text-foreground-muted">{item.description}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Featured Card */}
                                {menuData[mobileSubmenu].featured && (
                                    <div className="mx-3 p-5 rounded-2xl bg-gradient-to-br from-[#00FF41]/10 to-transparent border border-[#00FF41]/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="h-4 w-4 text-[#00FF41]" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-[#00FF41]">Featured</span>
                                        </div>
                                        <h4 className="font-bold text-foreground mb-2">
                                            {menuData[mobileSubmenu].featured.title}
                                        </h4>
                                        <p className="text-sm text-foreground-muted mb-3">
                                            {menuData[mobileSubmenu].featured.description}
                                        </p>
                                        <Link
                                            href={menuData[mobileSubmenu].featured.href}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00FF41]"
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setMobileSubmenu(null);
                                            }}
                                        >
                                            Learn more <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

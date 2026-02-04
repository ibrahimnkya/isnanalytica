'use client';

import Link from 'next/link';
import { BarChart3, Mail, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';

const footerLinks = {
    product: [
        { label: 'Features', href: '#features' },
        { label: 'Sectors', href: '#sectors' },
        { label: 'Security', href: '#security' },
        { label: 'Pricing', href: '/pricing' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ],
    resources: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Help Center', href: '/help' },
        { label: 'Status', href: '/status' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-[#1F1F1F]">
            {/* Subtle glow effect at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 h-px bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                {/* Main Footer Content */}
                <div className="py-10 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 space-y-5 sm:space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#00FF41] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#00FF41]/20">
                                <BarChart3 className="h-5 w-5 sm:h-7 sm:w-7 text-black" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl font-bold tracking-tight text-white leading-none">ISN</span>
                                <span className="text-[10px] sm:text-xs font-medium text-[#00FF41] tracking-wide">ANALYTICA</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                            Tanzania&apos;s premier decision intelligence platform. Transforming data into actionable insights for East African enterprises.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-2 sm:space-y-3">
                            <a href="mailto:hello@isnanalytica.co.tz" className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#00FF41] transition-colors">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">hello@isnanalytica.co.tz</span>
                            </a>
                            <a href="tel:+255123456789" className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#00FF41] transition-colors">
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                +255 123 456 789
                            </a>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                Dar es Salaam, Tanzania
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                            <a 
                                href="https://twitter.com/isnanalytica" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-gray-400 hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a 
                                href="https://linkedin.com/company/isnanalytica" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-gray-400 hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a 
                                href="https://github.com/isnanalytica" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-gray-400 hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid - 2 columns on mobile, 4 on larger screens */}
                    <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:col-span-2 lg:col-span-4 lg:grid-cols-4">
                        {/* Product Links */}
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Product</h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Company</h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div className="space-y-3 sm:space-y-4">
                            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-[#00FF41] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 sm:py-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                        <span>&copy; {new Date().getFullYear()} ISN Analytica.</span>
                        <span className="hidden sm:inline">|</span>
                        <span>Made with confidence in Tanzania.</span>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] rounded-full border border-[#1F1F1F]">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
                        <span className="text-[10px] sm:text-xs font-medium text-gray-400">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

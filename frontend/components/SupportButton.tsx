'use client';

import { useState } from 'react';
import { MessageCircle, X, Mail, Phone, HelpCircle, FileText, ChevronRight } from 'lucide-react';

const supportOptions = [
    {
        icon: HelpCircle,
        label: 'Help Center',
        description: 'Browse FAQs and guides',
        href: '/help',
    },
    {
        icon: FileText,
        label: 'Documentation',
        description: 'Technical documentation',
        href: '/docs',
    },
    {
        icon: Mail,
        label: 'Email Support',
        description: 'support@isnanalytica.co.tz',
        href: 'mailto:support@isnanalytica.co.tz',
    },
    {
        icon: Phone,
        label: 'Call Us',
        description: '+255 123 456 789',
        href: 'tel:+255123456789',
    },
];

export default function SupportButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Support Panel */}
            <div 
                className={`absolute bottom-20 right-0 w-80 bg-black border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 ${
                    isOpen 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
                {/* Header */}
                <div className="p-5 bg-gradient-to-r from-[#0A0A0A] to-[#111111] border-b border-[#1F1F1F]">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[#00FF41]/10 rounded-xl flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-[#00FF41]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Need Help?</h3>
                            <p className="text-xs text-gray-400">We&apos;re here to assist you</p>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="p-3 space-y-1">
                    {supportOptions.map((option) => (
                        <a
                            key={option.label}
                            href={option.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#111111] transition-colors duration-200 group"
                        >
                            <div className="h-10 w-10 bg-[#111111] group-hover:bg-[#1A1A1A] rounded-xl flex items-center justify-center transition-colors">
                                <option.icon className="h-5 w-5 text-gray-400 group-hover:text-[#00FF41] transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white">{option.label}</div>
                                <div className="text-xs text-gray-500 truncate">{option.description}</div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-[#00FF41] group-hover:translate-x-1 transition-all" />
                        </a>
                    ))}
                </div>

                {/* Live Chat CTA */}
                <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A]">
                    <button className="w-full py-3 px-4 bg-[#00FF41] hover:bg-[#00CC33] text-black font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00FF41]/20 hover:shadow-[#00FF41]/30">
                        <MessageCircle className="h-4 w-4" />
                        Start Live Chat
                    </button>
                    <p className="text-[10px] text-gray-500 text-center mt-2">Typically replies within 5 minutes</p>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label={isOpen ? 'Close support menu' : 'Open support menu'}
            >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-[#00FF41] rounded-full blur-xl transition-opacity duration-300 ${isOpen ? 'opacity-30' : 'opacity-20 group-hover:opacity-40'}`} />
                
                {/* Pulse ring when closed */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-[#00FF41]/20 animate-ping" />
                )}
                
                {/* Button background */}
                <div className={`relative h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isOpen 
                        ? 'bg-[#1A1A1A] shadow-black/50' 
                        : 'bg-[#00FF41] shadow-[#00FF41]/30 group-hover:shadow-[#00FF41]/50 group-hover:scale-110'
                }`}>
                    <MessageCircle 
                        className={`h-6 w-6 transition-all duration-300 absolute ${
                            isOpen 
                                ? 'opacity-0 rotate-90 scale-0' 
                                : 'opacity-100 rotate-0 scale-100 text-black'
                        }`} 
                    />
                    <X 
                        className={`h-6 w-6 transition-all duration-300 absolute ${
                            isOpen 
                                ? 'opacity-100 rotate-0 scale-100 text-white' 
                                : 'opacity-0 -rotate-90 scale-0'
                        }`} 
                    />
                </div>
            </button>
        </div>
    );
}

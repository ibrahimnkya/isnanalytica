'use client';

import { Bell, User, Search, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { SidebarTrigger } from './ui/sidebar';

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-background/50 backdrop-blur-md px-4 md:px-8 sticky top-0 z-50 transition-colors shrink-0">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <div className="relative hidden md:block w-72 lg:w-96">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-lg border-border bg-surface pl-10 text-sm py-2 text-foreground placeholder:text-zinc-500 transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <div className="flex items-center space-x-5">
                <button
                    onClick={toggleTheme}
                    className="rounded-full p-2 text-zinc-400 hover:bg-surface-hover hover:text-foreground transition-all flex items-center justify-center border border-transparent hover:border-border"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button className="rounded-full p-2 text-zinc-400 hover:bg-surface-hover hover:text-foreground transition-all">
                    <Bell className="h-5 w-5" />
                </button>
                <div className="h-9 w-9 rounded-full bg-surface border border-border flex items-center justify-center text-foreground cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all shadow-sm overflow-hidden">
                    <User className="h-5 w-5 text-zinc-400" />
                </div>
            </div>
        </header>
    );
}

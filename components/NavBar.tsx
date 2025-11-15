'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Sun, Moon } from 'lucide-react';
import { personalData } from '@/lib/data';
import { useTheme } from './ThemeProvider';

export default function NavBar() {
    const pathname = usePathname();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    };

    return (
        <nav className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 py-4 px-4 sm:px-8 lg:px-12 sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm z-40">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
                <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-normal text-lg shadow-sm group-hover:shadow-md transition-shadow">
                    锦
                </div>
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {personalData.name}
                </span>
            </Link>
            <div className="flex items-center space-x-6">
                <Link
                    href="/"
                    className={`flex items-center justify-center sm:justify-start text-sm font-medium transition-colors duration-200 p-2 rounded-lg ${isActive('/') && pathname !== '/notes'
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-zinc-800 shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}
                >
                    <Home className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Home</span>
                </Link>
                <Link
                    href="/notes"
                    className={`flex items-center justify-center sm:justify-start text-sm font-medium transition-colors duration-200 p-2 rounded-lg ${isActive('/notes')
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-zinc-800 shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}
                >
                    <BookOpen className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Notes</span>
                </Link>
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </nav>
    );
}

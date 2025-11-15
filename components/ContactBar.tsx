'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { personalData } from '@/lib/data';

export default function ContactBar() {
    const emailAddress = personalData.email.replace(' (at) ', '@');
    const [showCopied, setShowCopied] = useState(false);

    const handleCopyEmail = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(emailAddress);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    return (
        <>
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleCopyEmail}
                    className="group relative flex items-center p-2 transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    aria-label="Copy email"
                >
                    <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-400 flex-shrink-0 transition-all duration-300" />
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap opacity-0 w-0 ml-0 group-hover:opacity-100 group-hover:w-auto group-hover:ml-1 group-hover:px-2 transition-all duration-300 overflow-hidden">
                        {emailAddress}
                    </span>
                </button>
                <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex-shrink-0"
                >
                    <Github className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </a>
                <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex-shrink-0"
                >
                    <Linkedin className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </a>
            </div>
            {showCopied && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50 animate-fade-in">
                    Email copied
                </div>
            )}
        </>
    );
}

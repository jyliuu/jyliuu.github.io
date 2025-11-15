'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from './ThemeProvider';

export default function MarkdownContent({ content }: { content: string }) {
    const { isDarkMode } = useTheme();
    const codeStyle = isDarkMode ? vscDarkPlus : oneLight;

    return (
        <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={codeStyle}
                                language={language}
                                PreTag="div"
                                className="rounded-lg my-4"
                                customStyle={{
                                    margin: 0,
                                    padding: '1rem',
                                    background: isDarkMode ? '#18181b' : '#fafafa',
                                }}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={`${className} bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm`} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

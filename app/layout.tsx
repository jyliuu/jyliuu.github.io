import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jinyang Liu | Statistics & Machine Learning',
  description: 'Personal site and research notes of Jinyang Liu, PhD student in Statistics & Machine Learning at the University of Copenhagen.',
  openGraph: {
    title: 'Jinyang Liu | Statistics & Machine Learning',
    description: 'Research, notes, and CV from Jinyang Liu (刘锦阳 · embroidered sun), focusing on interpretable machine learning and statistics.',
    url: 'https://jyliuu.github.io/',
    siteName: 'Jinyang Liu',
    images: [
      {
        url: 'https://jyliuu.github.io/img/main.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinyang Liu | Statistics & Machine Learning',
    description: 'Research, notes, and CV from Jinyang Liu, focusing on interpretable machine learning and statistics.',
    images: ['https://jyliuu.github.io/img/main.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MPPP48WSKE"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MPPP48WSKE');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-zinc-900 font-sans transition-colors duration-500">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

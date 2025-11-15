import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getAllPostIds, getPostData } from '@/lib/posts';
import MarkdownContent from '@/components/MarkdownContent';
import NavBar from '@/components/NavBar';
import { personalData } from '@/lib/data';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = getPostData(id);

  return {
    title: `${post.title} | ${personalData.name}`,
    description: post.summary,
    openGraph: {
      title: `${post.title} | ${personalData.name}`,
      description: post.summary,
      url: `https://jyliuu.github.io/notes/${id}`,
      type: 'article',
      authors: [personalData.name],
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${personalData.name}`,
      description: post.summary,
    },
  };
}

function parseDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let post;
  try {
    post = getPostData(id);
  } catch (error) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary || post.title,
    "author": {
      "@type": "Person",
      "name": personalData.name,
      "url": "https://jyliuu.github.io/"
    },
    "datePublished": parseDate(post.date),
    "url": `https://jyliuu.github.io/notes/${post.id}`,
    "keywords": post.tags?.join(', ') || '',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavBar />
      <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
        <article className="py-8" itemScope itemType="https://schema.org/BlogPosting">
          <Link
            href="/notes"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to all posts
          </Link>

          <header className="border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-8">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight" itemProp="headline">
              {post.title}
            </h1>
            <div className="flex items-center text-md text-zinc-500 dark:text-zinc-400 mt-2">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={parseDate(post.date)} itemProp="datePublished">
                Published on {post.date}
              </time>
              <span className="mx-3">•</span>
              <div className="flex space-x-2" itemProp="keywords">
                {post.tags.map(tag => (
                  <span key={tag} className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div itemProp="articleBody">
            <MarkdownContent content={post.content} />
          </div>

          <Link
            href="/notes"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-12 font-medium border-t border-zinc-200 dark:border-zinc-700 pt-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Return to Notes
          </Link>
        </article>

        <footer className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500 dark:text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

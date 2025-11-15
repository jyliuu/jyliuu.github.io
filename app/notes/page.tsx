import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import NavBar from '@/components/NavBar';
import { personalData } from '@/lib/data';

export const metadata = {
  title: `Notes | ${personalData.name}`,
  description: `Research notes and blog posts by ${personalData.name}`,
};

export default function NotesPage() {
  const posts = getAllPosts();

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
        <div className="py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-8 gap-4">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
              Notes
            </h1>
          </div>
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/notes/${post.id}`} className="block">
                <article className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 transition-shadow duration-300 hover:shadow-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-3">•</span>
                    <div className="flex space-x-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  <button
                    className="mt-3 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm"
                    aria-label={`Read post: ${post.title}`}
                  >
                    Read more &rarr;
                  </button>
                </article>
              </Link>
            ))}
          </div>
        </div>
        <footer className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500 dark:text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

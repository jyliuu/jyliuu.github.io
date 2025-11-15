import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Post not found</h1>
        <Link href="/notes" className="text-blue-600 dark:text-blue-400 hover:underline">
          Return to Notes
        </Link>
      </div>
    </div>
  );
}

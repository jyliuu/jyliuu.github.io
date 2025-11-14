import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  BookOpen,
  Mail,
  Linkedin,
  Github,
  Award,
  BookA,
  Briefcase,
  Sun,
  Moon,
  GraduationCap,
  Zap,
  Home,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { personalData, education, research, skills } from './data.js';

// Simple frontmatter parser for browser (replaces gray-matter)
const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatter, markdownContent] = match;
  const data = {};

  // Simple YAML parser for basic key-value pairs
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Handle arrays (simple case: ['item1', 'item2'])
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^['"]|['"]$/g, ''));
      }

      data[key] = value;
    }
  });

  return { data, content: markdownContent };
};

// --- Utility Component for Simple Content Rendering ---

const MarkdownContent = ({ content, isDarkMode }) => {
  const codeStyle = isDarkMode ? vscDarkPlus : oneLight;

  return (
    <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
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
};


// --- CV Page Components (Refactored) ---

const ContactBar = ({ data, isDarkMode }) => {
  const emailAddress = data.email.replace(' (at) ', '@');
  const [copied, setCopied] = React.useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleEmailClick}
          aria-label="Copy Email"
          className="group relative flex items-center overflow-hidden transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
        >
          <div className="p-2 flex items-center">
            <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
            <span className="ml-0 w-0 opacity-0 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
              {emailAddress}
            </span>
          </div>
        </button>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex-shrink-0"
        >
          <Github className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </a>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-2 transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex-shrink-0"
        >
          <Linkedin className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </a>
      </div>
      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50 animate-fade-in">
          Email copied!
        </div>
      )}
    </>
  );
};

// Added optional `noBorder` prop to control the top line
const Section = ({ title, icon: Icon, children, noBorder = false }) => (
  <section className={`mt-10 pt-4 ${noBorder ? '' : 'border-t border-zinc-200 dark:border-zinc-700'}`}>
    <h2 className="flex items-center text-xl font-bold tracking-tight text-blue-700 dark:text-blue-400 mb-4">
      {Icon && <Icon className="w-6 h-6 mr-3" />}
      {title}
    </h2>
    <div className="space-y-6">
      {children}
    </div>
  </section>
);

const ResearchItem = ({ item }) => (
  <article className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800 transition-shadow hover:shadow-lg">
    <div className="flex items-start justify-between">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
      <div className="flex-shrink-0 flex space-x-2 ml-4">
        {item.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
          >
            {link.type}
          </a>
        ))}
      </div>
    </div>
    <p className="text-sm italic text-zinc-600 dark:text-zinc-400 mb-2">
      {item.authors} ({item.year})
    </p>
    {item.journal && (
      <p className="text-xs italic text-zinc-500 dark:text-zinc-500 mb-3">
        {item.journal}
      </p>
    )}
    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
      {item.summary}
    </p>
  </article>
);

const EducationItem = ({ item }) => (
  <div className="relative pl-6">
    <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 ring-4 ring-white dark:ring-zinc-900"></div>
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.degree}</h3>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 flex-shrink-0 ml-4">{item.dates}</span>
    </div>
    <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.institution}</p>
    <p className="text-sm mt-1 text-zinc-600 dark:text-zinc-400">{item.details}</p>
  </div>
);

// --- NEW Skills Grid Component ---
const ResearchSkillsGrid = ({ skills }) => {
  const researchSkills = skills.find(s => s.category === 'Research Interests')?.items || [];
  const toolsAndLibraries = skills.find(s => s.category === 'Tools & Libraries')?.items || [];

  const Card = ({ title, items, icon: Icon, borderColor, textColor }) => (
    <div className={`p-6 rounded-xl border-t-4 ${borderColor} bg-zinc-50 dark:bg-zinc-800 shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <h4 className={`flex items-center text-xl font-bold mb-3 ${textColor}`}>
        <Icon className="w-5 h-5 mr-3" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 whitespace-nowrap shadow-sm">
            {item.replace(/ *\([^)]*\) */g, "")} {/* Removes parenthetical context for cleaner tags */}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card
        title="Research Interests"
        items={researchSkills}
        icon={BookA}
        borderColor="border-blue-500 dark:border-blue-400"
        textColor="text-blue-700 dark:text-blue-400"
      />
      <Card
        title="Toolbox"
        items={toolsAndLibraries}
        icon={Briefcase}
        borderColor="border-purple-500 dark:border-purple-400"
        textColor="text-purple-700 dark:text-purple-400"
      />
    </div>
  );
};


const CVContent = ({ isDarkMode }) => (
  <>
    {/* Header Section (CV Specific) */}
    <header className="py-8 border-b border-zinc-200 dark:border-zinc-700">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
        {personalData.name}
        <span className="ml-3 text-xl sm:text-2xl font-normal text-zinc-600 dark:text-zinc-400">
          ({personalData.otherName} · <span className="italic text-base sm:text-lg">lit. embroidered sun</span>)
        </span>
      </h1>
      <h2 className="mt-2 text-xl font-medium text-blue-700 dark:text-blue-400">
        {personalData.title} | {personalData.institution}
      </h2>
      <div className="mt-4">
        <ContactBar data={personalData} isDarkMode={isDarkMode} />
      </div>
    </header>

    {/* Profile and About Content (No Header/Section component, immediately below title) */}
    <div className="mt-10 mb-10">
      <div className="flex flex-col md:flex-row items-start md:space-x-8">
        {/* Image */}
        {personalData.imageUrl && (
          <img
            src={personalData.imageUrl}
            alt={`${personalData.name} Profile`}
            className="w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover mb-4 md:mb-0 shadow-lg flex-shrink-0"
            // Fallback for broken images
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/4B5563/FFFFFF?text=Photo"; }}
          />
        )}
        {/* About Text */}
        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-justify">
          {personalData.about}
        </p>
      </div>
    </div>

    {/* Preprints & Publications Section */}
    <Section title="Preprints & Publications" icon={Award}>
      {research.map((item, index) => (
        <ResearchItem key={index} item={item} />
      ))}
    </Section>

    {/* Education Section */}
    <Section title="Education" icon={GraduationCap}>
      <div className="space-y-6">
        {education.map((item, index) => (
          <EducationItem key={index} item={item} />
        ))}
      </div>
    </Section>

    {/* Technical Skills Section */}
    <Section title="Technical" icon={Zap}>
      <ResearchSkillsGrid skills={skills} />
    </Section>
  </>
);


// --- Blog Page Components ---

const PostSummary = ({ post, navigate }) => (
  <article className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 transition-shadow duration-300 hover:shadow-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
    onClick={() => navigate({ page: 'POST', postId: post.id })}
  >
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
);

const BlogPost = ({ post, navigate, isDarkMode }) => (
  <div className="py-8">
    <button
      onClick={() => navigate({ page: 'BLOG' })}
      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6 font-medium"
    >
      <ArrowLeft className="w-5 h-5 mr-2" /> Back to all posts
    </button>

    <header className="border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-8">
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
        {post.title}
      </h1>
      <div className="flex items-center text-md text-zinc-500 dark:text-zinc-400 mt-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Published on {post.date}</span>
        <span className="mx-3">•</span>
        <div className="flex space-x-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>

    <MarkdownContent content={post.content} isDarkMode={isDarkMode} />

    <button
      onClick={() => navigate({ page: 'BLOG' })}
      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-12 font-medium border-t border-zinc-200 dark:border-zinc-700 pt-4"
    >
      <ArrowLeft className="w-5 h-5 mr-2" /> Return to Blog
    </button>
  </div>
);

const BlogPageContent = ({ navigate, blogPosts }) => {
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  const hasPosts = blogPosts && blogPosts.length > 0;

  const sortedPosts = hasPosts
    ? [...blogPosts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    })
    : [];

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
          Notes
        </h1>
        {hasPosts && (
          <div className="flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="hidden sm:inline">Sort by</span>
            <label className="sm:hidden text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              Sort
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {hasPosts ? (
          sortedPosts.map((post) => (
            <PostSummary key={post.id} post={post} navigate={navigate} />
          ))
        ) : (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
            Loading posts...
          </div>
        )}
      </div>
    </div>
  );
};


// --- Navigation Bar Component ---
const Logo = ({ navigate }) => (
  <button
    onClick={() => navigate({ page: 'CV' })}
    className="flex items-center space-x-2 hover:opacity-80 transition-opacity group"
  >
    <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-normal text-lg shadow-sm group-hover:shadow-md transition-shadow">
      锦
    </div>
    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {personalData.name}
    </span>
  </button>
);

const NavBar = ({ currentPage, navigate, toggleDarkMode, isDarkMode }) => (
  <nav className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 py-4 px-4 sm:px-8 lg:px-12 sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm z-40">
    <Logo navigate={navigate} />
    <div className="flex items-center space-x-6">
      <NavButton
        page="CV"
        current={currentPage === 'CV'}
        icon={Home}
        label="Home"
        navigate={navigate}
      />
      <NavButton
        page="BLOG"
        current={currentPage === 'BLOG' || currentPage === 'POST'}
        icon={BookOpen}
        label="Notes"
        navigate={navigate}
      />
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

const NavButton = ({ page, current, icon: Icon, label, navigate }) => {
  const baseClasses = "flex items-center justify-center sm:justify-start text-sm font-medium transition-colors duration-200 p-2 rounded-lg";
  const activeClasses = "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-zinc-800 shadow-sm";
  const inactiveClasses = "text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800";

  return (
    <button
      onClick={() => navigate({ page })}
      className={`${baseClasses} ${current ? activeClasses : inactiveClasses}`}
    >
      <Icon className="w-4 h-4 sm:mr-2" />
      <span className="hidden sm:inline sm:ml-0">{label}</span>
    </button>
  );
};


// --- Main App Component ---

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Initialize state from hash if present
  const getInitialPage = () => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('post/')) {
      const postId = hash.split('/')[1];
      return { page: 'POST', postId };
    } else if (hash === 'notes') {
      return { page: 'BLOG', postId: null };
    }
    return { page: 'CV', postId: null };
  };
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postFiles = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default' });
      const posts = await Promise.all(
        Object.entries(postFiles).map(async ([path, resolver]) => {
          const fileContent = await resolver();
          const { data, content } = parseFrontmatter(fileContent);
          return { ...data, content, id: data.id || path.slice(path.lastIndexOf('/') + 1, -3) };
        })
      );
      setBlogPosts(posts);
    };
    fetchPosts();
  }, []);

  // Handle routing based on URL hash for GitHub Pages compatibility
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('post/')) {
      const postId = hash.split('/')[1];
      setCurrentPage({ page: 'POST', postId });
    } else if (hash === 'notes') {
      setCurrentPage({ page: 'BLOG', postId: null });
    } else {
      setCurrentPage({ page: 'CV', postId: null });
    }
  }, []);

  // Check hash after blogPosts are loaded (handles refresh on post page)
  useEffect(() => {
    if (blogPosts.length > 0) {
      handleHashChange();
    }
  }, [blogPosts, handleHashChange]);

  // Update URL hash when page changes (enables link sharing/back button)
  useEffect(() => {
    const hashMap = {
      'CV': '',
      'BLOG': '#notes',
      'POST': `#post/${currentPage.postId}`,
    };
    const expectedHash = hashMap[currentPage.page] || '';
    // Only update hash if it's different to avoid infinite loops
    if (window.location.hash !== expectedHash) {
      window.location.hash = expectedHash;
    }
  }, [currentPage]);

  // Set up hash listener on mount
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);


  // Theme logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches && savedTheme === null) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const navigate = useCallback((target) => {
    setCurrentPage(target);
  }, []);

  // Render Content based on route
  let contentComponent;
  if (currentPage.page === 'BLOG') {
    contentComponent = <BlogPageContent navigate={navigate} blogPosts={blogPosts} />;
  } else if (currentPage.page === 'POST' && currentPage.postId) {
    const post = blogPosts.find(p => p.id === currentPage.postId);
    if (post) {
      contentComponent = <BlogPost post={post} navigate={navigate} isDarkMode={isDarkMode} />;
    } else {
      contentComponent = <div className="text-center py-20 text-xl text-red-500">Post not found.</div>;
    }
  } else {
    contentComponent = <CVContent isDarkMode={isDarkMode} />;
  }


  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 font-sans transition-colors duration-500">
      <style>{`
        /* Set Inter as primary font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        /* Reset and enforce professional code aesthetic */
        pre {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
      `}</style>

      <NavBar
        currentPage={currentPage.page}
        navigate={navigate}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
        {contentComponent}

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500 dark:text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

import { personalData, education, research, skills } from '@/lib/data';
import { Mail, Linkedin, Github, Award, GraduationCap, Zap, BookA, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import NavBar from '@/components/NavBar';

function ContactBar() {
  const emailAddress = personalData.email.replace(' (at) ', '@');
  
  return (
    <div className="flex items-center space-x-4">
      <a
        href={`mailto:${emailAddress}`}
        className="p-2 transition-all duration-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex-shrink-0"
        aria-label="Email"
      >
        <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
      </a>
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
  );
}

function Section({ title, icon: Icon, children, noBorder = false }: { title: string; icon: any; children: React.ReactNode; noBorder?: boolean }) {
  return (
    <section className={`mt-10 pt-4 ${noBorder ? '' : 'border-t border-zinc-200 dark:border-zinc-700'}`}>
      <h2 className="flex items-center text-xl font-bold tracking-tight text-blue-700 dark:text-blue-400 mb-4">
        <Icon className="w-6 h-6 mr-3" />
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

function ResearchItem({ item }: { item: typeof research[0] }) {
  return (
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
}

function EducationItem({ item }: { item: typeof education[0] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 ring-4 ring-white dark:ring-zinc-900"></div>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.degree}</h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 flex-shrink-0 ml-4">{item.dates}</span>
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.institution}</p>
      <div className="text-sm mt-1 text-zinc-600 dark:text-zinc-400 prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }: any) => (
              <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {item.details}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function ResearchSkillsGrid() {
  const researchSkills = skills.find(s => s.category === 'Research Interests')?.items || [];
  const toolsAndLibraries = skills.find(s => s.category === 'Tools & Libraries')?.items || [];

  const Card = ({ title, items, icon: Icon, borderColor, textColor }: { title: string; items: string[]; icon: any; borderColor: string; textColor: string }) => (
    <div className={`p-6 rounded-xl border-t-4 ${borderColor} bg-zinc-50 dark:bg-zinc-800 shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <h4 className={`flex items-center text-xl font-bold mb-3 ${textColor}`}>
        <Icon className="w-5 h-5 mr-3" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 whitespace-nowrap shadow-sm">
            {item.replace(/ *\([^)]*\) */g, "")}
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
}

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
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
            <ContactBar />
          </div>
        </header>

        <div className="mt-10 mb-10">
          <div className="flex flex-col md:flex-row items-start md:space-x-8">
            {personalData.imageUrl && (
              <img
                src={personalData.imageUrl}
                alt={`${personalData.name} Profile`}
                className="w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover mb-4 md:mb-0 shadow-lg flex-shrink-0"
              />
            )}
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-justify">
              {personalData.about}
            </p>
          </div>
        </div>

        <Section title="Preprints & Publications" icon={Award}>
          {research.map((item, index) => (
            <ResearchItem key={index} item={item} />
          ))}
        </Section>

        <Section title="Education" icon={GraduationCap}>
          <div className="space-y-6">
            {education.map((item, index) => (
              <EducationItem key={index} item={item} />
            ))}
          </div>
        </Section>

        <Section title="Technical" icon={Zap}>
          <ResearchSkillsGrid />
        </Section>

        <footer className="mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500 dark:text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

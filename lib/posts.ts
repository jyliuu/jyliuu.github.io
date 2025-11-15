import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
    id: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

function findPostFileById(id: string): string | null {
    const fileNames = fs.readdirSync(postsDirectory);
    for (const name of fileNames) {
        if (!name.endsWith('.md')) continue;
        const fullPath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        const postId = data.id || name.replace(/\.md$/, '');
        if (postId === id) {
            return name;
        }
    }
    return null;
}

export function getAllPostIds(): string[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter(name => name.endsWith('.md'))
        .map(name => {
            const fullPath = path.join(postsDirectory, name);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);
            return data.id || name.replace(/\.md$/, '');
        });
}

export function getPostData(id: string): Post {
    const fileName = findPostFileById(id);
    if (!fileName) {
        throw new Error(`Post with id "${id}" not found`);
    }
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        id: data.id || id,
        title: data.title,
        date: data.date,
        summary: data.summary,
        tags: data.tags || [],
        content,
    };
}

export function getAllPosts(): Post[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter(name => name.endsWith('.md'))
        .map(name => {
            const fullPath = path.join(postsDirectory, name);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            return {
                id: data.id || name.replace(/\.md$/, ''),
                title: data.title,
                date: data.date,
                summary: data.summary,
                tags: data.tags || [],
                content,
            };
        })
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        });
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/blog/mdx-components';

export interface BlogPost {
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  category: 'AI Girlfriend Guides' | 'Comparisons & Alternatives' | 'AI Companion Tips';
  excerpt: string;
  datePublished: string;
  dateModified: string | null;
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[] | null;
  ctaHeading: string | null;
  ctaText: string | null;
  ctaButtonText: string | null;
  ctaButtonUrl: string | null;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return data as BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content: mdxSource } = matter(raw);
  const frontmatter = data as BlogPost;

  const { content } = await compileMDX({
    source: mdxSource,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  return { ...frontmatter, content };
}

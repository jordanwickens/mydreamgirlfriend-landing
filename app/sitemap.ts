import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getComparisonPagesLocal } from '@/lib/comparison-data';

const BASE = 'https://mydreamgirlfriend.ai';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/features`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/ai-chat`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/ai-girlfriend-images`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/voice-calls`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
{ url: `${BASE}/features/character-creator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/roleplay`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/personality-customization`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/best-ai-girlfriend-apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/complaints`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/contact-us`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  // Dynamic CMS-driven pages
  let blogPages: MetadataRoute.Sitemap = [];
  let comparePages: MetadataRoute.Sitemap = [];

  const posts = await getBlogPosts();
  blogPages = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.dateModified || post.datePublished || now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparisons = getComparisonPagesLocal();
  comparePages = comparisons.map((page) => ({
    url: `${BASE}/compare/${page.slug}`,
    lastModified: page.dateModified || page.datePublished || now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...comparePages, ...blogPages];
}

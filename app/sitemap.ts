import type { MetadataRoute } from 'next';

const BASE = 'https://mydreamgirlfriend.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/features`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/ai-chat`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/ai-girlfriend-images`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/voice-calls`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/relationship-stages`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/character-creator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/roleplay`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/features/personality-customization`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/best-ai-girlfriend-apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/candy-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/replika`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/character-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog/what-is-an-ai-girlfriend`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/how-to-create-ai-girlfriend`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/best-free-ai-girlfriend-apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/ai-girlfriend-vs-real-girlfriend`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/best-nsfw-ai-chatbots`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return staticPages;
}

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydreamgirlfriend.ai';

export const metadata = generateSEO({
  title: 'Blog — AI Girlfriend Guides, Tips & News | MyDreamGirlfriend',
  description: 'Guides, tips, comparisons and news about AI girlfriends and companions. Learn how to get the most from your AI relationship.',
  path: '/blog',
});

const posts = [
  {
    slug: 'what-is-an-ai-girlfriend',
    title: 'What Is an AI Girlfriend? The Complete Guide',
    excerpt: 'Everything you need to know about AI girlfriends — the technology, the features, and what to actually expect.',
    category: 'AI Girlfriend Guides',
    date: 'March 2026',
  },
  {
    slug: 'how-to-create-ai-girlfriend',
    title: 'How to Create Your Own AI Girlfriend (Step-by-Step)',
    excerpt: 'A step-by-step guide to building, customizing, and chatting with your perfect AI companion.',
    category: 'AI Girlfriend Guides',
    date: 'March 2026',
  },
  {
    slug: 'best-free-ai-girlfriend-apps',
    title: 'Best Free AI Girlfriend Apps in 2026 (No Credit Card)',
    excerpt: 'The best free AI girlfriend apps you can try right now — no payment required. We tested them all.',
    category: 'Comparisons & Alternatives',
    date: 'March 2026',
  },
  {
    slug: 'ai-girlfriend-vs-real-girlfriend',
    title: 'AI Girlfriend vs Real Girlfriend — The Honest Truth',
    excerpt: 'What\'s different, what\'s surprisingly similar, and why it\'s not the competition you think.',
    category: 'AI Companion Tips',
    date: 'March 2026',
  },
  {
    slug: 'best-nsfw-ai-chatbots',
    title: 'Best NSFW AI Chatbots in 2026 (Tested & Ranked)',
    excerpt: 'The best uncensored AI chatbots ranked. We tested them all — here\'s what\'s actually worth it.',
    category: 'Comparisons & Alternatives',
    date: 'March 2026',
  },
];

const categories = ['All', 'AI Girlfriend Guides', 'Comparisons & Alternatives', 'AI Companion Tips'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="px-4 mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              MyDreamGirlfriend <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Guides, tips, comparisons, and everything you need to know about AI girlfriends and companions.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 mb-12">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-colors ${
                  cat === 'All'
                    ? 'bg-gradient-accent text-white font-semibold'
                    : 'bg-surface border border-border text-muted hover:text-white hover:border-accent-purple/50'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Post Grid */}
        <section className="px-4 mb-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent-purple/50 transition-colors flex flex-col"
              >
                <div className="text-xs text-accent-purple font-medium mb-2">{post.category}</div>
                <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-muted mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{post.date}</span>
                  <ArrowRight className="w-4 h-4 text-muted" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-muted mb-6">Build your dream AI girlfriend today. Free to start.</p>
            <a
              href={`${APP}/signup`}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

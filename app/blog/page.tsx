import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { generateSEO } from '@/lib/seo';
import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { appLinks } from '@/lib/links';

export const metadata = generateSEO({
  title: 'Blog — AI Girlfriend Guides, Tips & News | MyDreamGirlfriend',
  description: 'Guides, tips, comparisons and news about AI girlfriends and companions. Learn how to get the most from your AI relationship.',
  path: '/blog',
});

const categories = ['All', 'AI Girlfriend Guides', 'Comparisons & Alternatives', 'AI Companion Tips'];

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
            {posts.map((post) => {
              const date = new Date(post.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              });
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-accent-purple/50 transition-colors flex flex-col"
                >
                  <div className="text-xs text-accent-purple font-medium mb-2">{post.category}</div>
                  <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                  <p className="text-sm text-muted mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{date}</span>
                    <ArrowRight className="w-4 h-4 text-muted" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-muted mb-6">Build your dream AI girlfriend today. Free to start.</p>
            <a
              href={appLinks.signup}
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

import { notFound } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQ from '@/components/shared/FAQ';
import RichTextRenderer from '@/components/shared/RichTextRenderer';
import { generateSEO, generateArticleSchema, generateFAQSchema } from '@/lib/seo';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/strapi';
import Link from 'next/link';
import type { Metadata } from 'next';
import { appLinks } from '@/lib/links';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return generateSEO({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified || undefined,
  });

  const published = new Date(post.datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {post.faqs?.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(post.faqs)) }}
          />
        )}

        {/* Article Header */}
        <section className="px-4 mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm text-accent-purple font-medium mb-3">{post.category}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-sm text-muted/60">
              Published {published} &middot; MyDreamGirlfriend Team
            </p>
          </div>
        </section>

        {/* Article Content */}
        <article className="px-4">
          <div className="max-w-3xl mx-auto">
            <RichTextRenderer content={post.body} />
          </div>
        </article>

        {/* FAQ Section */}
        {post.faqs?.length > 0 && (
          <section className="py-16 px-4 bg-surface/50 mt-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently <span className="text-gradient">Asked</span>
              </h2>
              <FAQ faqs={post.faqs} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">
              {post.ctaHeading || 'Ready to Get Started?'}
            </h2>
            <p className="text-muted mb-6">
              {post.ctaText || 'Build your dream AI girlfriend today. Free to start.'}
            </p>
            <a
              href={post.ctaButtonUrl || appLinks.signup}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              {post.ctaButtonText || 'Get Started Free'}
            </a>
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedSlugs && post.relatedSlugs.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {post.relatedSlugs.map((relatedSlug) => (
                  <Link
                    key={relatedSlug}
                    href={`/blog/${relatedSlug}`}
                    className="bg-card border border-border rounded-2xl p-6 hover:border-accent-purple/50 transition-colors"
                  >
                    <h3 className="text-sm font-bold">{relatedSlug.replace(/-/g, ' ')}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

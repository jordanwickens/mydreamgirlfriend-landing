import { notFound } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQ from '@/components/shared/FAQ';
import { generateSEO, generateArticleSchema, generateFAQSchema } from '@/lib/seo';
import { getComparisonPagesLocal, getComparisonPageBySlugLocal } from '@/lib/comparison-data';
import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';

const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydreamgirlfriend.ai';

export function generateStaticParams() {
  return getComparisonPagesLocal().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparisonPageBySlugLocal(slug);
  if (!data) return {};
  return generateSEO({
    title: data.title,
    description: data.metaDescription || '',
    path: `/compare/${data.slug}`,
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getComparisonPageBySlugLocal(slug);
  if (!data) notFound();

  const allPages = getComparisonPagesLocal();
  const otherPages = allPages.filter((c) => c.slug !== data.slug);

  const lastUpdated = data.dateModified || data.datePublished;
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'March 2026';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateArticleSchema({
              title: data.h1,
              description: data.metaDescription || '',
              path: `/compare/${data.slug}`,
              datePublished: data.datePublished || '2026-03-01',
            })),
          }}
        />
        {data.faqs?.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(data.faqs)) }}
          />
        )}

        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{data.h1}</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">{data.intro}</p>
            <p className="text-sm text-muted/60 mt-4">Last updated: {formattedDate}</p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="px-4 mb-16">
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">Feature-by-Feature Comparison</h2>
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold text-accent-purple">MyDreamGirlfriend</th>
                  <th className="px-4 py-3 font-semibold">{data.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-start gap-2">
                        {row.winner === 'us' || row.winner === 'tie' ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-4" />
                        )}
                        <span className={row.winner === 'us' ? 'text-accent-purple font-medium' : 'text-muted'}>{row.us}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-start gap-2">
                        {row.winner === 'them' || row.winner === 'tie' ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <span className="w-4" />
                        )}
                        <span className={row.winner === 'them' ? 'text-white font-medium' : 'text-muted'}>{row.them}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verdict */}
        <section className="px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-muted leading-relaxed">{data.verdict}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-accent-purple/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Try MyDreamGirlfriend Free</h2>
            <p className="text-muted mb-6">See the difference for yourself. No credit card required.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${APP}/build`}
                className="inline-block px-6 py-3 rounded-full bg-gradient-accent text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Build My Girlfriend
              </a>
              <Link
                href="/features"
                className="inline-block px-6 py-3 rounded-full bg-surface border border-border text-white font-semibold hover:border-accent-purple/50 transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {data.faqs?.length > 0 && (
          <section className="py-16 px-4 bg-surface/50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently <span className="text-gradient">Asked</span>
              </h2>
              <FAQ faqs={data.faqs} />
            </div>
          </section>
        )}

        {/* More Comparisons */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">More Comparisons</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {otherPages.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-muted hover:text-white hover:border-accent-purple/50 transition-colors"
                >
                  vs {c.competitor}
                </Link>
              ))}
              <Link
                href="/compare"
                className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-muted hover:text-white hover:border-accent-purple/50 transition-colors"
              >
                All Comparisons
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

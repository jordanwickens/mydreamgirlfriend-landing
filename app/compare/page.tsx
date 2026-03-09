import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { generateSEO, generateItemListSchema } from '@/lib/seo';
import { getComparisonPagesLocal } from '@/lib/comparison-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { appLinks } from '@/lib/links';

export const metadata = generateSEO({
  title: 'Compare AI Girlfriend Apps — MyDreamGirlfriend vs Others',
  description: 'See how MyDreamGirlfriend.ai compares to Candy AI, Replika, Character.ai & more. Feature-by-feature breakdowns and honest comparisons.',
  path: '/compare',
});

const comparisonFeatures = [
  { feature: 'Relationship Progression', us: 'Yes (6 stages)', candyAi: 'No', replika: 'No', characterAi: 'No' },
  { feature: 'Persistent Memory', us: 'Yes', candyAi: 'Limited', replika: 'Yes', characterAi: 'Limited' },
  { feature: 'NSFW Content', us: 'Yes', candyAi: 'Yes', replika: 'No', characterAi: 'No' },
  { feature: 'AI-Generated Photos', us: 'Yes', candyAi: 'Yes', replika: 'No', characterAi: 'No' },
  { feature: 'Voice Notes', us: 'Yes', candyAi: 'Yes', replika: 'Yes', characterAi: 'No' },
  { feature: 'Character Creator', us: 'Yes (deep)', candyAi: 'Yes', replika: 'Limited', characterAi: 'Yes (community)' },
  { feature: 'End-to-End Encryption', us: 'Yes', candyAi: 'No', replika: 'No', characterAi: 'No' },
  { feature: 'Free Tier', us: 'Yes', candyAi: 'Yes', replika: 'Yes', characterAi: 'Yes' },
];

export default async function ComparePage() {
  const comparisons = getComparisonPagesLocal();

  const itemListSchema = generateItemListSchema(
    comparisons.map((c, i) => ({
      name: `MyDreamGirlfriend vs ${c.competitor}`,
      url: `https://mydreamgirlfriend.ai/compare/${c.slug}`,
      position: i + 1,
    }))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />

        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              How MyDreamGirlfriend <span className="text-gradient">Compares</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Feature-by-feature breakdowns against the biggest AI girlfriend apps. See the differences and decide for yourself.
            </p>
          </div>
        </section>

        {/* Summary Table */}
        <section className="px-4 mb-16">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">Quick Feature Comparison</h2>
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold text-accent-purple">MyDreamGirlfriend</th>
                  <th className="px-4 py-3 font-semibold">Candy AI</th>
                  <th className="px-4 py-3 font-semibold">Replika</th>
                  <th className="px-4 py-3 font-semibold">Character.ai</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3 text-accent-purple font-medium">{row.us}</td>
                    <td className="px-4 py-3 text-muted">{row.candyAi}</td>
                    <td className="px-4 py-3 text-muted">{row.replika}</td>
                    <td className="px-4 py-3 text-muted">{row.characterAi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Individual Comparisons */}
        <section className="px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Detailed Comparisons</h2>
            <div className="space-y-6">
              {comparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="block bg-card border border-border rounded-2xl p-6 hover:border-accent-purple/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        MyDreamGirlfriend vs {comp.competitor}
                      </h3>
                      <p className="text-sm text-muted mb-3">{comp.intro.slice(0, 150)}...</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">See for Yourself</h2>
            <p className="text-muted mb-6">Try MyDreamGirlfriend.ai free and compare it to anything else on the market.</p>
            <a
              href={appLinks.signup}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Try Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

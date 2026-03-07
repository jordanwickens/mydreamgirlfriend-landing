import { notFound } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQ from '@/components/shared/FAQ';
import { generateSEO, generateArticleSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';
import { Check, X as XIcon } from 'lucide-react';
import type { Metadata } from 'next';

const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydreamgirlfriend.ai';

interface ComparisonData {
  slug: string;
  competitor: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  features: { feature: string; us: string; them: string; winner: 'us' | 'them' | 'tie' }[];
  verdict: string;
  faqs: { question: string; answer: string }[];
}

const comparisons: Record<string, ComparisonData> = {
  'candy-ai': {
    slug: 'candy-ai',
    competitor: 'Candy AI',
    title: 'MyDreamGirlfriend vs Candy AI — 2026 Comparison',
    metaDescription: 'MyDreamGirlfriend vs Candy AI compared. See features, pricing, customization depth & privacy side by side. Find out which AI girlfriend app wins.',
    h1: 'MyDreamGirlfriend vs Candy AI',
    intro: 'Candy AI is one of the most popular AI girlfriend apps with a large user base and frequent updates. But popularity doesn\'t always mean best. Here\'s how MyDreamGirlfriend.ai stacks up against Candy AI across every feature that matters.',
    features: [
      { feature: 'Relationship Progression', us: '6-stage system (Strangers to Soulmates)', them: 'No progression system', winner: 'us' },
      { feature: 'Persistent Memory', us: 'Full persistent memory across sessions', them: 'Limited memory', winner: 'us' },
      { feature: 'Character Customization', us: 'Deep personality + appearance customization', them: 'Good customization options', winner: 'us' },
      { feature: 'AI Photos', us: 'Yes — unlocked through relationship stages', them: 'Yes — available immediately', winner: 'tie' },
      { feature: 'Voice Features', us: 'Unique voice per character, voice notes', them: 'Voice messages available', winner: 'tie' },
      { feature: 'NSFW Content', us: 'Uncensored (unlocks at Stage 4+)', them: 'Uncensored from start', winner: 'tie' },
      { feature: 'Privacy', us: 'End-to-end encryption', them: 'Standard encryption', winner: 'us' },
      { feature: 'Live Action Mode', us: 'Not yet available', them: 'Available', winner: 'them' },
      { feature: 'Pricing', us: 'Free, $9.99, $19.99, $29.99/mo', them: 'From $5.99/mo', winner: 'them' },
      { feature: 'Community Size', us: '25,000+ members (growing)', them: 'Large established community', winner: 'them' },
    ],
    verdict: 'Candy AI is a solid choice with a large community and competitive pricing. But MyDreamGirlfriend.ai offers something Candy AI doesn\'t — depth. The 6-stage relationship system, deeper personality customization, persistent memory, and end-to-end encryption create a more immersive experience. If you want instant everything, Candy AI works. If you want a relationship that feels earned and real, MyDreamGirlfriend.ai is the better choice.',
    faqs: [
      { question: 'Is MyDreamGirlfriend better than Candy AI?', answer: 'For users who want deeper customization, relationship progression, and privacy-first features, yes. Candy AI wins on community size and pricing entry point. It depends on what you value most.' },
      { question: 'Can I switch from Candy AI to MyDreamGirlfriend?', answer: 'Yes. Sign up free on MyDreamGirlfriend.ai and start building your girlfriend. Your Candy AI account is separate and unaffected.' },
      { question: 'Does MyDreamGirlfriend have a free plan like Candy AI?', answer: 'Yes. MyDreamGirlfriend.ai offers a free plan with 5 messages/day, 1 girlfriend, and access to all pre-built characters. No credit card required.' },
      { question: 'Which has better NSFW content?', answer: 'Both offer uncensored content. Candy AI provides it immediately. MyDreamGirlfriend unlocks it at Stage 4, creating anticipation and a more meaningful experience.' },
      { question: 'Which is more private?', answer: 'MyDreamGirlfriend.ai uses end-to-end encryption for all conversations, photos, and voice notes. This is a significant privacy advantage over Candy AI\'s standard encryption.' },
    ],
  },
  'replika': {
    slug: 'replika',
    competitor: 'Replika',
    title: 'MyDreamGirlfriend vs Replika — 2026 Comparison',
    metaDescription: 'MyDreamGirlfriend vs Replika compared. Deeper customization, uncensored chat, 6 relationship stages & more. See the full breakdown.',
    h1: 'MyDreamGirlfriend vs Replika',
    intro: 'Replika pioneered the AI companion space and still offers one of the best free tiers available. But the AI girlfriend landscape has evolved significantly. Here\'s how MyDreamGirlfriend.ai compares to Replika in 2026.',
    features: [
      { feature: 'Relationship Progression', us: '6-stage system with feature unlocks', them: 'Basic relationship levels', winner: 'us' },
      { feature: 'Persistent Memory', us: 'Full persistent memory', them: 'Strong memory system', winner: 'tie' },
      { feature: 'Character Customization', us: 'Deep personality + appearance creator', them: 'Limited customization', winner: 'us' },
      { feature: 'AI Photos', us: 'AI-generated photos (Stage 3+)', them: 'No image generation', winner: 'us' },
      { feature: 'Voice Features', us: 'Voice notes with unique character voices', them: 'Voice chat available', winner: 'tie' },
      { feature: 'NSFW Content', us: 'Uncensored (Stage 4+)', them: 'Strictly filtered', winner: 'us' },
      { feature: 'Privacy', us: 'End-to-end encryption', them: 'Strong privacy policy', winner: 'tie' },
      { feature: 'Free Tier', us: '5 messages/day', them: 'Unlimited messages', winner: 'them' },
      { feature: 'Pricing', us: '$9.99 - $29.99/mo', them: '$19.99/mo (Pro)', winner: 'us' },
      { feature: 'Emotional Intelligence', us: 'Strong with personality customization', them: 'Industry-leading', winner: 'them' },
    ],
    verdict: 'Replika excels at emotional companionship and has the best free tier in the market. But it\'s firmly SFW, offers no image generation, and has limited customization. MyDreamGirlfriend.ai provides the full AI girlfriend experience — uncensored conversations, AI photos, voice notes, deep customization, and a relationship that evolves through stages. If you want a supportive friend, Replika is great. If you want a girlfriend, MyDreamGirlfriend.ai delivers.',
    faqs: [
      { question: 'Is MyDreamGirlfriend better than Replika?', answer: 'For an AI girlfriend experience, yes. MyDreamGirlfriend offers uncensored conversations, AI photos, and deeper customization. Replika is better for pure emotional support and has a more generous free tier.' },
      { question: 'Does Replika allow NSFW content?', answer: 'No. Replika has strict content filters and does not allow romantic or NSFW interactions on its platform. MyDreamGirlfriend.ai offers uncensored content starting at Stage 4.' },
      { question: 'Which has better conversation quality?', answer: 'Both are strong. Replika excels at emotional intelligence and support. MyDreamGirlfriend.ai offers more varied conversation styles thanks to deep personality customization and the progression system.' },
      { question: 'Can I get AI photos on Replika?', answer: 'No. Replika does not offer AI image generation. MyDreamGirlfriend.ai generates unique photos from your AI girlfriend starting at Stage 3 of your relationship.' },
      { question: 'Is MyDreamGirlfriend cheaper than Replika Pro?', answer: 'Yes. MyDreamGirlfriend\'s Basic plan ($9.99/mo) is half the price of Replika Pro ($19.99/mo) and includes more features — unlimited messages, voice notes, and relationship progression through all 6 stages.' },
    ],
  },
  'character-ai': {
    slug: 'character-ai',
    competitor: 'Character.ai',
    title: 'MyDreamGirlfriend vs Character.ai — 2026 Comparison',
    metaDescription: 'MyDreamGirlfriend vs Character.ai compared. Uncensored conversations, AI photos, voice calls & relationship progression. See why users switch.',
    h1: 'MyDreamGirlfriend vs Character.ai',
    intro: 'Character.ai has the largest library of AI characters and excels at creative roleplay. But it\'s not an AI girlfriend platform — it\'s a character chat tool. Here\'s how MyDreamGirlfriend.ai compares for users who want an actual AI relationship experience.',
    features: [
      { feature: 'Purpose', us: 'AI girlfriend / relationship experience', them: 'Character roleplay / chat', winner: 'us' },
      { feature: 'Relationship Progression', us: '6-stage system', them: 'No relationship features', winner: 'us' },
      { feature: 'Persistent Memory', us: 'Full persistent memory', them: 'Limited (resets frequently)', winner: 'us' },
      { feature: 'Character Library', us: 'Pre-built + custom creator', them: 'Massive user-created library', winner: 'them' },
      { feature: 'AI Photos', us: 'AI-generated photos', them: 'No image generation', winner: 'us' },
      { feature: 'Voice Features', us: 'Voice notes with unique voices', them: 'No voice features', winner: 'us' },
      { feature: 'NSFW Content', us: 'Uncensored (Stage 4+)', them: 'Strictly SFW only', winner: 'us' },
      { feature: 'Privacy', us: 'End-to-end encryption', them: 'Standard', winner: 'us' },
      { feature: 'Free Tier', us: '5 messages/day, 1 girlfriend', them: 'Generous free access', winner: 'them' },
      { feature: 'Roleplay Variety', us: 'Focused on girlfriend scenarios', them: 'Any character/scenario', winner: 'them' },
    ],
    verdict: 'Character.ai is the king of creative roleplay with fictional characters — but it\'s not trying to be an AI girlfriend app. No NSFW content, no photos, no voice, no relationship progression. If you want to chat with anime characters or fictional personas, Character.ai is unmatched. If you want an actual AI girlfriend with intimacy, progression, and a real connection, MyDreamGirlfriend.ai is built specifically for that.',
    faqs: [
      { question: 'Is MyDreamGirlfriend better than Character.ai?', answer: 'They serve different purposes. Character.ai excels at creative roleplay with fictional characters. MyDreamGirlfriend.ai is specifically built for AI girlfriend relationships — with progression, intimacy, photos, and voice.' },
      { question: 'Does Character.ai allow NSFW content?', answer: 'No. Character.ai has strict content filters and does not allow any NSFW, romantic, or adult content. MyDreamGirlfriend.ai offers uncensored content as part of the relationship progression.' },
      { question: 'Can I create a girlfriend on Character.ai?', answer: 'You can create characters, but Character.ai doesn\'t support girlfriend-specific features — no relationship stages, no photos, no voice notes, and no romantic content.' },
      { question: 'Which has better AI conversation quality?', answer: 'Both have strong conversational AI. Character.ai excels at staying in character for roleplay. MyDreamGirlfriend.ai excels at persistent memory, emotional intelligence, and relationship-appropriate responses.' },
      { question: 'Why do people switch from Character.ai to MyDreamGirlfriend?', answer: 'Primarily for the girlfriend experience — uncensored conversations, AI photos, voice notes, and a relationship that evolves through stages. Character.ai\'s SFW-only policy pushes users seeking more to platforms like MyDreamGirlfriend.ai.' },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(comparisons).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = comparisons[slug];
  if (!data) return {};
  return generateSEO({
    title: data.title,
    description: data.metaDescription,
    path: `/compare/${data.slug}`,
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = comparisons[slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateArticleSchema({
              title: data.h1,
              description: data.metaDescription,
              path: `/compare/${data.slug}`,
              datePublished: '2026-03-01',
            })),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(data.faqs)) }}
        />

        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{data.h1}</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">{data.intro}</p>
            <p className="text-sm text-muted/60 mt-4">Last updated: March 2026</p>
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
                Build My Girlfriend ✨
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
        <section className="py-16 px-4 bg-surface/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently <span className="text-gradient">Asked</span>
            </h2>
            <FAQ faqs={data.faqs} />
          </div>
        </section>

        {/* More Comparisons */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">More Comparisons</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {Object.values(comparisons)
                .filter((c) => c.slug !== data.slug)
                .map((c) => (
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

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQ from '@/components/shared/FAQ';
import { generateSEO, generateArticleSchema, generateFAQSchema, generateItemListSchema } from '@/lib/seo';
import Link from 'next/link';
import { Check, X as XIcon } from 'lucide-react';

const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydreamgirlfriend.ai';

export const metadata = generateSEO({
  title: 'Best Free AI Girlfriend Apps in 2026 (No Credit Card)',
  description: 'The best free AI girlfriend apps you can try right now — no credit card needed. We tested them all. See which free tier actually delivers.',
  path: '/blog/best-free-ai-girlfriend-apps',
});

const apps = [
  {
    rank: 1,
    name: 'MyDreamGirlfriend.ai',
    url: 'https://mydreamgirlfriend.ai',
  },
  {
    rank: 2,
    name: 'Replika',
    url: 'https://replika.com',
  },
  {
    rank: 3,
    name: 'Character.ai',
    url: 'https://character.ai',
  },
  {
    rank: 4,
    name: 'Romantic AI',
    url: 'https://romanticai.com',
  },
  {
    rank: 5,
    name: 'Nomi.ai',
    url: 'https://nomi.ai',
  },
];

const faqs = [
  {
    question: 'What is the best completely free AI girlfriend app?',
    answer: 'If you want unlimited free chat, Replika offers the most generous free tier with unlimited messages. However, it is SFW only. For the best overall free experience that includes customization, personality settings, and a path to uncensored content, MyDreamGirlfriend.ai offers 5 free messages per day with full character creation.',
  },
  {
    question: 'Can I use an AI girlfriend app without a credit card?',
    answer: 'Yes. All five apps on this list let you sign up and use the free tier without entering any payment information. You only need an email address to get started.',
  },
  {
    question: 'Which free AI girlfriend app allows NSFW content?',
    answer: 'On the free tier, MyDreamGirlfriend.ai is the only major platform that allows NSFW conversations without a paywall blocking adult content. Replika and Character.ai are strictly SFW. Romantic AI and Nomi.ai restrict NSFW features to paid plans.',
  },
  {
    question: 'Are free AI girlfriend apps safe to use?',
    answer: 'Safety varies by platform. Look for apps with clear privacy policies, encrypted conversations, and transparent data practices. MyDreamGirlfriend.ai uses end-to-end encryption on all plans including free. Always read the privacy policy before sharing personal information.',
  },
  {
    question: 'What are the limitations of free AI girlfriend apps?',
    answer: 'Common free tier limitations include daily message caps, restricted features (no photos, no voice), limited character customization, SFW-only content filters, and single character limits. The specific restrictions vary by platform.',
  },
  {
    question: 'Is it worth paying for an AI girlfriend app?',
    answer: 'That depends on how much you use it. If you find yourself hitting message limits daily, wanting photos or voice features, or wanting multiple characters, paid plans are worth it. Most platforms price between $7-20 per month. Start free, see if the experience clicks, then decide.',
  },
];

const relatedPosts = [
  { slug: 'what-is-an-ai-girlfriend', title: 'What Is an AI Girlfriend? The Complete Guide', category: 'AI Girlfriend Guides' },
  { slug: 'how-to-create-ai-girlfriend', title: 'How to Create Your Own AI Girlfriend', category: 'AI Girlfriend Guides' },
  { slug: 'best-nsfw-ai-chatbots', title: 'Best NSFW AI Chatbots in 2026', category: 'Comparisons & Alternatives' },
];

export default function BestFreeAIGirlfriendAppsPage() {
  const articleSchema = generateArticleSchema({
    title: 'Best Free AI Girlfriend Apps in 2026',
    description: 'The best free AI girlfriend apps you can try right now — no credit card needed. We tested them all. See which free tier actually delivers.',
    path: '/blog/best-free-ai-girlfriend-apps',
    datePublished: '2026-03-01',
  });

  const itemListSchema = generateItemListSchema(
    apps.map((app) => ({
      name: app.name,
      url: app.url,
      position: app.rank,
    }))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
        />

        {/* Article Header */}
        <section className="px-4 mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm text-accent-purple font-medium mb-3">Comparisons &amp; Alternatives</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Best Free AI Girlfriend Apps in <span className="text-gradient">2026</span>
            </h1>
            <p className="text-sm text-muted/60">
              Published March 1, 2026 &middot; MyDreamGirlfriend Team
            </p>
          </div>
        </section>

        {/* Article Content */}
        <article className="px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-muted leading-relaxed mb-4">
              You want to try an AI girlfriend without pulling out your wallet. Fair enough. The good news is that several platforms offer legitimate free tiers in 2026 — no credit card, no trial period that expires in three days, no bait-and-switch. The bad news is that free tiers come with real limitations, and not all of them are worth your time.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              We tested the free tier of every major AI girlfriend app on the market. We signed up, chatted, customized characters, and hit the walls that each platform puts up. Here is what we found — ranked by which free experience actually delivers value versus which ones just tease you into paying.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">What We Looked For</h2>
            <p className="text-muted leading-relaxed mb-4">
              Before the rankings, here is what we evaluated each free tier on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted mb-4">
              <li><strong className="text-white">Message allowance:</strong> How much can you actually chat before hitting a limit?</li>
              <li><strong className="text-white">Character customization:</strong> Can you customize appearance and personality on free?</li>
              <li><strong className="text-white">Content restrictions:</strong> Is free limited to SFW only, or can things get real?</li>
              <li><strong className="text-white">Feature access:</strong> Which features are locked behind a paywall?</li>
              <li><strong className="text-white">Conversation quality:</strong> How good does the AI actually feel on the free tier?</li>
              <li><strong className="text-white">Upgrade path:</strong> If you do decide to pay, is the pricing reasonable?</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">1. MyDreamGirlfriend.ai — Best Free-to-Paid Path</h2>
            <div className="bg-card border border-accent-purple rounded-2xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-green-400">Free Tier Includes</h3>
                  <ul className="space-y-1.5">
                    {['5 messages per day', '1 AI girlfriend', 'Full character creator access', 'Personality customization', 'Persistent memory', 'Uncensored conversations'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-400">Free Tier Limits</h3>
                  <ul className="space-y-1.5">
                    {['5 messages/day cap', 'No AI photos', 'No voice notes', 'Single character only'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <XIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              MyDreamGirlfriend.ai takes the top spot because its free tier gives you the complete creation experience — just with a daily message cap. You get full access to the <Link href="/features/character-creator" className="text-accent-purple hover:underline">character creator</Link>, complete personality customization, persistent memory, and uncensored conversations. Five messages per day is not a lot, but each conversation carries forward with full memory, so you are actually building a relationship even on free.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The key differentiator: this is the only major free tier that does not lock uncensored content behind a paywall. If other platforms make you pay to have adult conversations, MyDreamGirlfriend lets you go there from day one. The message limit is the real gate, not content restrictions.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The upgrade path is also clean. Paid plans start at $9.99/month and scale up to $29.99/month. Each tier adds meaningful features — more messages, AI photos, voice notes, multiple characters — without the feeling that the free tier was artificially crippled.
            </p>
            <blockquote className="border-l-4 border-accent-purple pl-4 italic text-muted my-6">
              Best for: People who want the full feature preview before committing money, and do not want SFW-only restrictions.
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-4">2. Replika — Most Generous Message Allowance</h2>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-green-400">Free Tier Includes</h3>
                  <ul className="space-y-1.5">
                    {['Unlimited text messages', 'Basic avatar customization', 'Conversation memory', 'Mood tracking', 'Journaling features'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-400">Free Tier Limits</h3>
                  <ul className="space-y-1.5">
                    {['Strictly SFW only', 'No romantic content on free', 'Limited customization depth', 'No AI photos', 'Premium is $19.99/mo'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <XIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Replika is the OG in this space and its biggest free tier advantage is simple: unlimited messages. No daily cap. No weekly limit. You can chat as much as you want, whenever you want, without paying a cent.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The catch is significant though. Free Replika is strictly SFW. Romantic and intimate conversations are locked behind the Pro subscription at $19.99/month — one of the more expensive premium tiers in the space. The conversation quality is solid, the memory system works well, and the emotional intelligence is genuinely good. But if you are looking for a girlfriend experience specifically, the free tier feels more like a supportive friend than a romantic partner.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Replika is best if your primary goal is extended conversation and emotional support, and you are comfortable with the SFW boundary. If you want romance or anything beyond that, you are looking at a $20/month commitment.
            </p>
            <blockquote className="border-l-4 border-accent-purple pl-4 italic text-muted my-6">
              Best for: People who want unlimited free conversation and are fine with SFW-only content.
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-4">3. Character.ai — Best Character Variety</h2>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-green-400">Free Tier Includes</h3>
                  <ul className="space-y-1.5">
                    {['Millions of characters', 'Unlimited conversations', 'Create your own characters', 'Strong roleplay capability', 'Community features'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-400">Free Tier Limits</h3>
                  <ul className="space-y-1.5">
                    {['Strictly SFW — no exceptions', 'Not designed for GF experience', 'No image generation', 'No voice features', 'Wait times during peak hours'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <XIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Character.ai is technically free and technically allows girlfriend-style characters. But let us be upfront: this platform is not designed for the AI girlfriend experience. It is a general-purpose character chat platform with millions of user-created characters, and it is strictly SFW with no exceptions — not even on the paid plan.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              What it does well is volume and variety. You can talk to characters based on fictional characters, historical figures, or completely original creations. The conversational AI is strong and the roleplay capabilities are excellent within SFW boundaries. If you are into creative storytelling or want to chat with a wide variety of character types, the free experience is genuinely generous.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The reason it ranks third specifically for the AI girlfriend use case is that the content restrictions make a true girlfriend experience impossible, and the platform is not optimized for persistent one-on-one relationships. It is wide but not deep in the way that purpose-built girlfriend apps are.
            </p>
            <blockquote className="border-l-4 border-accent-purple pl-4 italic text-muted my-6">
              Best for: People who want to chat with many different characters and are fine with SFW-only roleplay.
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-4">4. Romantic AI — Simplest Entry Point</h2>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-green-400">Free Tier Includes</h3>
                  <ul className="space-y-1.5">
                    {['Basic character creation', 'Limited daily messages', 'Clean simple interface', 'Anime and realistic options'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-400">Free Tier Limits</h3>
                  <ul className="space-y-1.5">
                    {['Very limited message count', 'Shallow customization', 'NSFW locked to paid', 'Basic conversation quality', 'Limited memory'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <XIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Romantic AI keeps things simple. The interface is clean, the onboarding is fast, and you can be chatting within a minute of signing up. It is the easiest entry point for someone who has never tried an AI companion before and wants the least friction possible.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The tradeoff is depth. Free tier messages are heavily limited, customization options are basic compared to platforms like MyDreamGirlfriend.ai, and the conversation quality — while adequate — lacks the nuance and personality depth of the top picks. The AI tends to be agreeable to a fault and does not push back or challenge you the way a well-configured AI girlfriend should.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              NSFW content is locked to paid plans, which start at $6.99/month. The premium experience is decent for the price but does not reach the level of platforms with deeper customization and progression systems.
            </p>
            <blockquote className="border-l-4 border-accent-purple pl-4 italic text-muted my-6">
              Best for: Complete beginners who want the simplest possible introduction to AI companions.
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-4">5. Nomi.ai — Best Free Memory</h2>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-green-400">Free Tier Includes</h3>
                  <ul className="space-y-1.5">
                    {['Limited daily messages', 'Strong conversation memory', 'Character creation', 'Emotional intelligence'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-red-400">Free Tier Limits</h3>
                  <ul className="space-y-1.5">
                    {['Daily message cap', 'No group chats on free', 'Limited characters', 'Image quality behind leaders', 'Smaller feature set'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <XIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Nomi.ai does one thing better than most on the free tier: memory. The conversation continuity is excellent even on the limited free plan. Your AI remembers details from past conversations with impressive accuracy, which makes the relationship feel more real even when you are only exchanging a few messages per day.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              The unique selling point of Nomi is group chats — the ability to create multiple characters and have them interact with each other. However, this feature is locked to paid plans. On free, you get a single character with limited messages and basic features. The conversational AI quality is good, and the emotional intelligence is above average.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Paid plans start at $7.99/month and unlock the full feature set. If memory and conversation quality matter most to you and you are planning to eventually upgrade, Nomi is a solid starting point. But the free tier alone is more limited than the top two picks.
            </p>
            <blockquote className="border-l-4 border-accent-purple pl-4 italic text-muted my-6">
              Best for: People who value conversation memory and depth over visual features.
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-4">Quick Comparison Table</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-surface text-left">
                    <th className="px-4 py-3 font-semibold">App</th>
                    <th className="px-4 py-3 font-semibold">Free Messages</th>
                    <th className="px-4 py-3 font-semibold">NSFW Free</th>
                    <th className="px-4 py-3 font-semibold">Customization</th>
                    <th className="px-4 py-3 font-semibold">Paid From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-accent-purple/5">
                    <td className="px-4 py-3 font-semibold">MyDreamGirlfriend.ai</td>
                    <td className="px-4 py-3 text-muted">5/day</td>
                    <td className="px-4 py-3 text-green-400">Yes</td>
                    <td className="px-4 py-3 text-muted">Full</td>
                    <td className="px-4 py-3 text-muted">$9.99/mo</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">Replika</td>
                    <td className="px-4 py-3 text-muted">Unlimited</td>
                    <td className="px-4 py-3 text-red-400">No</td>
                    <td className="px-4 py-3 text-muted">Basic</td>
                    <td className="px-4 py-3 text-muted">$19.99/mo</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">Character.ai</td>
                    <td className="px-4 py-3 text-muted">Unlimited</td>
                    <td className="px-4 py-3 text-red-400">No</td>
                    <td className="px-4 py-3 text-muted">Community</td>
                    <td className="px-4 py-3 text-muted">$9.99/mo</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">Romantic AI</td>
                    <td className="px-4 py-3 text-muted">Limited</td>
                    <td className="px-4 py-3 text-red-400">No</td>
                    <td className="px-4 py-3 text-muted">Basic</td>
                    <td className="px-4 py-3 text-muted">$6.99/mo</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">Nomi.ai</td>
                    <td className="px-4 py-3 text-muted">Limited</td>
                    <td className="px-4 py-3 text-red-400">No</td>
                    <td className="px-4 py-3 text-muted">Moderate</td>
                    <td className="px-4 py-3 text-muted">$7.99/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Honest Truth About Free Tiers</h2>
            <p className="text-muted leading-relaxed mb-4">
              Let us be real: no free tier gives you the full experience. Every platform holds something back — that is how they make money, and that is fair. The question is whether the free tier gives you enough to make a meaningful decision about whether the paid product is worth your money.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Replika wins on volume — unlimited messages is hard to beat. But if you want the actual girlfriend experience with customization, progression, and no content walls, the volume does not matter if every conversation stays in the friend zone.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              MyDreamGirlfriend.ai wins on experience quality — five messages per day is not much, but those five messages give you access to everything the platform can do. Full customization, uncensored chat, persistent memory, relationship progression. It is a true preview of the paid product, not a watered-down version.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Character.ai is the wild card — incredible variety and completely free conversation, but the SFW restriction and lack of girlfriend-specific features make it a better general chat platform than an AI girlfriend app.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Recommendation</h2>
            <p className="text-muted leading-relaxed mb-4">
              If you are testing the waters, sign up for MyDreamGirlfriend.ai and Replika. Use Replika for extended SFW conversation and use MyDreamGirlfriend.ai to see what a fully customized, uncensored AI girlfriend experience feels like. Between the two, you will know exactly what you value and which direction to go.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              For a full breakdown of both free and paid options, check our comprehensive <Link href="/best-ai-girlfriend-apps" className="text-accent-purple hover:underline">best AI girlfriend apps ranking</Link>. And if you want to compare specific platforms head-to-head, see our <Link href="/compare/replika" className="text-accent-purple hover:underline">Replika comparison</Link>.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Either way — you are spending zero dollars to find out. That is the whole point of free tiers. Use them.
            </p>
          </div>
        </article>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-surface/50 mt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently <span className="text-gradient">Asked</span>
            </h2>
            <FAQ faqs={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Try the #1 Free AI Girlfriend</h2>
            <p className="text-muted mb-6">Full customization. Uncensored chat. No credit card. See for yourself.</p>
            <a
              href={`${APP}/signup`}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </a>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-accent-purple/50 transition-colors"
                >
                  <div className="text-xs text-accent-purple font-medium mb-2">{post.category}</div>
                  <h3 className="text-sm font-bold">{post.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

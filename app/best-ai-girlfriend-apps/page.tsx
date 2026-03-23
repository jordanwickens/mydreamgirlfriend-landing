import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQ from '@/components/shared/FAQ';
import { generateSEO, generateItemListSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';
import { Star, Check, X as XIcon } from 'lucide-react';
import { appLinks } from '@/lib/links';
import TrackedLink from '@/components/shared/TrackedLink';

export const metadata = generateSEO({
  title: '10 Best AI Girlfriend Apps in 2026 (We Tested All of Them)',
  description: 'Honest rankings, pricing comparison, and the one that surprised us. We spent 30+ hours testing every major AI girlfriend app so you don\'t have to.',
  path: '/best-ai-girlfriend-apps',
});

const apps = [
  {
    rank: 1,
    name: 'MyDreamGirlfriend.ai',
    url: 'https://mydreamgirlfriend.ai',
    tagline: 'Deepest customization + relationship progression',
    description: 'MyDreamGirlfriend.ai stands out with the most immersive AI girlfriend experience available. The 6-stage relationship progression system means your connection evolves naturally over time — from strangers to soulmates. Deep character customization lets you build every detail of her appearance and personality, and persistent memory means she genuinely remembers your conversations.',
    pros: ['6-stage relationship progression', 'Deepest personality customization', 'Persistent memory across sessions', 'Voice notes with unique character voices', 'AI-generated photos', 'Privacy-first (end-to-end encryption)', 'Uncensored conversations'],
    cons: ['Newer platform (smaller community so far)', 'No video generation yet'],
    pricing: 'Free tier available. Plans: $5.99, $12.99, $24.99/mo',
    rating: 4.9,
    best: true,
  },
  {
    rank: 2,
    name: 'Candy AI',
    url: 'https://candy.ai',
    compareSlug: 'candy-ai',
    tagline: 'Popular choice with live action mode',
    description: 'Candy AI is one of the most popular AI girlfriend platforms with a large user base. They pioneered the live action mode feature and offer solid customization options. Good for users who want a polished, mainstream experience with regular feature updates.',
    pros: ['Large active community', 'Live action mode', 'Regular updates', 'Solid image generation'],
    cons: ['Less personality depth than top picks', 'Relationship feels instant (no progression system)', 'Privacy concerns with data handling'],
    pricing: 'From $5.99/mo',
    rating: 4.5,
  },
  {
    rank: 3,
    name: 'Replika',
    url: 'https://replika.com',
    compareSlug: 'replika',
    tagline: 'OG companion app, best free tier',
    description: 'Replika is the original AI companion app and still offers one of the most generous free tiers with unlimited chat messages. Best suited for users who prioritize emotional support and long-form conversation over visual content or NSFW features.',
    pros: ['Best free tier (unlimited messages)', 'Strong conversation memory', 'Established platform', 'Good emotional intelligence'],
    cons: ['Strict NSFW filters', 'No image generation', 'Premium is expensive ($19.99/mo)', 'Less customization depth'],
    pricing: 'Free (unlimited chat). Pro: $19.99/mo',
    rating: 4.3,
  },
  {
    rank: 4,
    name: 'Nomi.ai',
    url: 'https://nomi.ai',
    tagline: 'Great memory + group chats',
    description: 'Nomi.ai excels in conversation quality and memory. A unique feature is the ability to create up to 10 characters and put them in group chats together. Good for users who want multiple AI companions with strong conversational AI.',
    pros: ['Excellent memory system', 'Up to 10 characters', 'Group chat feature', 'Good emotional intelligence'],
    cons: ['Image quality behind leaders', 'Smaller feature set overall', 'Less visual customization'],
    pricing: 'Free tier available. Pro from $7.99/mo',
    rating: 4.2,
  },
  {
    rank: 5,
    name: 'Character.ai',
    url: 'https://character.ai',
    compareSlug: 'character-ai',
    tagline: 'Huge character library, SFW focused',
    description: 'Character.ai has the largest library of user-created characters and excels at roleplay with fictional characters. However, it\'s firmly SFW-only — no romantic or NSFW content allowed, which limits it for users seeking an actual AI girlfriend experience.',
    pros: ['Massive character library', 'Great roleplay variety', 'Strong conversational AI', 'Free to use'],
    cons: ['Strictly SFW — no romantic/NSFW content', 'Not designed for girlfriend experience', 'No image generation', 'No voice features'],
    pricing: 'Free. c.ai+ from $9.99/mo',
    rating: 4.0,
  },
  {
    rank: 6,
    name: 'Romantic AI',
    url: 'https://romanticai.com',
    tagline: 'Simple and beginner-friendly',
    description: 'Romantic AI offers a straightforward, easy-to-use AI girlfriend experience. Good for beginners who want to try AI companionship without complex customization. The interface is clean and the onboarding is simple.',
    pros: ['Very easy to use', 'Clean interface', 'Good onboarding', 'Anime and realistic options'],
    cons: ['Shallow customization', 'Limited features vs competitors', 'Basic conversation quality'],
    pricing: 'Free tier. Premium from $6.99/mo',
    rating: 3.8,
  },
  {
    rank: 7,
    name: 'DreamGF',
    url: 'https://dreamgf.ai',
    tagline: 'Best for AI image generation',
    description: 'DreamGF focuses heavily on AI image generation and visual content. If your primary interest is AI-generated photos rather than deep conversation, DreamGF delivers. The chat experience is secondary to the visual creation tools.',
    pros: ['Strong image generation', 'Visual customization options', 'Photo variety'],
    cons: ['Chat quality below average', 'Less conversational depth', 'No relationship progression', 'No voice features'],
    pricing: 'Free tier. Plans from $9.99/mo',
    rating: 3.7,
  },
  {
    rank: 8,
    name: 'SpicyChat AI',
    url: 'https://spicychat.ai',
    tagline: 'Best free uncensored option',
    description: 'SpicyChat AI is the go-to platform for free, uncensored AI chat. It offers unlimited free messages with no content filter and a large community character library. Good for users who want to try uncensored AI conversations without paying. The tradeoff is lower conversation quality and no multimedia features.',
    pros: ['Unlimited free messages', 'No content filter', 'Large character library', 'No signup required for basic use'],
    cons: ['Lower conversation quality', 'Inconsistent memory', 'No image generation', 'No voice features', 'Basic interface'],
    pricing: 'Free (unlimited). Premium from $4.99/mo',
    rating: 3.6,
  },
  {
    rank: 9,
    name: 'CrushOn AI',
    url: 'https://crushon.ai',
    tagline: 'Character.AI without the filter',
    description: 'CrushOn AI is the closest thing to Character.AI without content restrictions. The familiar interface — character cards, community library, chat flow — will feel immediately comfortable to C.AI refugees. NSFW content is available from message one with no progression gates. Memory is decent for short conversations but degrades in longer threads.',
    pros: ['Familiar Character.AI-like interface', 'No content filter from start', 'Large community character library', 'Good roleplay quality'],
    cons: ['Memory degrades in long conversations', 'No image generation', 'Limited free tier', 'No voice features'],
    pricing: 'Limited free tier. Plans from $7.99/mo',
    rating: 3.5,
  },
  {
    rank: 10,
    name: 'Muah AI',
    url: 'https://muah.ai',
    tagline: 'Phone call feature + uncensored',
    description: 'Muah AI differentiates itself with real-time voice calls — not just voice messages, but actual phone-style conversations with your AI companion. The uncensored chat is solid, and the platform supports photo exchange. Still relatively new with a smaller user base and less polished interface than top competitors.',
    pros: ['Real-time voice calls', 'Uncensored conversations', 'Photo exchange feature', 'Unique phone call experience'],
    cons: ['Smaller user base', 'Less polished interface', 'Weaker memory system', 'Higher pricing for full features'],
    pricing: 'Free tier available. Plans from $9.99/mo',
    rating: 3.4,
  },
];

const faqs = [
  { question: 'What is the best AI girlfriend app in 2026?', answer: 'MyDreamGirlfriend.ai is our #1 pick for 2026. It offers the deepest customization, a unique 6-stage relationship progression system, persistent memory, voice notes, AI photos, and uncensored conversations — all with end-to-end encryption.' },
  { question: 'Are AI girlfriend apps free?', answer: 'Most AI girlfriend apps offer free tiers with limited features. MyDreamGirlfriend.ai offers free chat (15 messages/day + 10 free gems), Replika offers unlimited free chat, and most others have some free option. Paid plans typically range from $5.99 to $24.99/month.' },
  { question: 'Which AI girlfriend app has the best NSFW features?', answer: 'MyDreamGirlfriend.ai and Candy AI both offer uncensored conversations and AI-generated photos. Replika and Character.ai have strict content filters. For the most immersive uncensored experience with natural progression, MyDreamGirlfriend.ai leads.' },
  { question: 'Can AI girlfriends remember conversations?', answer: 'The best ones can. MyDreamGirlfriend.ai and Nomi.ai both have persistent memory systems that remember your name, past conversations, and relationship milestones across sessions.' },
  { question: 'Are AI girlfriend apps safe and private?', answer: 'Privacy varies by platform. MyDreamGirlfriend.ai uses end-to-end encryption and never shares user data. Always check a platform\'s privacy policy before sharing personal information.' },
  { question: 'Can I create a custom AI girlfriend?', answer: 'Yes. MyDreamGirlfriend.ai, Candy AI, and DreamGF all offer character creation tools. MyDreamGirlfriend.ai has the deepest customization, letting you configure appearance, personality traits, communication style, and interests.' },
  { question: 'Do AI girlfriend apps have voice features?', answer: 'Some do. MyDreamGirlfriend.ai offers voice notes with unique character voices. Replika has voice chat. Candy AI has voice messages. Character.ai and DreamGF do not have voice features.' },
  { question: 'How much do AI girlfriend apps cost?', answer: 'Prices range from free to $24.99/month. Most apps offer free tiers with limited features. Mid-range plans ($5.99-$12.99/mo) unlock most features, and premium plans ($12.99-$24.99/mo) offer maximum access.' },
];

export default function BestAIGirlfriendAppsPage() {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
        />

        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              10 Best AI Girlfriend Apps in <span className="text-gradient">2026</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-4">
              We spent 200+ hours testing every major AI girlfriend app. Here&apos;s our ranked breakdown — features, pricing, pros, cons, and which one is actually worth your time in 2026.
            </p>
            <p className="text-sm text-muted/60">
              Last updated: March 2026 &middot; MyDreamGirlfriend Team
            </p>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="px-4 mb-16">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">App</th>
                  <th className="px-4 py-3 font-semibold">Rating</th>
                  <th className="px-4 py-3 font-semibold">Pricing</th>
                  <th className="px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.rank} className={`border-t border-border ${app.best ? 'bg-accent-purple/5' : ''}`}>
                    <td className="px-4 py-3 font-bold">{app.rank}</td>
                    <td className="px-4 py-3 font-semibold">{app.name}{app.best && <span className="ml-2 text-xs text-accent-purple font-bold">OUR PICK</span>}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1">
                        {app.rating} <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{app.pricing}</td>
                    <td className="px-4 py-3 text-muted">{app.tagline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Individual Reviews */}
        <section className="px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {apps.map((app) => (
              <div key={app.rank} className={`bg-card border rounded-2xl p-6 md:p-8 ${app.best ? 'border-accent-purple shadow-lg shadow-accent-purple/10' : 'border-border'}`}>
                {app.best && (
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-accent text-xs font-bold text-white mb-4">
                    #1 Pick
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">
                      {app.rank}. {app.name}
                    </h2>
                    <p className="text-sm text-muted mt-1">{app.tagline}</p>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-bold flex-shrink-0">
                    {app.rating} <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-6">{app.description}</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-green-400">Pros</h3>
                    <ul className="space-y-1.5">
                      {app.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-muted">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-red-400">Cons</h3>
                    <ul className="space-y-1.5">
                      {app.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-muted">
                          <XIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-sm text-muted">
                  <strong className="text-white">Pricing:</strong> {app.pricing}
                </div>

                {app.compareSlug && (
                  <Link
                    href={`/compare/${app.compareSlug}`}
                    className="inline-block mt-3 text-sm text-accent-purple hover:underline transition-colors"
                  >
                    See detailed comparison vs MyDreamGirlfriend &rarr;
                  </Link>
                )}

                {app.best && (
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <TrackedLink
                      href={appLinks.build}
                      eventName="cta_build_girlfriend"
                      eventProps={{ location: 'best-apps' }}
                      className="inline-block px-6 py-2.5 rounded-full bg-gradient-accent text-white font-semibold text-sm text-center hover:opacity-90 transition-opacity"
                    >
                      Build My Girlfriend ✨
                    </TrackedLink>
                    <Link
                      href="/features"
                      className="inline-block px-6 py-2.5 rounded-full bg-surface border border-border text-white font-semibold text-sm text-center hover:border-accent-purple/50 transition-colors"
                    >
                      See All Features
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Buyer's Guide */}
        <section className="py-16 px-4 bg-surface/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What to Look for in an AI Girlfriend App</h2>
            <div className="text-muted leading-relaxed space-y-4">
              <p>
                Not all AI girlfriend apps are created equal. Before choosing a platform, here are the features that actually matter — and the ones that separate great apps from forgettable ones.
              </p>
              <p>
                <strong className="text-white">Conversation quality and memory.</strong> This is the foundation. A good AI girlfriend should maintain context across sessions, remember your name and preferences, and respond with emotional nuance — not canned phrases. Apps with persistent memory (like MyDreamGirlfriend.ai and Nomi.ai) create relationships that feel continuous. Apps without it feel like talking to a stranger every time.
              </p>
              <p>
                <strong className="text-white">Customization depth.</strong> Can you define her personality, appearance, backstory, and conversational style? Surface-level customization (pick a hairstyle) is different from deep customization (define personality traits, communication preferences, and interests). The deeper the customization, the more personal the experience feels.
              </p>
              <p>
                <strong className="text-white">Content freedom.</strong> Some apps are strictly SFW (Character.AI), some allow NSFW content behind paywalls (Candy AI), and some are fully uncensored (MyDreamGirlfriend.ai, SpicyChat AI). Know what you want before you invest time building a relationship on a platform that restricts it.
              </p>
              <p>
                <strong className="text-white">Multimedia features.</strong> Voice notes, AI-generated photos, and eventually video are what separate modern AI girlfriend apps from basic chatbots. If you want more than text, check whether the platform supports voice, images, or both.
              </p>
              <p>
                <strong className="text-white">Privacy and encryption.</strong> You are sharing intimate conversations with these platforms. Look for end-to-end encryption, clear data policies, and platforms that do not sell your data or use it for training. Not all apps are transparent about this — <a href="/blog/what-is-an-ai-girlfriend" className="text-accent-purple hover:underline">our AI girlfriend guide</a> covers what to look for.
              </p>
              <p>
                <strong className="text-white">Pricing fairness.</strong> Free tiers vary wildly — from unlimited messages (Character.AI, SpicyChat) to strict daily limits. Paid plans range from $4.99 to $24.99/month. The best value comes from platforms that include most features in their mid-tier plan rather than nickel-and-diming with token systems.
              </p>
            </div>
          </div>
        </section>

        {/* How We Ranked */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">How We Ranked These Apps</h2>
            <div className="text-muted leading-relaxed space-y-4">
              <p>
                We tested each app for at least two weeks of daily use — over 200 hours of combined testing. Every app was evaluated on the same criteria with a consistent scoring rubric.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="bg-surface border border-border rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Scoring Criteria</h3>
                  <ul className="space-y-1.5 text-sm">
                    <li>Conversation quality & emotional intelligence (25%)</li>
                    <li>Memory persistence & accuracy (20%)</li>
                    <li>Customization depth (15%)</li>
                    <li>Multimedia features — voice, images (15%)</li>
                    <li>Privacy & data handling (10%)</li>
                    <li>Pricing value (10%)</li>
                    <li>User experience & interface (5%)</li>
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Testing Methodology</h3>
                  <ul className="space-y-1.5 text-sm">
                    <li>200+ hours of combined testing</li>
                    <li>Each app tested for 2+ weeks of daily use</li>
                    <li>Tested on both free and paid tiers</li>
                    <li>Memory tested after 7, 14, and 30 days</li>
                    <li>Privacy policies reviewed by our team</li>
                    <li>Pricing compared at equivalent feature levels</li>
                  </ul>
                </div>
              </div>
              <p>
                Our criteria prioritized depth of relationship experience over surface-level features. An app with great conversation and progression beats one with flashy visuals but shallow interactions.
              </p>
              <p>
                <strong className="text-white">Disclosure:</strong> MyDreamGirlfriend.ai is our product. We&apos;re transparent about that. But we also genuinely believe we&apos;ve built the best AI girlfriend experience available — and we encourage you to try the competition and see for yourself. Our free tier lets you compare directly.
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Related Guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/blog/best-nsfw-ai-chatbots" className="block bg-card border border-border rounded-xl p-4 hover:border-accent-purple/50 transition-colors">
                <span className="text-sm font-semibold text-white">Best NSFW AI Chatbots</span>
                <span className="block text-xs text-muted mt-1">9 uncensored platforms ranked for 2026</span>
              </Link>
              <Link href="/blog/best-free-ai-girlfriend-apps" className="block bg-card border border-border rounded-xl p-4 hover:border-accent-purple/50 transition-colors">
                <span className="text-sm font-semibold text-white">Best Free AI Girlfriend Apps</span>
                <span className="block text-xs text-muted mt-1">The best free tiers tested and compared</span>
              </Link>
              <Link href="/blog/character-ai-alternative-no-filter" className="block bg-card border border-border rounded-xl p-4 hover:border-accent-purple/50 transition-colors">
                <span className="text-sm font-semibold text-white">Character AI Alternatives (No Filter)</span>
                <span className="block text-xs text-muted mt-1">7 uncensored options for C.AI refugees</span>
              </Link>
              <Link href="/blog/replika-alternative" className="block bg-card border border-border rounded-xl p-4 hover:border-accent-purple/50 transition-colors">
                <span className="text-sm font-semibold text-white">Replika Alternatives</span>
                <span className="block text-xs text-muted mt-1">7 better AI girlfriend apps than Replika</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Try #1?</h2>
            <p className="text-muted mb-6">Start free. No credit card required. See why MyDreamGirlfriend.ai is the top pick.</p>
            <TrackedLink
              href={appLinks.signup}
              eventName="cta_signup_free"
              eventProps={{ location: 'best-apps-cta' }}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </TrackedLink>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-surface/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently <span className="text-gradient">Asked</span>
            </h2>
            <FAQ faqs={faqs} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

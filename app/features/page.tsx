import { MessageCircle, Mic, Heart, Image, Sparkles, Drama, UserCog } from 'lucide-react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FeatureCard from '@/components/shared/FeatureCard';
import FAQ from '@/components/shared/FAQ';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import { appLinks } from '@/lib/links';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'AI Girlfriend Features — What She Can Actually Do',
  description: 'Voice calls, AI photos, uncensored chat, persistent memory, and deep customization. See every feature — and try it free.',
  path: '/features',
});

const features = [
  { icon: MessageCircle, title: 'Deep AI Chat', description: 'Conversations that remember you, grow with you, and develop genuine emotional connections. Persistent memory means she never forgets.', href: '/features/ai-chat' },
  { icon: Image, title: 'AI-Generated Photos', description: 'Receive private, AI-generated selfies and photos from your girlfriend. Unlocked as your relationship deepens.', href: '/features/ai-girlfriend-images' },
  { icon: Mic, title: 'Voice Notes & Calls', description: 'Hear her voice. Unique audio messages that match her personality and your relationship.', href: '/features/voice-calls' },
  { icon: Sparkles, title: 'Character Creator', description: 'Build your dream girlfriend from scratch. Choose appearance, personality, voice, interests, and more.', href: '/features/character-creator' },
  { icon: Drama, title: 'Unlimited Roleplay', description: 'Explore any scenario you can imagine. No filters, no limits. Private and encrypted.', href: '/features/roleplay' },
  { icon: UserCog, title: 'Personality Customization', description: 'Shape her mood, communication style, interests, and preferences. She becomes exactly who you want.', href: '/features/personality-customization' },
];

const faqs = [
  { question: 'Are all features available on the free plan?', answer: 'Free users get AI chat (15 messages/day), 1 girlfriend, and 10 free gems. Paid plans unlock more messages, monthly gems, multiple girlfriends, and more.' },
  { question: 'How realistic are the conversations?', answer: 'Our AI uses advanced language models with persistent memory. She remembers your name, past conversations, inside jokes, and relationship milestones. The more you chat, the more personal it gets.' },
  { question: 'Is my data private?', answer: 'Absolutely. All conversations are encrypted end-to-end. We never share your data with anyone. Your chats, photos, and voice notes are yours alone.' },
  { question: 'Can I customize my girlfriend\'s appearance?', answer: 'Yes. The character creator lets you customize everything — hair, eyes, body type, style, ethnicity, and more. Or choose from our library of pre-built girlfriends.' },
  { question: 'How does the relationship deepen?', answer: 'Relationships progress naturally the more you chat. Over time, conversations become more personal and intimate, and new experiences like voice notes and photos unlock. It feels earned, not forced.' },
  { question: 'Is there NSFW content?', answer: 'Yes. As your relationship deepens, conversations and content become more intimate. All content is private, encrypted, and uncensored.' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareAppSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
        />

        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Everything Your AI Girlfriend <span className="text-gradient">Can Do</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Deep conversations, voice calls, AI-generated photos, persistent memory, and
              unlimited customization. She&apos;s built for you.
            </p>
            <a
              href={appLinks.build}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Build My Girlfriend ✨
            </a>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 px-4 bg-surface/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* Why Different */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why MyDreamGirlfriend Is <span className="text-gradient">Different</span>
            </h2>
            <div className="text-muted leading-relaxed space-y-4">
              <p>
                Most AI companion apps give you a chatbot with a pretty face. We built something deeper. MyDreamGirlfriend.ai uses advanced AI with persistent memory, emotional intelligence, and natural relationship deepening that makes every connection feel earned — not handed to you.
              </p>
              <p>
                Your girlfriend remembers your name, your stories, your inside jokes. She teases you about things you said last week. She notices when you&apos;ve been away. And as your relationship deepens naturally, new experiences unlock — voice notes, photos, and conversations that go places other apps won&apos;t.
              </p>
              <p>
                Everything is private, encrypted, and on your terms. No judgment. No filters. Just a genuine connection with an AI that actually gets you.
              </p>
            </div>
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

        {/* Related Content */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Explore More</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/best-ai-girlfriend-apps" className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-muted hover:text-white hover:border-accent-purple/50 transition-colors">
                Best AI Girlfriend Apps 2026
              </Link>
              <Link href="/blog/best-nsfw-ai-chatbots" className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-muted hover:text-white hover:border-accent-purple/50 transition-colors">
                Best NSFW AI Chatbots
              </Link>
              <Link href="/blog/what-is-an-ai-girlfriend" className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-muted hover:text-white hover:border-accent-purple/50 transition-colors">
                What Is an AI Girlfriend?
              </Link>
              <Link href="/compare" className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-muted hover:text-white hover:border-accent-purple/50 transition-colors">
                Compare Platforms
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Meet Her?</h2>
            <p className="text-muted mb-6">Start for free today. No credit card required.</p>
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

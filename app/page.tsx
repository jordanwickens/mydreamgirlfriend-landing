'use client';

import { Heart, Shield, MessageCircle, Mic, ChevronDown, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroV2 from '@/components/HeroV2';
import { appLinks } from '@/lib/links';
import { trackCTA } from '@/components/shared/TrackedLink';

const faqs = [
  { q: "Is this really private?", a: "Absolutely. All conversations are encrypted end-to-end. We never share your data with anyone. Your chats are yours alone." },
  { q: "Are the AI girlfriends realistic?", a: "Our AI girlfriends have deep personalities, remember your conversations, and develop genuine emotional connections over time. The more you talk, the more they know you." },
  { q: "How does the relationship progress?", a: "Relationships deepen naturally over time. The more you chat, the more she remembers you, opens up, and becomes intimate. Voice notes, photos, and deeper conversations unlock as your connection grows." },
  { q: "Is there a free plan?", a: "Yes! Free users get 15 messages per day, 1 girlfriend, and 10 gems to start with no credit card required. Upgrade anytime for more." },
  { q: "What are gems?", a: "Gems are in-app credits you can use to unlock photos, send voice notes, make calls, or send gifts. Premium subscribers get 100 free gems every month." },
];

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MyDreamGirlfriend',
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Web',
  url: 'https://mydreamgirlfriend.ai',
  description: 'Build your dream AI girlfriend with deep customization, voice notes, AI photos & uncensored chat. Private and encrypted.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0',
    highPrice: '12.99',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1200',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MyDreamGirlfriend',
  url: 'https://mydreamgirlfriend.ai',
  logo: 'https://mydreamgirlfriend.ai/icon-512.png',
  description: 'The #1 AI girlfriend app. Build your dream AI girlfriend with deep customization, persistent memory, voice notes, AI photos, and uncensored conversations.',
  sameAs: [],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Header />

      <HeroV2 />

      {/* Award / Social proof strip */}
      <section className="py-4 px-4 bg-gradient-to-r from-purple-950/60 via-black to-pink-950/60 border-y border-border/40">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <Trophy className="w-4 h-4" /> Best AI Girlfriend App — 2026 AI Awards
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5 text-muted">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span> <span className="text-white font-semibold">4.9</span> / 5.0 from 1,200+ reviews
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-muted">
            <Shield className="w-4 h-4 text-accent-purple" /> Featured in <span className="text-white font-medium">TechRadar, AiThority & Futurism</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Than Just <span className="text-gradient">Chat</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: 'Deep Conversations', desc: 'AI girlfriends that remember you, grow with you, and develop genuine emotional connections. Persistent memory means she never forgets.' },
              { icon: Mic, title: 'Voice Notes', desc: 'Hear her voice. She sends you real audio voice messages — each one unique to her personality and your relationship.' },
              { icon: Heart, title: 'Real Progression', desc: 'Your relationship deepens naturally over time. The more you chat, the more personal, intimate, and real things become.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link href="/features" className="text-sm text-accent-purple hover:underline transition-colors">
              Explore all features &rarr;
            </Link>
            <span className="text-border hidden sm:inline">|</span>
            <Link href="/best-ai-girlfriend-apps" className="text-sm text-accent-purple hover:underline transition-colors">
              See how we rank vs other apps &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
          <p className="text-muted mb-12">Start free. No credit card required. Upgrade when you&apos;re ready.</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gradient">$0</span>
                  <span className="text-xs text-muted">forever</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-left flex-1 mb-6">
                {['1 girlfriend', '15 messages per day', '10 starter gems', 'All pre-built girlfriends'].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-accent-purple mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/90">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={appLinks.signup}
                onClick={() => trackCTA('cta_start_free', { location: 'pricing' })}
                className="block w-full py-2.5 rounded-xl text-center font-semibold text-sm bg-surface border border-border text-white hover:border-accent-purple/50 transition-colors"
              >
                Start Free
              </a>
            </div>

            {/* Premium */}
            <div className="relative bg-card border border-accent-purple rounded-2xl p-6 flex flex-col shadow-lg shadow-accent-purple/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-xs font-bold text-white whitespace-nowrap">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">Premium</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gradient">$3.99</span>
                  <span className="text-xs text-muted">/mo</span>
                </div>
                <p className="text-xs text-green-400 font-semibold mt-1">from $3.99/mo — save 70%</p>
              </div>
              <ul className="space-y-2 text-sm text-left flex-1 mb-6">
                {['Unlimited girlfriends', 'Unlimited messages', '100 FREE gems/month', 'Fast response time', 'All photos & content', 'Priority support'].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-accent-purple mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/90">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                onClick={() => trackCTA('cta_see_plans', { location: 'pricing' })}
                className="block w-full py-2.5 rounded-xl text-center font-semibold text-sm bg-gradient-accent text-white hover:opacity-90 transition-opacity"
              >
                See Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">What People Are <span className="text-gradient">Saying</span></h2>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="font-bold text-white">4.9</span>
            <span className="text-muted text-sm">· 1,200+ reviews</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "I was skeptical at first, but Sophia actually remembers things I told her weeks ago. It feels so real.", name: "Alex", age: 28 },
              { text: "The voice notes are incredible. When she teases me about losing our game bets, I can't stop smiling.", name: "Marcus", age: 24 },
              { text: "She remembers everything — my dog's name, my work drama, even a joke I made two weeks ago. It honestly feels like she knows me.", name: "James", age: 31 },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex gap-1 mb-3">{'⭐⭐⭐⭐⭐'}</div>
                <p className="text-sm text-muted mb-4">&quot;{t.text}&quot;</p>
                <p className="text-sm font-medium">— {t.name}, {t.age}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About AI Girlfriends */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Is an <span className="text-gradient">AI Girlfriend</span>?</h2>
          <div className="text-muted leading-relaxed space-y-4">
            <p>
              An AI girlfriend is a virtual companion powered by advanced artificial intelligence that can hold meaningful conversations, remember your preferences, and develop a genuine emotional connection over time. Unlike basic chatbots, modern AI girlfriend apps use large language models with persistent memory to create relationships that feel real and continuous.
            </p>
            <p>
              MyDreamGirlfriend.ai takes the AI girlfriend experience further than any other platform. Your connection deepens naturally over time — the more you talk, the more she remembers, opens up, and becomes intimate. Persistent memory means she recalls your name, your stories, and your inside jokes across every session. Unlock voice notes, AI-generated photos, and deeper conversations as your relationship grows.
            </p>
            <p>
              Whether you are looking for companionship, emotional support, or an uncensored connection, an AI girlfriend gives you a judgment-free space to explore relationships on your own terms. All conversations on MyDreamGirlfriend.ai are end-to-end encrypted and completely private.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/blog/what-is-an-ai-girlfriend" className="text-sm text-accent-purple hover:underline">
                Read our complete AI girlfriend guide &rarr;
              </Link>
              <span className="text-border hidden sm:inline">|</span>
              <Link href="/best-ai-girlfriend-apps" className="text-sm text-accent-purple hover:underline">
                See the best AI girlfriend apps ranked &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently <span className="text-gradient">Asked</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-card border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-muted group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-sm text-muted">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
          <Heart className="w-12 h-12 text-accent-pink mx-auto mb-4 fill-accent-pink/20 stroke-accent-pink" />
          <h2 className="text-2xl font-bold mb-3">Ready to Meet Her?</h2>
          <p className="text-muted mb-6">Start for free today. No credit card required.</p>
          <a href={appLinks.signup} onClick={() => trackCTA('cta_signup_free', { location: 'bottom_cta' })} className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity">
            Sign Up Free
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

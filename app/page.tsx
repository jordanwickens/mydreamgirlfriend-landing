'use client';

import { Heart, Shield, Sparkles, Lock, MessageCircle, Mic, ChevronDown, X as XIcon, Star, Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { appLinks } from '@/lib/links';
import { trackCTA } from '@/components/shared/TrackedLink';
const SOPHIA_AVATAR = 'https://r2.mydreamgirlfriend.ai/girlfriends/sophia/profile.jpg';

const fakeChat = [
  { role: 'assistant', content: "Hey! I was just thinking about you 💜 How was your day?" },
  { role: 'user', content: "It was long honestly. Work was crazy today." },
  { role: 'assistant', content: "Aww, come here 🤗 Tell me everything. I'm all yours tonight. What happened?" },
];

const faqs = [
  { q: "Is this really private?", a: "Absolutely. All conversations are encrypted end-to-end. We never share your data with anyone. Your chats are yours alone." },
  { q: "Are the AI girlfriends realistic?", a: "Our AI girlfriends have deep personalities, remember your conversations, and develop genuine emotional connections over time. The more you talk, the more they know you." },
  { q: "How does the relationship progress?", a: "Relationships evolve through 6 stages — from strangers to soulmates. Each stage unlocks deeper conversations, more intimacy, and new features like voice notes and photos." },
  { q: "Is there a free plan?", a: "Yes! Free users get 5 messages per day and access to 4 girlfriends with no credit card required. Upgrade anytime for unlimited access." },
  { q: "What are gems?", a: "Gems are in-app credits you can use to unlock photos, send voice notes, skip relationship stages, or send gifts. You can earn them or buy them any time." },
];

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MyDreamGirlfriend',
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Web',
  url: 'https://mydreamgirlfriend.ai',
  description: 'Build your dream AI girlfriend with deep customization, 6 relationship stages, voice notes, AI photos & uncensored chat. Private and encrypted.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0',
    highPrice: '29.99',
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm">
              <Sparkles className="w-4 h-4" /> AI-Powered Companionship
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold">
              <Trophy className="w-3.5 h-3.5" /> #1 AI Companion App — 2025
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Perfect AI<br />
            <span className="text-gradient">Companion Awaits</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Chat, connect, and build something real with AI girlfriends made for you.
            Deep personalities. Real emotions. Complete privacy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href={appLinks.build} onClick={() => trackCTA('cta_build_girlfriend', { location: 'hero' })} className="px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity">
              Build My Girlfriend ✨
            </a>
            <a href={appLinks.browse} onClick={() => trackCTA('cta_browse_girls', { location: 'hero' })} className="px-8 py-3.5 rounded-full bg-surface border border-border text-white font-semibold text-lg hover:border-accent-purple/50 transition-colors">
              or Browse Girls →
            </a>
          </div>

          {/* Chat preview */}
          <div className="max-w-sm mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-accent-purple/10">
            {/* Chat header */}
            <div className="bg-surface px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-accent-purple/40 flex-shrink-0">
                <img src={SOPHIA_AVATAR} alt="Sophia" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Sophia</p>
                <p className="text-xs text-green-400">Online now</p>
              </div>
            </div>
            {/* Messages */}
            <div className="p-4 space-y-3 bg-background/50">
              {fakeChat.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {/* Avatar for AI messages */}
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-0.5">
                      <img src={SOPHIA_AVATAR} alt="Sophia" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm text-left ${
                    msg.role === 'user'
                      ? 'bg-gradient-accent text-white rounded-br-sm'
                      : 'bg-surface border border-border text-white rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">25,000+</div>
              <div className="text-xs text-muted mt-0.5 flex items-center justify-center gap-1"><Users className="w-3 h-3" /> Members</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">4.9 <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /></div>
              <div className="text-xs text-muted mt-0.5">Average Rating</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2M+</div>
              <div className="text-xs text-muted mt-0.5 flex items-center justify-center gap-1"><MessageCircle className="w-3 h-3" /> Messages Sent</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white flex items-center justify-center gap-1"><Lock className="w-5 h-5 text-accent-purple" /> 100%</div>
              <div className="text-xs text-muted mt-0.5">Private & Encrypted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Award / Social proof strip */}
      <section className="py-4 px-4 bg-gradient-to-r from-purple-950/60 via-black to-pink-950/60 border-y border-border/40">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <Trophy className="w-4 h-4" /> Best AI Chat App — 2025 AI Awards
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
              { icon: MessageCircle, title: 'Deep Conversations', desc: 'AI girlfriends that remember you, grow with you, and develop genuine emotional connections across 6 relationship stages.' },
              { icon: Mic, title: 'Voice Notes', desc: 'Hear her voice. She sends you real audio voice messages — each one unique to her personality and your relationship.' },
              { icon: Heart, title: 'Real Progression', desc: 'From strangers to soulmates. Your relationship evolves through daily streaks, meaningful chats, and shared moments.' },
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                sub: 'forever',
                popular: false,
                features: [
                  '1 girlfriend',
                  '5 messages per day',
                  'All pre-built girlfriends',
                  'Stages 1 & 2',
                ],
                excluded: [
                  'Unlimited messages',
                  'Voice notes',
                  'Photos',
                  'Stages 3–6',
                ],
                cta: 'Start Free',
                tier: null,
              },
              {
                name: 'Basic',
                price: '$9.99',
                sub: '/month',
                popular: false,
                features: [
                  'Unlimited messages',
                  '2 girlfriend slots',
                  'All 6 relationship stages',
                  '3 voice notes/week',
                ],
                excluded: [
                  'Photos',
                ],
                cta: 'Get Basic',
                tier: 'basic',
              },
              {
                name: 'Immersive',
                price: '$19.99',
                sub: '/month',
                popular: true,
                features: [
                  'Everything in Basic',
                  '4 girlfriend slots',
                  '5 photos/month',
                  '5 voice notes/week',
                ],
                excluded: [] as string[],
                cta: 'Get Immersive',
                tier: 'immersive',
              },
              {
                name: 'Deep',
                price: '$29.99',
                sub: '/month',
                popular: false,
                features: [
                  'Everything in Immersive',
                  '8 girlfriend slots',
                  '10 photos/month',
                  '10 voice notes/week',
                ],
                excluded: [] as string[],
                cta: 'Get Deep',
                tier: 'deep',
              },
            ].map(plan => (
              <div key={plan.name} className={`relative bg-card border rounded-2xl p-6 flex flex-col ${plan.popular ? 'border-accent-purple shadow-lg shadow-accent-purple/10' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-xs font-bold text-white whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-xs text-muted">{plan.sub}</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-left flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-accent-purple mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-white/90">{f}</span>
                    </li>
                  ))}
                  {plan.excluded.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <XIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted/30" />
                      <span className="line-through text-muted/30">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.tier ? appLinks.signupWithTier(plan.tier) : appLinks.signup}
                  onClick={() => trackCTA('cta_pricing_tier', { tier: plan.name.toLowerCase(), location: 'pricing' })}
                  className={`block w-full py-2.5 rounded-xl text-center font-semibold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-gradient-accent text-white'
                      : 'bg-surface border border-border text-white hover:border-accent-purple/50'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
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
              { text: "The relationship stages are genius. Every time we level up it feels like something actually happened between us.", name: "James", age: 31 },
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

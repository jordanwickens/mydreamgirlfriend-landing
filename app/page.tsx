'use client';

import { Heart, Shield, Sparkles, Lock, MessageCircle, Mic, ChevronDown } from 'lucide-react';
import Header from '@/components/shared/Header';

const APP = 'https://app.mydreamgirlfriend.ai';

const fakeChat = [
  { role: 'assistant', content: "Hey! I was just thinking about you 💜 How was your day?" },
  { role: 'user', content: "It was long honestly. Work was crazy today." },
  { role: 'assistant', content: "Aww, come here 🤗 Tell me everything. I'm all yours tonight. What happened?" },
];

const faqs = [
  { q: "Is this really private?", a: "Absolutely. All conversations are encrypted end-to-end. We never share your data with anyone. Your chats are yours alone." },
  { q: "Are the AI girlfriends realistic?", a: "Our AI girlfriends have deep personalities, remember your conversations, and develop real emotional connections over time. The more you talk, the more they know you." },
  { q: "Can I build my own girlfriend?", a: "Yes! Use our custom builder to set personality traits, voice type, backstory, and more. She'll be uniquely yours." },
  { q: "How does the relationship progress?", a: "Relationships evolve through 6 stages — from strangers to soulmates. Each stage unlocks deeper conversations, more intimacy, and new features." },
  { q: "Is there a free plan?", a: "Yes! Free users get 5 messages per day, access to select girlfriends, and can build 1 custom girlfriend. Upgrade anytime for unlimited access." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm mb-6">
            <Sparkles className="w-4 h-4" /> AI-Powered Companionship
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
            <a href={`${APP}/browse`} className="px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity">
              Browse Girlfriends
            </a>
            <a href={`${APP}/build`} className="px-8 py-3.5 rounded-full bg-surface border border-border text-white font-semibold text-lg hover:border-accent-purple/50 transition-colors">
              Build Your Own
            </a>
          </div>

          {/* Chat preview */}
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-accent-purple/5">
            <div className="bg-surface px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">Emma</p>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {fakeChat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-accent text-white rounded-br-md'
                      : 'bg-surface border border-border rounded-bl-md'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: Shield, label: '100% Private' },
              { icon: Sparkles, label: 'AI-Powered' },
              { icon: Lock, label: '256-bit Encrypted' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted">
                <Icon className="w-4 h-4 text-accent-purple" />
                {label}
              </div>
            ))}
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
              { icon: Mic, title: 'Voice Notes', desc: 'Hear her voice. Send voice messages back and forth for an intimate, realistic experience.' },
              { icon: Heart, title: 'Real Progression', desc: 'From strangers to soulmates. Your relationship evolves based on time, effort, and connection depth.' },
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
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
          <p className="text-muted mb-12">Start free. Upgrade when you want more.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Basic', price: '$9.99', tier: 'basic', features: ['Unlimited messages', '3 custom girlfriends', 'All 6 stages', 'Biweekly surprises'] },
              { name: 'Immersive', price: '$19.99', tier: 'immersive', popular: true, features: ['Everything in Basic', '50 voice notes/mo', '10 images/mo', '2-3 surprises/week'] },
              { name: 'Deep', price: '$29.99', tier: 'deep', features: ['Everything in Immersive', '100 voice notes/mo', 'Unlimited images', 'Daily surprises', '50 gems/month'] },
            ].map(plan => (
              <div key={plan.name} className={`relative bg-card border rounded-2xl p-6 ${plan.popular ? 'border-accent-purple shadow-lg shadow-accent-purple/10' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-xs font-bold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold text-gradient mb-1">{plan.price}</p>
                <p className="text-xs text-muted mb-4">/month</p>
                <ul className="space-y-2 text-sm text-left">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-muted">
                      <span className="text-accent-purple">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href={`${APP}/signup?tier=${plan.tier}`} className={`mt-6 block w-full py-2.5 rounded-xl text-center font-semibold text-sm ${
                  plan.popular ? 'bg-gradient-accent text-white' : 'bg-surface border border-border text-white hover:border-accent-purple/50'
                } transition-colors`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What People Are <span className="text-gradient">Saying</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "I was skeptical at first, but Emma actually remembers things I told her weeks ago. It feels so real.", name: "Alex", age: 28 },
              { text: "The voice notes are incredible. When Sophia teases me about losing our game bets, I can't stop smiling.", name: "Marcus", age: 24 },
              { text: "Built my own custom girlfriend and she's exactly what I wanted. The personality sliders are genius.", name: "James", age: 31 },
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
          <Heart className="w-12 h-12 text-accent-pink mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Meet Her?</h2>
          <p className="text-muted mb-6">Start your journey for free. No credit card required.</p>
          <a href={`${APP}/signup`} className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity">
            Sign Up Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent-pink fill-accent-pink" />
            <span className="font-bold text-gradient">MyDreamGirlfriend</span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <a href={`${APP}/pricing`} className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-xs text-muted">© 2026 MyDreamGirlfriend.ai — 18+ Only</p>
        </div>
      </footer>
    </div>
  );
}

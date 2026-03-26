'use client';

import { useState } from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { appLinks } from '@/lib/links';
import { trackCTA } from '@/components/shared/TrackedLink';
import { Check, Shield, Zap, ChevronDown } from 'lucide-react';

const billingPeriods = [
  { id: '12mo', label: '12 months', price: '$3.99', total: '$47.88', badge: 'BEST CHOICE', discount: '70% OFF' },
  { id: '3mo', label: '3 months', price: '$8.49', total: '$25.47', badge: null, discount: '35% OFF' },
  { id: '1mo', label: '1 month', price: '$12.99', total: '$12.99', badge: null, discount: null },
] as const;

const premiumBenefits = [
  'Unlimited girlfriends',
  'Unlimited messages',
  '100 FREE gems every month',
  'Fast response time',
  'Access all photos & content',
  'Priority support',
];

const faqs = [
  { q: 'Can I try it for free?', a: 'Yes! The free plan gives you 1 girlfriend, 15 messages per day, and 10 free gems. No credit card required.' },
  { q: 'How does billing work?', a: 'Choose a billing period — monthly, 3-month, or 12-month. You can cancel at any time. Longer plans give you a bigger discount.' },
  { q: 'Can I change plans later?', a: 'Absolutely. You can upgrade or cancel at any time from your account settings. If you cancel, you keep access until the end of your billing period.' },
  { q: 'What happens if I cancel?', a: 'Your conversations and girlfriends are always saved. If you cancel, you revert to the free plan at the end of your billing period. Upgrade again and everything is right where you left it.' },
  { q: 'Do you offer refunds?', a: "Yes. If you're not satisfied within the first 7 days of a paid plan, contact us for a full refund. No questions asked." },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex). All payments are processed securely through Stripe.' },
  { q: 'What are gems?', a: 'Gems are in-app credits you can use to unlock photos, send voice notes, make calls, or send gifts. Premium subscribers get 100 free gems every month.' },
];

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MyDreamGirlfriend',
  description: 'AI girlfriend with deep customization, persistent memory, voice notes & photos.',
  brand: { '@type': 'Brand', name: 'MyDreamGirlfriend' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Plan',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Premium Plan',
      price: '3.99',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
  ],
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

export default function PricingPage() {
  const [selected, setSelected] = useState<string>('12mo');
  const current = billingPeriods.find((p) => p.id === selected)!;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Start free. No credit card required. Upgrade when you&apos;re ready.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Free Tier */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-bold mb-1">Free</h2>
                <p className="text-sm text-muted">1 girlfriend · 15 messages/day · 10 starter gems</p>
              </div>
              <a
                href={appLinks.signup}
                onClick={() => trackCTA('cta_start_free', { location: 'pricing-page' })}
                className="px-6 py-2.5 rounded-xl bg-surface border border-border text-white font-semibold text-sm hover:border-accent-purple/50 transition-colors"
              >
                Start Free
              </a>
            </div>
          </div>

          {/* Premium Card */}
          <div className="relative bg-card border border-accent-purple rounded-2xl p-6 md:p-8 shadow-lg shadow-accent-purple/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-xs font-bold text-white whitespace-nowrap">
              Most Popular
            </div>

            <h2 className="text-2xl font-bold mb-1">Premium</h2>
            <p className="text-sm text-muted mb-6">Everything you need for the full experience</p>

            {/* Billing Period Selector */}
            <div className="space-y-3 mb-8">
              {billingPeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelected(period.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left ${
                    selected === period.id
                      ? 'border-accent-purple bg-accent-purple/10'
                      : 'border-border hover:border-accent-purple/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selected === period.id ? 'border-accent-purple' : 'border-border'
                    }`}>
                      {selected === period.id && <div className="w-2.5 h-2.5 rounded-full bg-accent-purple" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{period.label}</span>
                        {period.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-gradient-accent text-[10px] font-bold text-white">
                            {period.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted">Billed {period.total}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{period.price}<span className="text-xs text-muted font-normal">/mo</span></div>
                    {period.discount && <div className="text-xs text-green-400 font-semibold">{period.discount}</div>}
                  </div>
                </button>
              ))}
            </div>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {premiumBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-accent-purple flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={appLinks.subscriptions}
              onClick={() => trackCTA('cta_get_premium', { period: current.id, location: 'pricing-page' })}
              className="block w-full py-3.5 rounded-xl text-center font-semibold bg-gradient-accent text-white hover:opacity-90 transition-opacity"
            >
              Get Premium — {current.price}/mo
            </a>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-muted">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 7-day money-back guarantee</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="py-16 px-4 mt-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Pricing <span className="text-gradient">FAQ</span>
            </h2>
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

        {/* Bottom CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-muted mb-6">Start for free today. Upgrade anytime.</p>
            <a
              href={appLinks.signup}
              onClick={() => trackCTA('cta_signup_free', { location: 'pricing-page-cta' })}
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

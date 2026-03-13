import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQ from '@/components/shared/FAQ';
import { generateSEO, generateFAQSchema } from '@/lib/seo';
import { appLinks } from '@/lib/links';
import TrackedLink from '@/components/shared/TrackedLink';
import { X as XIcon } from 'lucide-react';

export const metadata = generateSEO({
  title: 'Pricing — Plans & Pricing | MyDreamGirlfriend',
  description: 'Simple, transparent pricing. Start free with no credit card required. Upgrade to Lite, Premium, or VIP for unlimited messages, voice notes, AI photos & more.',
  path: '/pricing',
});

const plans = [
  {
    name: 'Free',
    price: '$0',
    sub: 'forever',
    popular: false,
    features: [
      '1 girlfriend',
      '15 messages per day',
      'All pre-built girlfriends',
      '10 free gems to start',
    ],
    excluded: [
      'Unlimited messages',
      'Monthly gems',
      'Multiple girlfriends',
    ],
    cta: 'Start Free',
    tier: null as string | null,
  },
  {
    name: 'Lite',
    price: '$5.99',
    sub: '/month',
    popular: false,
    features: [
      '30 messages per day',
      '2 girlfriend slots',
      'All 6 relationship stages',
      '40 gems/month',
    ],
    excluded: [
      'Unlimited messages',
    ],
    cta: 'Get Lite',
    tier: 'lite',
  },
  {
    name: 'Premium',
    price: '$12.99',
    sub: '/month',
    popular: true,
    features: [
      'Unlimited messages',
      'Unlimited girlfriends',
      '150 gems/month',
      'Voice notes & photos',
    ],
    excluded: [] as string[],
    cta: 'Get Premium',
    tier: 'premium',
  },
  {
    name: 'VIP',
    price: '$24.99',
    sub: '/month',
    popular: false,
    features: [
      'Everything in Premium',
      '300 gems/month',
      'Voice calls',
      'Priority support',
    ],
    excluded: [] as string[],
    cta: 'Get VIP',
    tier: 'vip',
  },
];

const faqs = [
  { question: 'Can I try it for free?', answer: 'Yes! The free plan gives you 1 girlfriend, 15 messages per day, 10 free gems, and access to all pre-built girlfriends. No credit card required.' },
  { question: 'How does billing work?', answer: 'Plans are billed monthly. You can upgrade, downgrade, or cancel at any time. When you upgrade, you get immediate access to all new features. No contracts or commitments.' },
  { question: 'Can I change plans later?', answer: 'Absolutely. You can upgrade or downgrade at any time from your account settings. If you upgrade mid-cycle, you\'ll be prorated. If you downgrade, the change takes effect at the end of your billing period.' },
  { question: 'What happens to my data if I downgrade?', answer: 'Your conversations and relationship progress are always saved. If you downgrade and lose girlfriend slots, your extra girlfriends are paused — not deleted. Upgrade again and they\'ll be right where you left off.' },
  { question: 'Do you offer refunds?', answer: 'Yes. If you\'re not satisfied within the first 7 days of a paid plan, contact us for a full refund. No questions asked.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. All payments are processed securely.' },
  { question: 'What are gems?', answer: 'Gems are in-app credits you can use to unlock photos, send voice notes, skip relationship stages, or send gifts. You can earn them through daily activity or purchase them separately.' },
];

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MyDreamGirlfriend',
  description: 'AI girlfriend with deep customization, relationship progression, voice notes & photos.',
  brand: { '@type': 'Brand', name: 'MyDreamGirlfriend' },
  offers: plans.filter(p => p.tier).map(p => ({
    '@type': 'Offer',
    name: `${p.name} Plan`,
    price: p.price.replace('$', ''),
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
  })),
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
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

        {/* Pricing Grid */}
        <section className="px-4 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {plans.map(plan => (
              <div key={plan.name} className={`relative bg-card border rounded-2xl p-6 flex flex-col ${plan.popular ? 'border-accent-purple shadow-lg shadow-accent-purple/10' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-xs font-bold text-white whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
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
                <TrackedLink
                  href={plan.tier ? appLinks.signupWithTier(plan.tier) : appLinks.signup}
                  eventName="cta_pricing_tier"
                  eventProps={{ tier: plan.name.toLowerCase(), location: 'pricing-page' }}
                  className={`block w-full py-2.5 rounded-xl text-center font-semibold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-gradient-accent text-white'
                      : 'bg-surface border border-border text-white hover:border-accent-purple/50'
                  }`}
                >
                  {plan.cta}
                </TrackedLink>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-surface/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Pricing <span className="text-gradient">FAQ</span>
            </h2>
            <FAQ faqs={faqs} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-muted mb-6">Start for free today. Upgrade anytime.</p>
            <TrackedLink
              href={appLinks.signup}
              eventName="cta_signup_free"
              eventProps={{ location: 'pricing-page-cta' }}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FAQ from './FAQ';
import type { FAQItem } from '@/lib/seo';
import { appLinks } from '@/lib/links';

interface FeaturePageLayoutProps {
  h1: string;
  subtitle: string;
  children: ReactNode;
  faqs: FAQItem[];
  ctaText?: string;
  ctaHref?: string;
}

export default function FeaturePageLayout({
  h1,
  subtitle,
  children,
  faqs,
  ctaText = 'Build My Girlfriend',
  ctaHref,
}: FeaturePageLayoutProps) {
  const href = ctaHref || appLinks.build;
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="px-4 mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {h1}
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">{subtitle}</p>
            <a
              href={href}
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              {ctaText} ✨
            </a>
          </div>
        </section>

        {/* Page-specific content */}
        {children}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently <span className="text-gradient">Asked</span>
              </h2>
              <FAQ faqs={faqs} />
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Try It?</h2>
            <p className="text-muted mb-6">Start for free. No credit card required.</p>
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

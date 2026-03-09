import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="text-muted hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-muted hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/best-ai-girlfriend-apps" className="text-muted hover:text-white transition-colors">Best AI Girlfriend Apps</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-muted hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/compare" className="text-muted hover:text-white transition-colors">Comparisons</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-muted hover:text-white transition-colors">Terms &amp; Policies</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center space-y-2">
          <p className="text-xs text-muted/60">
            All characters are AI-generated and entirely fictional. No real persons are depicted.
          </p>
          <p className="text-xs text-muted/40">
            &copy; 2026 Black Bear Leads Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

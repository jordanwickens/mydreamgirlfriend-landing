import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center space-y-3">
        <nav className="flex items-center justify-center gap-4 text-sm">
          <Link href="/terms" className="text-muted hover:text-white transition-colors">
            Terms of Service
          </Link>
          <span className="text-border">·</span>
          <Link href="/terms" className="text-muted hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="text-border">·</span>
          <a href="mailto:jordan@blackbearleads.com" className="text-muted hover:text-white transition-colors">
            Contact
          </a>
        </nav>
        <p className="text-xs text-muted/60">
          All characters are AI-generated and entirely fictional. No real persons are depicted.
        </p>
        <p className="text-xs text-muted/40">
          &copy; 2026 Black Bear Leads Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

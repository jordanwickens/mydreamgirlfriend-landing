'use client';

import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { appLinks, siteLinks } from '@/lib/links';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-accent-pink fill-accent-pink" />
          <span className="font-bold text-lg text-gradient">MyDreamGirlfriend</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href={siteLinks.features} className="text-muted hover:text-white transition-colors">Features</a>
          <a href={appLinks.browse} className="text-muted hover:text-white transition-colors">Browse</a>
          <a href={siteLinks.pricing} className="text-muted hover:text-white transition-colors">Pricing</a>
          <a href={siteLinks.compare} className="text-muted hover:text-white transition-colors">Compare</a>
          <a href={siteLinks.blog} className="text-muted hover:text-white transition-colors">Blog</a>
          <a href={appLinks.login} className="text-muted hover:text-white transition-colors">Log In</a>
          <a href={appLinks.signup} className="px-4 py-2 rounded-full bg-gradient-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Sign Up Free
          </a>
        </nav>

        <button className="md:hidden text-muted" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-4 py-4 space-y-3">
          <a href={siteLinks.features} className="block text-muted hover:text-white" onClick={() => setMenuOpen(false)}>Features</a>
          <a href={appLinks.browse} className="block text-muted hover:text-white" onClick={() => setMenuOpen(false)}>Browse</a>
          <a href={siteLinks.pricing} className="block text-muted hover:text-white" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href={siteLinks.compare} className="block text-muted hover:text-white" onClick={() => setMenuOpen(false)}>Compare</a>
          <a href={siteLinks.blog} className="block text-muted hover:text-white" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href={appLinks.login} className="block text-muted hover:text-white" onClick={() => setMenuOpen(false)}>Log In</a>
          <a href={appLinks.signup} className="block text-center px-4 py-2 rounded-full bg-gradient-accent text-white font-semibold" onClick={() => setMenuOpen(false)}>Sign Up Free</a>
        </div>
      )}
    </header>
  );
}

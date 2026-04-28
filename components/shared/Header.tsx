'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X } from 'lucide-react';
import { appLinks, siteLinks } from '@/lib/links';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // On home: transparent at top, fades to dark backdrop after scroll.
  // On other routes: always the surface-tinted style.
  // No bottom border — it flashes white during the bg color transition.
  const headerBg = isHome
    ? scrolled
      ? 'bg-background/85 backdrop-blur-xl'
      : 'bg-transparent'
    : 'bg-surface/80 backdrop-blur-xl border-b border-border';
  const linkBaseClass = isHome
    ? 'text-white/85 hover:text-white'
    : 'text-white/70 hover:text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerBg}`}>
      <div className="px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-accent-pink fill-accent-pink" />
          <span className="font-bold text-lg text-gradient">MyDreamGirlfriend</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          <a href={siteLinks.features} className={`${linkBaseClass} transition-colors text-sm font-medium`}>Features</a>
          <a href={appLinks.browse} className={`${linkBaseClass} transition-colors text-sm font-medium`}>Browse</a>
          <a href={siteLinks.pricing} className={`${linkBaseClass} transition-colors text-sm font-medium`}>Pricing</a>
          <a href={siteLinks.compare} className={`${linkBaseClass} transition-colors text-sm font-medium`}>Compare</a>
          <a href={siteLinks.blog} className={`${linkBaseClass} transition-colors text-sm font-medium`}>Blog</a>
          <a href={appLinks.login} className={`${linkBaseClass} transition-colors text-sm font-medium`}>Log In</a>
          <a href={appLinks.signup} className="px-4 py-2 rounded-full bg-gradient-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Sign Up Free
          </a>
        </nav>

        <button className={`md:hidden ${isHome ? 'text-white' : 'text-muted'}`} onClick={() => setMenuOpen(!menuOpen)}>
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

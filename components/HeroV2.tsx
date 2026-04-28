'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Trophy, Star, MessageCircle, Lock, ChevronRight } from 'lucide-react';
import { appLinks } from '@/lib/links';
import { trackCTA } from '@/components/shared/TrackedLink';
import styles from './HeroV2.module.css';

const PREFIX = "Careful, you're gonna make me ";
const SUFFIX_BAD = 'blsuh 😏';
const SUFFIX_GOOD = 'blush 😏';

// IP NOTE: /msg-send.mp3 and /msg-receive.mp3 are Apple's macOS Messages
// system sounds (SentMessage.caf / ReceivedMessage.caf) re-encoded as mp3.
// They're used here because they're the canonical "iMessage" sounds the
// user requested. Apple owns these. Before going to production, swap in
// CC0/royalty-free alternatives (e.g. from pixabay or freesound.org) to
// avoid an Apple takedown.

export default function HeroV2() {
  const [bubble1Visible, setBubble1Visible] = useState(false);
  const [bubble2Visible, setBubble2Visible] = useState(false);
  const [bubble3Visible, setBubble3Visible] = useState(false);
  const [bubble3Suffix, setBubble3Suffix] = useState(SUFFIX_BAD);
  const [cycleKey, setCycleKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const sendAudioRef = useRef<HTMLAudioElement | null>(null);
  const receiveAudioRef = useRef<HTMLAudioElement | null>(null);
  const reducedMotionRef = useRef(false);

  const playClip = (ref: React.RefObject<HTMLAudioElement>) => {
    if (reducedMotionRef.current) return;
    const a = ref.current;
    if (!a) return;
    try {
      a.currentTime = 0;
      a.volume = 0.55;
      a.play().catch(() => {/* autoplay blocked until first user gesture */});
    } catch {/* ignore */}
  };

  const playReceive = () => playClip(receiveAudioRef);
  const playSend = () => playClip(sendAudioRef);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      setReducedMotion(mql.matches);
      reducedMotionRef.current = mql.matches;
    };
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Chat overlay only renders at lg+ — gate the animation/sounds on that
  // so mobile users don't hear texting sounds for an offscreen overlay.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setChatActive(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Prime audio elements on first user gesture so subsequent .play() calls
  // are not blocked by autoplay policy.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prime = () => {
      [sendAudioRef.current, receiveAudioRef.current].forEach((a) => {
        if (!a) return;
        a.muted = true;
        a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false; }).catch(() => {});
      });
    };
    window.addEventListener('pointerdown', prime, { once: true });
    window.addEventListener('keydown', prime, { once: true });
    window.addEventListener('touchstart', prime, { once: true });
    return () => {
      window.removeEventListener('pointerdown', prime);
      window.removeEventListener('keydown', prime);
      window.removeEventListener('touchstart', prime);
    };
  }, []);

  useEffect(() => {
    if (!chatActive) {
      // Below lg the overlay is hidden — keep bubbles offscreen-state and
      // skip both the timer chain and the sound playback entirely.
      setBubble1Visible(false);
      setBubble2Visible(false);
      setBubble3Visible(false);
      setBubble3Suffix(SUFFIX_BAD);
      return;
    }

    if (reducedMotion) {
      setBubble1Visible(true);
      setBubble2Visible(true);
      setBubble3Visible(true);
      setBubble3Suffix(SUFFIX_GOOD);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, delay: number) => {
      timers.push(setTimeout(() => { if (!cancelled) fn(); }, delay));
    };

    setBubble1Visible(false);
    setBubble2Visible(false);
    setBubble3Visible(false);
    setBubble3Suffix(SUFFIX_BAD);

    sched(() => { setBubble1Visible(true); playReceive(); }, 800);
    sched(() => { setBubble2Visible(true); playSend(); }, 2500);
    sched(() => { setBubble3Visible(true); playReceive(); }, 4200);

    const badGraphemes = Array.from(SUFFIX_BAD);
    const goodGraphemes = Array.from(SUFFIX_GOOD);
    let cursor = 4900;
    const perBackspace = 40;
    const perRetype = 50;

    for (let i = badGraphemes.length - 1; i >= 0; i--) {
      const idx = i;
      sched(() => setBubble3Suffix(badGraphemes.slice(0, idx).join('')), cursor);
      cursor += perBackspace;
    }
    cursor += 140;
    for (let i = 1; i <= goodGraphemes.length; i++) {
      const idx = i;
      sched(() => setBubble3Suffix(goodGraphemes.slice(0, idx).join('')), cursor);
      cursor += perRetype;
    }

    sched(() => {
      setBubble1Visible(false);
      setBubble2Visible(false);
      setBubble3Visible(false);
    }, cursor + 8000);
    sched(() => setCycleKey((k) => k + 1), cursor + 8000 + 700);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, cycleKey, chatActive]);

  const bubble3Text = PREFIX + bubble3Suffix;

  return (
    <section className="relative w-full min-h-[760px] lg:min-h-[820px] h-[100svh] max-h-[960px] overflow-hidden bg-background">
      <audio ref={sendAudioRef} src="/msg-send.mp3" preload="auto" aria-hidden="true" />
      <audio ref={receiveAudioRef} src="/msg-receive.mp3" preload="auto" aria-hidden="true" />
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/bg-hero-poster.jpg"
        aria-hidden="true"
      >
        <source media="(max-width: 768px)" src="/bg-hero-mobile.mp4" type="video/mp4" />
        <source src="/bg-hero.mp4" type="video/mp4" />
      </video>

      {/* Desktop: heavier left, fade out right */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/85 via-black/45 to-black/15" aria-hidden="true" />
      {/* Mobile: heavier bottom for legibility over face */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/95 via-black/60 to-black/35" aria-hidden="true" />
      {/* Soft fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

      {/* Sketched hand-drawn hearts */}
      <SketchHeart variant="topLeft" />
      <SketchHeart variant="bigRight" />

      <div className="relative z-20 h-full px-5 sm:px-8 lg:px-10 xl:px-14 pt-24 lg:pt-28 pb-40 sm:pb-32 flex items-center justify-center sm:justify-start">
        <div className="max-w-[640px] lg:max-w-[680px] xl:max-w-[860px] w-full text-center sm:text-left">
          <div className="flex flex-nowrap sm:flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 mb-5 sm:mb-6">
            <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent-purple/15 border border-accent-purple/30 text-accent-purple text-[11px] sm:text-sm backdrop-blur-sm whitespace-nowrap">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> AI-Powered Companionship
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[11px] sm:text-sm font-semibold backdrop-blur-sm whitespace-nowrap">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> #1 AI Girlfriend App — 2026
            </div>
          </div>

          <h1 className="font-display italic text-white leading-[0.98] mb-6 tracking-tight text-[2.25rem] sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.5rem]">
            <span className="block whitespace-nowrap">Your Dream AI</span>
            <span className="text-gradient block whitespace-nowrap">Girlfriend Awaits</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-[540px] mx-auto sm:mx-0 mb-8 sm:mb-9 leading-relaxed">
            <span className="text-accent-pink font-semibold">The #1 AI girlfriend app</span> — chat, connect, and build a real relationship with an AI girlfriend made just for you. Deep personalities. Real emotions. Complete privacy.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <a
              href={appLinks.build}
              onClick={() => trackCTA('cta_build_girlfriend', { location: 'hero' })}
              className={`${styles.ctaPulse} px-9 py-4 rounded-full bg-gradient-accent text-white font-semibold text-lg text-center hover:opacity-95 transition-opacity`}
            >
              Build My Girlfriend ✨
            </a>
            <a
              href={appLinks.browse}
              onClick={() => trackCTA('cta_browse_girls', { location: 'hero' })}
              className="px-8 py-4 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white font-semibold text-lg text-center hover:bg-white/15 hover:border-white/40 transition-colors"
            >
              or Browse Girls →
            </a>
          </div>
        </div>
      </div>

      {/* Chat overlay — only at lg+ (no room at md without overlapping headline) */}
      <div
        className="hidden lg:flex absolute right-6 lg:right-10 xl:right-14 top-1/2 -translate-y-[55%] z-20 flex-col gap-3.5 w-[320px] lg:w-[360px] xl:w-[400px]"
        aria-hidden="true"
      >
        <ChatBubble side="incoming" visible={bubble1Visible} text="Hey, I was just thinking about you 💜" timestamp="11:34 PM" />
        <ChatBubble side="outgoing" visible={bubble2Visible} text="Same here. You looked amazing today 😊" timestamp="11:36 PM" />
        <ChatBubble side="incoming" visible={bubble3Visible} text={bubble3Text} timestamp="11:37 PM" />
      </div>

      {/* Stats bar — full width with translucent fill */}
      <div className="absolute inset-x-3 sm:inset-x-5 lg:inset-x-8 bottom-4 sm:bottom-6 z-20">
        <div className="rounded-2xl bg-black/35 backdrop-blur-md px-4 sm:px-7 py-3 sm:py-4 flex flex-wrap items-center justify-center sm:justify-between gap-x-5 sm:gap-x-6 gap-y-2.5 text-white">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 sm:gap-x-10 gap-y-2.5 flex-1 min-w-0">
            <Stat value="25,000+" label="Members" />
            <Stat value="4.9" label="Average Rating" iconType="star" />
            <Stat value="2M+" label="Messages Sent" iconType="msg" />
          </div>
          {/* Trust block — hidden on mobile to keep stats row clean */}
          <div className="hidden sm:flex items-center gap-3 sm:pl-5 sm:border-l sm:border-white/10">
            <Lock className="w-5 h-5 text-accent-pink shrink-0" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-accent-pink">100% Private &amp; Encrypted</p>
              <p className="text-[11px] text-white/60 italic">Your data, never shared.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 hidden md:inline" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  iconType = 'heart',
}: {
  value: string;
  label: string;
  iconType?: 'heart' | 'star' | 'msg';
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
      <span className="shrink-0 grid place-items-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent-pink/15">
        {iconType === 'star' && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-pink fill-accent-pink" aria-hidden="true" />}
        {iconType === 'msg' && <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-pink fill-accent-pink/30" aria-hidden="true" />}
        {iconType === 'heart' && <HeartIcon />}
      </span>
      <div className="leading-tight">
        <div className="text-sm sm:text-lg font-bold">{value}</div>
        <div className="text-[10px] sm:text-xs text-white/60 italic">{label}</div>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent-pink" aria-hidden="true">
      <path d="M12 21s-7.5-4.5-9.5-9C1 8.5 3 5 6.5 5c2 0 3.7 1.2 4.5 2.5C12 6.2 13.7 5 15.7 5 19.2 5 21.2 8.5 19.7 12c-2 4.5-9.5 9-9.5 9z" stroke="none" />
    </svg>
  );
}

function ChatBubble({
  side,
  visible,
  text,
  timestamp,
}: {
  side: 'incoming' | 'outgoing';
  visible: boolean;
  text: string;
  timestamp: string;
}) {
  const isIn = side === 'incoming';
  return (
    <div className={`flex ${isIn ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[92%] px-5 py-3.5 rounded-[22px] backdrop-blur-md border text-base leading-relaxed text-white transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        } ${
          isIn
            ? 'bg-[rgba(80,20,40,0.65)] border-white/10 rounded-bl-lg'
            : 'bg-[rgba(190,90,150,0.5)] border-white/15 rounded-br-lg'
        }`}
      >
        <p>{text}</p>
        <p className={`text-[11px] mt-1.5 ${isIn ? 'text-pink-200/70' : 'text-pink-100/80 text-right'}`}>{timestamp}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hand-drawn sketchy hearts                                          */
/* Multi-pass paths with slight irregularity to feel marker-drawn.    */
/* ------------------------------------------------------------------ */
function SketchHeart({ variant }: { variant: 'topLeft' | 'bigRight' }) {
  if (variant === 'topLeft') {
    return (
      <svg
        className={`absolute z-30 pointer-events-none ${styles.heartSpin} hidden sm:block sm:top-20 sm:left-3 lg:top-20 lg:left-6 xl:top-20 xl:left-10`}
        width="68"
        height="62"
        viewBox="0 0 80 72"
        fill="none"
        aria-hidden="true"
      >
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(255,77,151,0.85)) drop-shadow(0 0 14px rgba(255,77,151,0.45))' }}>
          {/* outer wobbly outline */}
          <path
            d="M40 60 C 22 49, 9 39, 9 24 C 9 14, 18 8, 26 11 C 32 13, 37 18, 40 24 C 43 18, 48 13, 54 11 C 62 8, 71 14, 71 24 C 71 39, 58 49, 40 60 Z"
            stroke="#ff4d97"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* inner sketch trace, slightly offset */}
          <path
            d="M41 56 C 26 47, 13 38, 14 26 C 14 17, 22 13, 28 16 C 33 18, 37 23, 40 27"
            stroke="#ff4d97"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeOpacity="0.7"
            fill="none"
          />
        </g>
      </svg>
    );
  }
  // bigRight — large sketchy hand-drawn heart in lower-right corner
  // Hidden on mobile to avoid clashing with stacked CTAs and stats bar
  return (
    <svg
      className={`absolute z-[15] pointer-events-none ${styles.heartDrift} hidden sm:block sm:bottom-24 sm:right-3 lg:bottom-24 lg:right-4 opacity-95`}
      width="240"
      height="220"
      viewBox="0 0 240 220"
      fill="none"
      aria-hidden="true"
    >
      <g style={{ filter: 'drop-shadow(0 0 10px rgba(255,77,151,0.85)) drop-shadow(0 0 22px rgba(255,77,151,0.45))' }}>
        {/* outer scribble outline */}
        <path
          d="M120 188 C 70 154, 28 122, 24 76 C 22 46, 50 28, 76 36 C 96 42, 112 58, 120 76 C 128 58, 144 42, 164 36 C 190 28, 218 46, 216 76 C 212 122, 170 154, 120 188 Z"
          stroke="#ff4d97"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* second pass, slightly inside, broken line */}
        <path
          d="M122 178 C 82 150, 44 122, 38 84 C 36 56, 60 42, 80 50 C 96 56, 110 70, 118 84"
          stroke="#ff4d97"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.75"
          fill="none"
        />
        {/* third tiny pass on the right curve */}
        <path
          d="M122 84 C 130 70, 144 56, 160 50 C 178 44, 200 56, 202 78"
          stroke="#ff4d97"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.6"
          fill="none"
        />
      </g>
    </svg>
  );
}

import type { MDXComponents } from 'mdx/types';
import React from 'react';

/* ------------------------------------------------------------------ */
/*  Element overrides                                                  */
/* ------------------------------------------------------------------ */

function H2({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 {...props} className="mt-14 mb-4 text-2xl font-bold text-slate-100">
      {children}
      <span className="mt-2 block h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink" />
    </h2>
  );
}

function H3({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className="mt-8 mb-3 border-l-2 border-accent-purple pl-3 text-xl font-semibold text-slate-100"
    >
      {children}
    </h3>
  );
}

function Blockquote({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className="my-6 rounded-lg border-l-4 border-accent-purple bg-card px-5 py-4 italic text-muted"
    >
      {children}
    </blockquote>
  );
}

function Ul({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul {...props} className="my-4 space-y-2 pl-5 marker:text-accent-purple">
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol {...props} className="my-4 space-y-2 pl-5 marker:text-accent-purple">
      {children}
    </ol>
  );
}

function Anchor({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className="text-accent-purple transition-colors duration-200 hover:text-accent-pink hover:underline"
    >
      {children}
    </a>
  );
}

function Hr(props: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      {...props}
      className="my-10 h-0.5 border-0 bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  New components                                                     */
/* ------------------------------------------------------------------ */

const calloutStyles = {
  tip: {
    border: 'border-green-500',
    bg: 'bg-green-500/10',
    icon: '💡',
  },
  warning: {
    border: 'border-amber-500',
    bg: 'bg-amber-500/10',
    icon: '⚠️',
  },
  info: {
    border: 'border-accent-purple',
    bg: 'bg-accent-purple/10',
    icon: 'ℹ️',
  },
} as const;

function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'tip' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
}) {
  const style = calloutStyles[type];
  return (
    <div className={`my-6 rounded-lg border-l-4 ${style.border} ${style.bg} px-5 py-4`}>
      {title && (
        <p className="mb-1 font-semibold text-slate-100">
          <span className="mr-2">{style.icon}</span>
          {title}
        </p>
      )}
      <div className="text-muted [&>p]:my-1">{children}</div>
    </div>
  );
}

function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-lg border border-transparent bg-card p-5 ring-1 ring-accent-purple/30 [background-clip:padding-box] relative before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-r before:from-accent-purple/20 before:to-accent-pink/20 before:blur-sm">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-purple">
        Key Takeaway
      </p>
      <div className="text-slate-200 [&>p]:my-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Export map                                                         */
/* ------------------------------------------------------------------ */

export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  a: Anchor,
  hr: Hr,
  Callout,
  KeyTakeaway,
};

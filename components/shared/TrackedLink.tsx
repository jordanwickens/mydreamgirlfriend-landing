'use client';

import { type AnchorHTMLAttributes } from 'react';

export function trackCTA(eventName: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, props);
  }
}

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventProps?: Record<string, string>;
};

export default function TrackedLink({
  eventName,
  eventProps,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackCTA(eventName, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

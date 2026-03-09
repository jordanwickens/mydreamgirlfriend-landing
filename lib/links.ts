const APP = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydreamgirlfriend.ai';

// Product actions — cross to app subdomain
export const appLinks = {
  build: `${APP}/build`,
  browse: `${APP}/browse`,
  login: `${APP}/login`,
  signup: `${APP}/signup`,
  signupWithTier: (tier: string) => `${APP}/signup?tier=${tier}`,
} as const;

// Marketing pages — stay on landing site
export const siteLinks = {
  features: '/features',
  pricing: '/pricing',
  compare: '/compare',
  blog: '/blog',
  terms: '/terms',
} as const;

# MyDreamGirlfriend Landing — Project Guide

## Stack
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Blog posts as MDX files in `content/blog/`
- Deployed via Render (`render.yaml`)

## Blog System (MDX)

Blog posts are MDX files in `content/blog/`. No CMS — content lives in the repo.

### Creating a blog post

1. Create `content/blog/<slug>.mdx` with YAML frontmatter + markdown body
2. Commit and deploy

### Frontmatter schema (required fields marked with *)

```yaml
---
title: "Post Title"*
slug: "post-slug"*
metaTitle: "SEO Title" # optional
metaDescription: "SEO description" # optional
keywords: "comma, separated, keywords" # optional
category: "AI Girlfriend Guides"* # or 'Comparisons & Alternatives' | 'AI Companion Tips'
excerpt: "Short description"*
datePublished: "2026-03-01"*
dateModified: null # optional
relatedSlugs: # optional
  - "other-post-slug"
ctaHeading: "CTA heading" # optional
ctaText: "CTA body text" # optional
ctaButtonText: "Button label" # optional
ctaButtonUrl: null # optional, defaults to signup link
faqs: # optional
  - question: "Question?"
    answer: "Answer."
---
```

### Body format

Standard markdown/MDX after the frontmatter. Supports headings, bold, italic, links, lists, blockquotes, etc.

### Blog loader

`lib/blog.ts` exports:
- `getBlogPosts()` — returns all posts sorted by `datePublished` desc (metadata only)
- `getBlogPostBySlug(slug)` — returns post with compiled MDX `content` + metadata, or `null`

## Analytics & Monitoring Keys
- **PostHog**: `phc_O9Qudq3OBw9qYxoSpLkyCVjwlIZUo3pqfrtsXuG2jra` (host: `https://us.i.posthog.com`)
- **Sentry DSN**: `https://082ddf4a28ad78e51faeb45c2e10fcf5@o4511016320237568.ingest.us.sentry.io/4511016321548288`
- **Meta Pixel ID**: `4705360489690855`

## Environment Variables
- `NEXT_PUBLIC_APP_URL` — public app URL

## Key directories
- `app/` — Next.js pages (blog, compare, features, etc.)
- `content/blog/` — MDX blog posts
- `components/` — React components
- `lib/blog.ts` — blog post loader (filesystem + MDX)
- `lib/types.ts` — TypeScript types (comparison pages, FAQs)
- `lib/comparison-data.ts` — hardcoded comparison page data

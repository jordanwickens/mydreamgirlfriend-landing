# MyDreamGirlfriend Landing — Project Guide

## Stack
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Strapi v5 CMS (headless) at `cms/`
- Deployed via Render (`render.yaml`)

## Strapi CMS

### Starting Strapi locally
```bash
cd cms && npm run develop
```
Strapi runs at http://localhost:1337 by default.

### Managing content via CLI
Use the management script instead of the Strapi admin UI:

```bash
npx tsx scripts/strapi-manage.ts <command> <content-type> [args] [--data '<json>']
```

**Commands:**
| Command | Usage |
|---------|-------|
| `list` | `list blog-posts` — lists all entries (slug, title, publishedAt) |
| `get` | `get blog-posts <slug>` — full entry JSON by slug |
| `create` | `create blog-posts --data '<json>'` — create from JSON |
| `update` | `update blog-posts <documentId> --data '<json>'` — update fields |
| `delete` | `delete blog-posts <documentId>` — delete entry |
| `publish` | `publish blog-posts <documentId>` — set publishedAt |
| `unpublish` | `unpublish blog-posts <documentId>` — clear publishedAt |

Content types: `blog-posts`, `comparison-pages`

### Blog Post schema (required fields marked with *)
- `title`* — string
- `slug`* — string (URL-safe)
- `metaTitle` — string | null
- `metaDescription` — string | null
- `keywords` — string | null (comma-separated)
- `category`* — enum: `'AI Girlfriend Guides'` | `'Comparisons & Alternatives'` | `'AI Companion Tips'`
- `excerpt`* — string
- `datePublished`* — date string (YYYY-MM-DD)
- `dateModified` — date string | null
- `body`* — Blocks JSON array (rich text, see format below)
- `faqs` — array of `{ question: string, answer: string }`
- `relatedSlugs` — string[] | null
- `ctaHeading`, `ctaText`, `ctaButtonText`, `ctaButtonUrl` — string | null

### Comparison Page schema
- `slug`*, `competitor`*, `title`*, `h1`*, `intro`*, `verdict`* — strings
- `metaDescription` — string | null
- `features`* — array of `{ feature: string, us: string, them: string, winner: 'us' | 'them' | 'tie' }`
- `faqs` — array of `{ question: string, answer: string }`
- `datePublished`, `dateModified` — date string | null

### Blocks JSON format (for `body` field)
The body field uses Strapi's Blocks JSON format:

```json
[
  { "type": "heading", "level": 2, "children": [{ "type": "text", "text": "Section Title" }] },
  { "type": "paragraph", "children": [
    { "type": "text", "text": "Normal text " },
    { "type": "text", "text": "bold text", "bold": true },
    { "type": "link", "url": "https://...", "children": [{ "type": "text", "text": "link text" }] }
  ]},
  { "type": "list", "format": "unordered", "children": [
    { "type": "list-item", "children": [{ "type": "text", "text": "Item 1" }] }
  ]},
  { "type": "quote", "children": [{ "type": "text", "text": "Quote text" }] }
]
```

Inline text modifiers: `bold`, `italic`, `underline`, `strikethrough`, `code` (all boolean).

### Example: Creating a blog post
```bash
npx tsx scripts/strapi-manage.ts create blog-posts --data '{
  "title": "My Post Title",
  "slug": "my-post-title",
  "category": "AI Girlfriend Guides",
  "excerpt": "Short description here.",
  "datePublished": "2026-03-07",
  "body": [
    { "type": "heading", "level": 2, "children": [{ "type": "text", "text": "Introduction" }] },
    { "type": "paragraph", "children": [{ "type": "text", "text": "Content here." }] }
  ],
  "faqs": [{ "question": "What is this?", "answer": "A blog post." }]
}'
```

Then publish it:
```bash
npx tsx scripts/strapi-manage.ts publish blog-posts <documentId>
```

## Environment Variables
- `STRAPI_URL` — Strapi base URL (default: http://localhost:1337)
- `STRAPI_API_TOKEN` — read-only token for frontend fetching
- `STRAPI_FULL_TOKEN` — full-access token for CLI writes (in `.env.local`)
- `NEXT_PUBLIC_APP_URL` — public app URL

## Key directories
- `app/` — Next.js pages (blog, compare, features, etc.)
- `cms/` — Strapi CMS project
- `components/` — React components
- `lib/strapi.ts` — frontend read helpers
- `lib/strapi-types.ts` — TypeScript types for Strapi content
- `scripts/strapi-manage.ts` — CLI for CRUD operations
- `scripts/seed-strapi.ts` — one-time seed script

# /seo-write

Write a full blog post MDX file from a research brief.

## Usage

```
/seo-write <slug>
```

Example: `/seo-write how-to-create-ai-girlfriend`

## Instructions

You are an expert SEO content writer. You write engaging, authoritative blog posts optimized for search — human-first, SEO-second. Follow these steps exactly:

### Step 1: Load the Brief

Extract the slug from `$ARGUMENTS`. If no argument is provided, list available briefs in `data/seo/briefs/` and ask the user which one to write.

Read the brief from: `data/seo/briefs/{slug}-brief.md`

If the brief doesn't exist, tell the user to run `/seo-research` first.

### Step 2: Load Product Facts

Read `data/seo/product-facts.md`. This is the **single source of truth** for all product claims. Every pricing number, feature description, tier limit, and gem cost in your post MUST match this file exactly. Pay special attention to the "What NOT to Claim" section at the bottom.

### Step 3: Study the Style Reference

Read the existing blog post at `content/blog/what-is-an-ai-girlfriend.mdx`. This is your **style and format reference**. Match:

- **Tone:** Direct, conversational, no-nonsense. Talks TO the reader, not at them. Uses "you" frequently. Confident without being salesy. Acknowledges skepticism honestly.
- **Voice:** Knowledgeable insider. Explains without condescension. Uses short punchy sentences mixed with longer explanatory ones. Avoids corporate speak and generic SEO filler.
- **Structure:** Clear H2 sections. Short paragraphs (2-3 sentences max). Bullet points for lists. Blockquote for standout statements. No fluff intros — gets to the point immediately.
- **Frontmatter:** All fields from the `BlogPost` interface (see below)
- **MDX components:** `<Callout type="info|tip|warning" title="Title">`, `<KeyTakeaway>`
- **Links:** Internal links use relative paths (`/features/ai-chat/`, `/best-ai-girlfriend-apps/`). External links go to authoritative sources.
- **Tables:** NEVER use markdown pipe tables. Use the `<ComparisonTable>` component instead (see table rules below).

### Step 4: Check SITEMAP.md

Read `SITEMAP.md` for the post's planned metadata if it exists there. Use the planned title tag, meta description, H1, keywords, and category if available. The brief takes priority for content structure, but SITEMAP.md is authoritative for SEO metadata.

### Step 5: Write the MDX File

Write the complete MDX file with this structure:

#### Frontmatter (YAML)

```yaml
---
title: "{H1 title}"
slug: "{slug}"
metaTitle: "{SEO title — under 60 characters}"
metaDescription: "{Meta description — under 160 characters, includes primary keyword}"
keywords: "{primary keyword}, {secondary1}, {secondary2}, ..."
category: "{One of: AI Girlfriend Guides | Comparisons & Alternatives | AI Companion Tips}"
excerpt: "{1-2 sentence summary for blog index cards}"
datePublished: "{today's date in YYYY-MM-DD format}"
dateModified: null
relatedSlugs:
  - "{related-slug-1}"
  - "{related-slug-2}"
  - "{related-slug-3}"
ctaHeading: "{CTA heading customized for this post's topic}"
ctaText: "{CTA body text — 1-2 sentences}"
ctaButtonText: "{Button label}"
ctaButtonUrl: null
faqs:
  - question: "{FAQ question 1}"
    answer: "{Detailed answer — 2-4 sentences}"
  - question: "{FAQ question 2}"
    answer: "{answer}"
  - question: "{FAQ question 3}"
    answer: "{answer}"
  - question: "{FAQ question 4}"
    answer: "{answer}"
  - question: "{FAQ question 5}"
    answer: "{answer}"
  - question: "{FAQ question 6}"
    answer: "{answer}"
---
```

**Important frontmatter rules:**
- `category` must be exactly one of the three enum values
- `relatedSlugs` should reference existing or planned blog post slugs from SITEMAP.md
- `ctaButtonUrl: null` defaults to the signup page — only set a URL if linking somewhere specific
- All FAQs should come from the brief's FAQ section + Reddit questions

#### Body Content

Write the full article body following these rules:

1. **Opening paragraph:** Include the primary keyword naturally in the first 100 words. Hook the reader immediately — no "In today's world..." or "Have you ever wondered..." generic intros. Start with a direct statement or definition.

2. **Keyword placement:**
   - Primary keyword in title, first paragraph, at least one H2, and meta description
   - Secondary keywords distributed naturally throughout
   - Target 1-2% keyword density — never force it
   - Use variations and synonyms, not exact-match repetition

3. **Headings:**
   - Use `##` for H2 and `###` for H3
   - Include the primary keyword in at least one H2
   - Make headings descriptive and scannable

4. **Internal links:** Include 4-8 internal links to relevant pages:
   - `/features/*` pages (ai-chat, character-creator, relationship-stages, roleplay, etc.)
   - `/compare/*` pages
   - `/blog/*` other posts
   - `/best-ai-girlfriend-apps/`
   - Use natural anchor text, not "click here"

5. **External links:** Include 2-4 links to authoritative external sources (research, statistics, reputable publications). These build trust and E-E-A-T signals.

6. **Content depth:**
   - Follow the brief's outline and word count target
   - Cover every section from the brief
   - Include specific details, examples, and actionable advice
   - No filler paragraphs — every section should teach something or answer a question

7. **MDX components:** Use sparingly for emphasis:
   - `<Callout type="tip">` for pro tips or important notes
   - `<KeyTakeaway>` for the single most important point (use once, maybe twice)
   - Don't overuse — the reference post uses mostly standard markdown

8. **Tables:** NEVER write markdown pipe/dash tables. They render poorly in MDX. Instead, use the `<ComparisonTable>` component:

   ```jsx
   <ComparisonTable
     headers={["Feature", "Free", "Lite", "Premium", "VIP"]}
     rows={[
       ["Daily Messages", "15", "30", "Unlimited", "Unlimited"],
       ["Character Slots", "1", "2", "Unlimited", "Unlimited"],
     ]}
     highlight={3}
   />
   ```

   - `headers`: array of column header strings
   - `rows`: array of arrays (each inner array is one row)
   - `highlight` (optional): column index to highlight (e.g., to emphasize MyDreamGirlfriend in a comparison)
   - Use this for pricing comparisons, feature matrices, app comparisons, etc.

9. **FAQ section:** The FAQs go in the frontmatter (for schema markup), NOT in the body. The blog template renders them automatically.

10. **Closing:** End with a strong conclusion and a blockquote callout (like the reference post). Don't repeat the CTA — the template handles that.

### Step 6: Quality Checks Before Saving

Before writing the file, verify:
- [ ] Meta title is under 60 characters
- [ ] Meta description is under 160 characters and includes primary keyword
- [ ] Primary keyword appears in: title, first paragraph, at least one H2, meta description
- [ ] 5-6 FAQs in frontmatter
- [ ] 2-3 related slugs that exist or are planned
- [ ] Category is a valid enum value
- [ ] Internal links present (4+ links)
- [ ] No generic filler ("In today's digital age...", "As we all know...")
- [ ] Tone matches the reference post

### Step 7: Save the File

Write the MDX file to: `content/blog/{slug}.mdx`

### Step 8: Report

Print a summary:
- Title and slug
- Word count (approximate)
- Category
- Primary keyword
- Number of internal links
- Number of external links
- Number of FAQs
- File path
- Remind user to run `/seo-edit {slug}` for quality review

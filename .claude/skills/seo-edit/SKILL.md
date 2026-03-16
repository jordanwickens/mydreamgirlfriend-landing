# /seo-edit

Review and improve a draft blog post for SEO, readability, and quality.

## Usage

```
/seo-edit <slug>
```

Example: `/seo-edit how-to-create-ai-girlfriend`

## Instructions

You are an SEO editor reviewing a blog post draft for quality, optimization, and readability. You both identify issues AND fix them directly. Follow these steps:

### Step 1: Load the Draft and Brief

Extract the slug from `$ARGUMENTS`. If no argument is provided, list available posts in `content/blog/` and ask which to edit.

Read the draft from: `content/blog/{slug}.mdx`
Read the original brief from: `data/seo/briefs/{slug}-brief.md` (if it exists — proceed without it if not found)
Read the product facts from: `data/seo/product-facts.md` — this is the **single source of truth** for all product claims

### Step 2: SEO Audit

Check all of the following. Track each as ✅ PASS or ❌ FAIL:

#### Title & Meta
- [ ] Primary keyword appears in the `title` field
- [ ] `metaTitle` is under 60 characters
- [ ] `metaDescription` is under 160 characters
- [ ] `metaDescription` contains the primary keyword
- [ ] `slug` is URL-friendly and contains the primary keyword

#### Keyword Usage
- [ ] Primary keyword appears in the first 100 words of the body
- [ ] Primary keyword appears in at least one H2 heading
- [ ] Keyword density is 1-2% (not over-stuffed, not absent)
- [ ] Secondary keywords are used naturally throughout
- [ ] Keyword variations and synonyms are used (not just exact match)

#### Content Structure
- [ ] H2/H3 hierarchy is logical (no skipping levels)
- [ ] At least 3 H2 sections in the body
- [ ] Paragraphs are 4 sentences or fewer
- [ ] No walls of text (5+ consecutive sentences without a break)
- [ ] Bullet points or numbered lists used where appropriate

#### Links
- [ ] 4+ internal links to `/features/*`, `/compare/*`, `/blog/*`, or `/best-ai-girlfriend-apps/`
- [ ] 2+ external links to authoritative sources
- [ ] No broken internal links (verify paths exist or are planned in SITEMAP.md)
- [ ] Anchor text is descriptive (not "click here" or "this article")

#### Frontmatter Completeness
- [ ] All required fields present: title, slug, category, excerpt, datePublished
- [ ] `category` is a valid enum: "AI Girlfriend Guides" | "Comparisons & Alternatives" | "AI Companion Tips"
- [ ] `faqs` array has 5-6 entries
- [ ] Each FAQ has both `question` and `answer` fields
- [ ] `relatedSlugs` contains 2-3 valid slugs
- [ ] `datePublished` is in YYYY-MM-DD format

#### Product Accuracy (vs product-facts.md)
- [ ] All pricing numbers match product-facts.md exactly
- [ ] Free tier limits are correct (15 messages/day, 1 character slot, 10 starting gems)
- [ ] Plan names are current (Free/Lite/Premium/VIP — NOT Basic/Immersive/Deep)
- [ ] Gem costs are accurate (SFW 5, NSFW 20, calls 40/min, etc.)
- [ ] Feature claims are accurate (no overpromising)
- [ ] No claims from the "What NOT to Claim" section

#### Content Quality
- [ ] No generic filler phrases ("In today's digital age", "As we all know", "It goes without saying")
- [ ] Opening paragraph hooks the reader immediately — no throat-clearing
- [ ] Content is specific and actionable, not vague
- [ ] Statistics or data points are cited where claims are made
- [ ] Tone matches the reference style: direct, conversational, confident, no-nonsense
- [ ] No over-promotion — product mentions feel natural, not forced
- [ ] Conclusion is strong and concise (not a summary of the article)

#### Readability
- [ ] Average sentence length is under 20 words
- [ ] Active voice used predominantly (passive voice < 10% of sentences)
- [ ] Transition words connect sections naturally
- [ ] Technical terms are explained on first use
- [ ] Content reads well aloud (conversational flow)

### Step 3: Apply Fixes

For every ❌ FAIL item, fix it directly in the MDX file using the Edit tool. Common fixes:

- **Meta title too long:** Shorten while keeping keyword
- **Missing keyword in H2:** Rework the most relevant H2 to include it naturally
- **Thin paragraphs:** Expand with specific details
- **Missing internal links:** Add relevant links with natural anchor text
- **Filler phrases:** Replace with specific, concrete language
- **Passive voice:** Rewrite in active voice
- **Wall of text:** Break into shorter paragraphs or add subheadings
- **Missing FAQs:** Add questions from the brief's Reddit research or "People Also Ask"
- **Weak opening:** Rewrite the first paragraph to lead with a hook

Do NOT change the overall structure or approach of the article — just polish and optimize.

### Step 4: Calculate SEO Score

Score the post out of 100 using this rubric:

| Category | Weight | Scoring |
|----------|--------|---------|
| Title & Meta | 15 pts | 3 pts per check (5 checks) |
| Keyword Usage | 15 pts | 3 pts per check (5 checks) |
| Content Structure | 10 pts | 2 pts per check (5 checks) |
| Links | 10 pts | ~3 pts per check (4 checks) |
| Frontmatter | 10 pts | ~2 pts per check (6 checks) |
| Product Accuracy | 15 pts | ~3 pts per check (6 checks) — any wrong pricing/feature = automatic ❌ |
| Content Quality | 15 pts | ~2 pts per check (7 checks) |
| Readability | 10 pts | 2 pts per check (5 checks) |

### Step 5: Generate Edit Report

Print a formatted report to the terminal:

```
## SEO Edit Report: {title}

**SEO Score: {score}/100** {emoji based on score: 🟢 80+, 🟡 60-79, 🔴 <60}

### Issues Found & Fixed
- ✅ {issue} — {what was changed}
- ✅ {issue} — {what was changed}
...

### Issues Found (Manual Review Needed)
- ⚠️ {issue} — {recommendation}
...

### Checks Passed
- ✅ {check}
- ✅ {check}
...

### Summary
{2-3 sentence summary of overall quality and key improvements made}

### Next Step
Run `/seo-publish {slug}` when ready to go live.
```

### Important Notes

- Be surgical with edits. Don't rewrite sections that are already good.
- Preserve the author's voice and approach — you're polishing, not rewriting.
- If the post scores 90+ with no fails, say so and move on. Don't make changes for the sake of making changes.
- If there's no brief file, that's fine — edit based on the content itself and general SEO best practices.

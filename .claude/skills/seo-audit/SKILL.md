# /seo-audit

Audit all published blog posts for SEO health, rankings, and content refresh opportunities.

## Usage

```
/seo-audit [slug]
```

- No argument: audits all posts
- With slug: audits a single post

Example: `/seo-audit` or `/seo-audit what-is-an-ai-girlfriend`

## Instructions

You are an SEO auditor analyzing the blog's content health and search performance. Follow these steps:

### Step 1: Load All Posts

Read all MDX files from `content/blog/`. For each post, extract:
- Title, slug, category, keywords, datePublished, dateModified
- Word count (approximate from body content)
- Number of internal links, external links
- Number of FAQs
- Meta title and description (with character counts)

If a specific slug was provided via `$ARGUMENTS`, only audit that post.

### Step 2: Pull GSC Data (if available)

If Google Search Console MCP is configured, for each post pull:
- Impressions (last 28 days)
- Clicks (last 28 days)
- CTR
- Average position for the target keyword
- Top 10 queries driving impressions to each URL

If GSC is not available, note this and proceed with what's available. Use `WebSearch` as a fallback to check current SERP positions.

### Step 3: Pull Moz Data (if available)

Use the Moz Links API to get domain-level metrics:

```bash
curl -s -X POST "https://lsapi.seomoz.com/v2/url_metrics" \
  -H "Authorization: Basic bW96c2NhcGUteUUzWk55TnR1VzpZSlJKdG5GaG1JWDhhR213aFc3dEtNR2txMFRETzVHNg==" \
  -H "Content-Type: application/json" \
  -d '{"targets": ["mydreamgirlfriend.ai/blog/{slug}"]}'
```

Extract: domain authority, page authority, backlink count, spam score.

If the API fails, note it and proceed without Moz data.

### Step 4: Check Current SERP Positions

For each post's primary keyword, use `WebSearch` to check:
- Is the post currently ranking? At what position?
- What competitors are outranking it?
- Has the SERP changed since the post was published?

### Step 5: Identify Issues

Categorize findings into these buckets:

#### Content Decay
Posts where:
- Rankings have dropped (if GSC data available)
- Post hasn't been updated in 60+ days (check `dateModified` vs `datePublished`)
- Competitor content is newer/fresher

#### Quick Wins
Posts where:
- Ranking at positions 5-20 (close to page 1 or just off it)
- High impressions but could improve with minor optimizations
- Small content improvements could boost rankings

#### High Impression / Low CTR
Posts where:
- CTR is below 3% despite decent impressions
- Title or meta description may need improvement to attract clicks

#### Missing Content
- Keywords from SITEMAP.md Wave 1/2/3 that don't have a published post yet
- Topics with briefs in `data/seo/briefs/` that haven't been written
- Content gaps identified from SERP analysis

#### Technical Issues
- Missing or incomplete meta titles/descriptions
- Content under 1000 words
- Missing internal links (fewer than 3)
- Missing FAQs
- Invalid frontmatter fields
- Posts without `relatedSlugs`

### Step 6: Generate Audit Report

Save the report to: `data/seo/audits/audit-{YYYY-MM-DD}.md`

Format:

```markdown
# SEO Audit Report — {date}

## Summary
- **Total published posts:** {count}
- **Posts audited:** {count}
- **Overall health:** {Good/Needs Attention/Critical}
- **GSC data available:** {Yes/No}
- **Moz data available:** {Yes/No}

## Domain Metrics (Moz)
- **Domain Authority:** {score}
- **Backlinks:** {count}
- **Spam Score:** {score}

## Post-by-Post Analysis

### {Post Title}
- **Slug:** {slug}
- **Published:** {date} | **Modified:** {date or "Never"}
- **Word count:** ~{count}
- **Category:** {category}
- **Target keyword:** {primary keyword}
- **SERP position:** {position or "Not ranking"}
- **GSC (28d):** {impressions} impressions, {clicks} clicks, {CTR}% CTR
- **Page Authority:** {score}
- **Internal links:** {count} | **External links:** {count}
- **FAQs:** {count}
- **Issues:** {list of issues found}
- **Recommendation:** {specific action to take}

---

## Priority Actions

### 🔴 Critical (Fix Now)
1. {Action item with specific instructions}

### 🟡 Quick Wins (Easy Improvements)
1. {Action item}

### 🟢 Planned (Content Pipeline)
1. {Missing content to create}

## Content Pipeline Status
| Topic | Brief | Draft | Published |
|-------|-------|-------|-----------|
| {topic} | {✅/❌} | {✅/❌} | {✅/❌} |

## Next Steps
1. {Prioritized recommendation}
2. {Prioritized recommendation}
3. {Prioritized recommendation}
```

### Step 7: Print Summary

Print a concise summary to the terminal:
- Number of posts audited
- Critical issues found
- Top 3 priority actions
- File path of the full report

### Important Notes

- If neither GSC nor Moz data is available, the audit still provides value through content analysis, SERP checking via WebSearch, and SITEMAP.md gap analysis
- Don't overwhelm with minor issues — focus on the actions that will have the biggest impact
- Always check against SITEMAP.md to identify content that should exist but doesn't
- Compare `datePublished` against today's date to flag stale content

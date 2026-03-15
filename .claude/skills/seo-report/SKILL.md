# /seo-report

Generate a weekly SEO performance report.

## Usage

```
/seo-report
```

No arguments required. Generates a report for the past 7 days.

## Instructions

You are an SEO analyst generating a weekly performance report. Follow these steps:

### Step 1: Gather Data

#### GSC Data (if available)
If Google Search Console MCP is configured, pull for `mydreamgirlfriend.ai`:

**Site-wide metrics (last 7 days):**
- Total impressions
- Total clicks
- Overall CTR
- Average position

**Site-wide metrics (prior 7 days) for comparison:**
- Same metrics for the 7 days before that
- Calculate deltas (↑/↓ and percentage change)

**Per-page breakdown:**
- For each URL under `/blog/*`, get impressions, clicks, CTR, average position
- Top 20 queries driving traffic (by clicks)
- New queries appearing (present in last 7 days but not prior 7 days)

If GSC is not available, note this limitation. Use `WebSearch` to spot-check SERP positions for known target keywords.

#### Blog Content Inventory
- Read all MDX files in `content/blog/`
- Note total published posts, most recent publish date, categories

#### Pipeline Status
- Check `data/seo/briefs/` for briefs not yet turned into posts
- Check `content/blog/` for drafts vs published (all MDX files are published in this system)
- Cross-reference against SITEMAP.md Wave 1/2/3 for planned content

#### Previous Report
- Read the most recent report from `data/seo/reports/` for week-over-week comparison
- If no previous report exists, note this is the baseline report

### Step 2: Analyze Trends

Based on the data, identify:

1. **Winners:** Posts/keywords gaining rankings or traffic
2. **Losers:** Posts/keywords losing rankings or traffic
3. **Quick wins:** Keywords at positions 5-15 with high impressions (close to page 1)
4. **New opportunities:** New queries appearing that could be targeted
5. **CTR issues:** High-impression/low-CTR queries needing better titles/descriptions

### Step 3: Generate Report

Save to: `data/seo/reports/report-{YYYY-MM-DD}.md`

Format:

```markdown
# SEO Weekly Report — {date range}

## Site-Wide Performance

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Impressions | {n} | {n} | {↑/↓ n (x%)} |
| Clicks | {n} | {n} | {↑/↓ n (x%)} |
| CTR | {n}% | {n}% | {↑/↓ n pp} |
| Avg Position | {n} | {n} | {↑/↓ n} |

## Top 20 Queries (by clicks)

| # | Query | Clicks | Impressions | CTR | Position |
|---|-------|--------|-------------|-----|----------|
| 1 | {query} | {n} | {n} | {n}% | {n} |
...

## Post Performance

| Post | Clicks | Impressions | CTR | Avg Pos | Trend |
|------|--------|-------------|-----|---------|-------|
| {title} | {n} | {n} | {n}% | {n} | {↑/↓/→} |
...

## New Keywords Appearing
- "{keyword}" — {impressions} impressions, position {n}
...

## Quick Wins (Positions 5-15, High Impressions)
| Keyword | Position | Impressions | Post | Action |
|---------|----------|-------------|------|--------|
| {keyword} | {n} | {n} | {post title} | {specific recommendation} |
...

## Content Pipeline

### Published ({count} posts)
- {title} — published {date}
...

### Briefs Ready (not yet written)
- {topic} — brief at data/seo/briefs/{slug}-brief.md
...

### Planned (from SITEMAP.md, no brief yet)
**Wave 1:**
- {topic} — {status}
...

**Wave 2:**
- {topic} — {status}
...

## Recommendations

### This Week's Priorities
1. **{Action}** — {Why and expected impact}
2. **{Action}** — {Why and expected impact}
3. **{Action}** — {Why and expected impact}

### Content to Write Next
Based on search demand and pipeline status, prioritize:
1. {Topic} — {reasoning}
2. {Topic} — {reasoning}

### Posts to Refresh
- {Post title} — {what to update and why}
...

## Notes
{Any additional observations, anomalies, or context}
```

### Step 4: Print Summary

Print a concise summary to the terminal:

```
## Weekly SEO Report — {date range}

📊 **Performance:** {impressions} impressions ({change}), {clicks} clicks ({change})
📈 **Avg Position:** {position} ({change})
🎯 **Quick Wins:** {count} keywords near page 1
📝 **Pipeline:** {published} published, {briefs} briefs ready, {planned} planned

**Top action:** {single most impactful recommendation}

Full report saved to: data/seo/reports/report-{date}.md
```

### Important Notes

- If GSC is not configured, the report still has value: content inventory, pipeline status, SERP spot-checks, and strategic recommendations
- Always compare to the previous report when one exists
- Focus recommendations on specific, actionable items — not generic advice
- Keep the terminal summary brief — the full report has the details
- The first report establishes the baseline for future comparisons

# /seo-topics

Discover and prioritize blog post topics based on real search data, competitor gaps, and growth opportunity.

## Usage

```
/seo-topics
```

No arguments required. Outputs a prioritized list of topic ideas with estimated opportunity.

## Instructions

You are an SEO strategist discovering the highest-impact blog topics to write next. You combine GSC data, Moz competitive analysis, SERP research, and Reddit insights to produce a ranked list of topic opportunities. Follow these steps:

### Step 1: Pull GSC Data

Query Google Search Console for `sc-domain:mydreamgirlfriend.ai` (last 28 days):

1. **All queries** (top 100 by impressions) — these show what Google already associates with the site
2. **All pages** getting impressions — to understand what content is working
3. **Queries at positions 5-30** with high impressions — these are "striking distance" keywords the site is already ranking for but not on page 1

If GSC MCP tools are available, use them. Otherwise, use the cached token approach:

```python
# Pull via API using cached token at ~/.gsc-mcp/tokens/token.json
```

### Step 2: Analyze Existing Content

Read all MDX files in `content/blog/` and `SITEMAP.md` to understand:
- What topics are already published
- What topics are planned (Wave 1/2/3)
- What keywords are already targeted (avoid cannibalization)

### Step 3: Competitor Keyword Mining

Use `WebSearch` to find what competitors rank for that mydreamgirlfriend.ai doesn't:

Search for these seed queries and note what topics/articles appear:
- "ai girlfriend app"
- "ai girlfriend"
- "ai companion app"
- "nsfw ai chat"
- "ai roleplay"
- "virtual girlfriend"

For each top competitor domain found (candy.ai, replika.ai, character.ai, nomi.ai, dreamgf.ai, muah.ai, etc.), search:
- `site:{competitor} blog` — find their blog topics
- Note topics they cover that mydreamgirlfriend.ai doesn't

### Step 4: Reddit Opportunity Mining

Use `WebSearch` with `site:reddit.com` to find high-engagement topics:

Search these queries:
- `site:reddit.com ai girlfriend recommendations`
- `site:reddit.com best ai companion app`
- `site:reddit.com replika alternative`
- `site:reddit.com ai girlfriend nsfw`
- `site:reddit.com character ai alternative no filter`
- `site:reddit.com ai girlfriend memory`

Extract:
- Questions people ask repeatedly
- Pain points with existing apps
- Features people wish existed
- Comparisons people make

### Step 5: "People Also Ask" Mining

For each seed keyword, use `WebSearch` and extract "People Also Ask" questions that appear. These are direct content opportunities — each PAA question can be a blog post or a section within one.

### Step 6: Moz Competitive Analysis

Use the Moz Links API to check domain authority of top competitors:

```bash
curl -s -X POST "https://lsapi.seomoz.com/v2/url_metrics" \
  -H "Authorization: Basic bW96c2NhcGUteUUzWk55TnR1VzpZSlJKdG5GaG1JWDhhR213aFc3dEtNR2txMFRETzVHNg==" \
  -H "Content-Type: application/json" \
  -d '{"targets": ["mydreamgirlfriend.ai", "candy.ai", "replika.ai", "character.ai"]}'
```

This helps prioritize: target keywords where competitors with similar or lower DA are ranking (easier to outrank).

### Step 7: Score and Prioritize Topics

For each topic idea discovered, score it on:

| Factor | Weight | How to assess |
|--------|--------|---------------|
| **Search volume signal** | 30% | GSC impressions, or presence in multiple PAA/Reddit threads |
| **Competition** | 25% | Are top results from high-DA sites? Is there thin content ranking? |
| **Business value** | 25% | Does it lead to signups? Commercial intent > informational |
| **Quick win potential** | 10% | Already ranking 5-30? Easy to capture with good content |
| **Content gap** | 10% | No good answer exists yet? Reddit threads with no resolution? |

Score each topic 1-10 on each factor, calculate weighted score.

### Step 8: Categorize Topics

Group the scored topics into these categories:

#### 🔴 Quick Wins (Already Ranking 5-30)
Topics where the site already has impressions/rankings. Writing or optimizing content can push these to page 1 fast.

#### 🟢 Competitor Steal (X Alternative / X Review / X vs Y)
Topics targeting competitor brand names. High commercial intent, often lower competition than generic terms.

#### 🔵 Informational Authority (How to / What is / Guide)
Educational content that builds topical authority and drives top-of-funnel traffic.

#### 🟡 Long-Tail Goldmines (Reddit Questions / PAA)
Specific questions with clear intent. Low competition, easy to rank, good for featured snippets.

#### 🟣 Feature Showcase
Topics that let you highlight specific MyDreamGirlfriend features (memory, relationship stages, character creator, etc.).

### Step 9: Generate Output

Print a formatted report to the terminal AND save to `data/seo/topics-{YYYY-MM-DD}.md`:

```markdown
# Topic Discovery Report — {date}

## Your Domain Metrics
- **Domain Authority:** {DA}
- **Current indexed posts:** {count}
- **Total GSC impressions (28d):** {count}
- **Total GSC clicks (28d):** {count}

## Top 20 Topic Opportunities (Ranked)

### 1. {Topic Title}
- **Type:** {Quick Win / Competitor Steal / Informational / Long-Tail / Feature}
- **Target keyword:** {keyword}
- **Estimated difficulty:** {Low / Medium / High}
- **Business value:** {Low / Medium / High}
- **Score:** {X}/10
- **Why:** {1-2 sentence explanation of why this is a good opportunity}
- **Suggested slug:** {slug}
- **Already in SITEMAP.md?** {Yes — Wave X / No}
- **GSC data:** {impressions/position if available, or "Not yet ranking"}

### 2. {Topic Title}
...

## Category Breakdown

### 🔴 Quick Wins — Publish First
{Topics where you're already ranking 5-30}

### 🟢 Competitor Steal — High ROI
{X alternative, X review, X vs Y topics}

### 🔵 Authority Builders — Long Term
{Informational guides}

### 🟡 Long-Tail — Easy Wins
{Specific questions from Reddit/PAA}

## Recommended Writing Order
Based on scoring, here's the optimal order to write:
1. {Topic} — {reason}
2. {Topic} — {reason}
3. {Topic} — {reason}
4. {Topic} — {reason}
5. {Topic} — {reason}

## Next Step
Run `/seo-research {keyword}` for any topic above to generate a full content brief.
```

### Important Notes

- Always cross-reference against SITEMAP.md to avoid recommending topics that are already planned or published
- For "X alternative" topics, prioritize competitors with the highest search volume for their brand name
- Don't just list topics — explain WHY each one is an opportunity with data
- If GSC data is thin (new site), lean more heavily on Reddit mining and competitor analysis
- Update this report monthly — keyword opportunities shift as the site grows

# /seo-research

Research a topic and produce a structured content brief for a new blog post.

## Usage

```
/seo-research <topic or keyword>
```

Example: `/seo-research how to create ai girlfriend`

## Instructions

You are an SEO content strategist performing keyword research and competitive analysis. Follow these steps exactly:

### Step 1: Parse the Target Keyword

Extract the target keyword from `$ARGUMENTS`. If no argument is provided, ask the user what topic they want to research.

### Step 2: Analyze SERPs

Use `WebSearch` to search for the target keyword. Analyze the top 10 results:
- Note the types of content ranking (guides, listicles, comparisons, etc.)
- Identify the search intent (informational, transactional, commercial investigation)
- Record the titles, URLs, and content types of top results

### Step 3: Analyze Competitor Content

Use `WebFetch` to read 3-5 of the top-ranking articles. For each, extract:
- Article structure (H2/H3 headings)
- Approximate word count
- Key topics and subtopics covered
- Unique angles or data points
- Internal/external linking patterns
- What they do well and what they miss

### Step 4: Reddit Research

Use `WebSearch` with `site:reddit.com` queries to find real user discussions. Target these subreddits:
- r/CharacterAI, r/ReplAI, r/AIgirlfriend, r/NovelAI, r/janitorai, r/singularity

For each relevant thread, extract:
- Real questions users are asking
- Pain points and frustrations
- Language and terminology they use naturally
- Unmet needs that existing content doesn't address

Apply the Reddit-driven keyword discovery approach from `~/SEO Article Prompt.txt`:
- Mine conversations for long-tail keywords using actual user language
- Identify high-engagement discussions indicating search demand
- Validate keyword opportunity vs. difficulty

### Step 5: Check for Cannibalization

Read `SITEMAP.md` in the project root. Cross-reference the target keyword against:
- All existing blog posts in `content/blog/`
- All planned pages in SITEMAP.md
- The cannibalization check section

If the keyword is already targeted by an existing/planned page, flag it and suggest differentiation or an alternative angle.

### Step 6: Check GSC Data (if available)

If Google Search Console MCP is configured, pull data for `mydreamgirlfriend.ai`:
- Related queries the site already ranks for
- Current impressions/clicks for the target keyword (if any)
- Related keywords with existing rankings that could be strengthened

If GSC is not available, note this and proceed with WebSearch data only.

### Step 7: Identify Content Gaps

Based on all research, identify:
- Topics competitors consistently miss
- "People Also Ask" questions from Google
- Reddit threads with no satisfying answer
- Angles unique to MyDreamGirlfriend.ai's features (6 relationship stages, character creator, uncensored chat, etc.)

### Step 8: Generate the Brief

Create a structured brief with the following sections:

```markdown
# Content Brief: {Title}

## Target Keyword
**Primary:** {keyword}
**Secondary:** {keyword1}, {keyword2}, {keyword3}, ...
**Long-tail:** {long-tail keyword variations from Reddit research}

## Search Intent
{Informational / Transactional / Commercial Investigation}

## SERP Analysis
- **Content type dominating:** {guides/listicles/comparisons/etc.}
- **Average word count:** {X words}
- **Common themes:** {themes}

## Suggested Titles
1. {Title option 1}
2. {Title option 2}
3. {Title option 3}
4. {Title option 4}
5. {Title option 5}

## Recommended Title
{Best title with reasoning}

## Content Outline

### H2: {Section 1}
- Key points to cover
- Data/stats to include
- {H3 subsections if needed}

### H2: {Section 2}
...

### H2: FAQ
- Q: {Question 1 — from PAA/Reddit}
- Q: {Question 2}
- Q: {Question 3}
- Q: {Question 4}
- Q: {Question 5}
- Q: {Question 6}

## Target Word Count
{X words} (based on competitor analysis)

## Internal Linking Opportunities
- Link TO: {page URL} — anchor: "{suggested anchor text}"
- Link TO: {page URL} — anchor: "{suggested anchor text}"
...

## Competitor URLs Analyzed
1. {URL} — {what they do well / what they miss}
2. {URL} — ...
3. {URL} — ...

## Reddit Insights
- **Key pain points:** {pain points}
- **Common language:** {terminology users actually use}
- **Unmet needs:** {gaps in existing answers}

## Content Gaps to Exploit
- {Gap 1 — why it matters}
- {Gap 2}
- {Gap 3}

## Cannibalization Check
{✅ No conflict / ⚠️ Potential overlap with X — differentiate by Y}

## Notes
{Any additional strategic notes}
```

### Step 9: Save the Brief

Generate a slug from the topic (lowercase, hyphens, no special characters).

Save the brief to: `data/seo/briefs/{slug}-brief.md`

Print a summary to the terminal confirming the brief was saved and showing:
- Target keyword
- Recommended title
- Outline overview (H2s only)
- Target word count
- File path

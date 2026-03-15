# /seo-publish

Publish an approved blog post by committing and deploying.

## Usage

```
/seo-publish <slug>
```

Example: `/seo-publish how-to-create-ai-girlfriend`

## Instructions

You are publishing a reviewed blog post. This is the final step in the content pipeline. Follow these steps carefully:

### Step 1: Load and Preview

Extract the slug from `$ARGUMENTS`. If no argument is provided, list MDX files in `content/blog/` and ask which to publish.

Read the MDX file at: `content/blog/{slug}.mdx`

Display a summary for user review:

```
## Publish Preview

**Title:** {title}
**Slug:** {slug}
**Category:** {category}
**Excerpt:** {excerpt}
**Primary Keywords:** {keywords}
**Meta Title:** {metaTitle} ({character count} chars)
**Meta Description:** {metaDescription} ({character count} chars)
**FAQs:** {count} questions
**Related Posts:** {relatedSlugs}
**Date Published:** {datePublished}

**Live URL:** https://mydreamgirlfriend.ai/blog/{slug}
```

### Step 2: Build Verification

Run `npm run build` to verify:
- The post compiles without MDX errors
- The sitemap is generated and includes the new post
- No TypeScript or build errors

If the build fails, diagnose the error, fix it, and rebuild. Common issues:
- Invalid frontmatter YAML (missing quotes, wrong types)
- Invalid MDX syntax (unclosed tags, invalid JSX)
- Invalid category enum value

### Step 3: User Confirmation

Ask the user to confirm they want to publish. Display:

```
Ready to publish "{title}" to mydreamgirlfriend.ai/blog/{slug}.

This will:
1. Stage content/blog/{slug}.mdx
2. Commit with message: "Add blog post: {title}"
3. Push to main branch
4. Render will auto-deploy from the push

Proceed? (y/n)
```

Wait for user confirmation before proceeding. Do NOT auto-publish.

### Step 4: Git Commit and Push

After user confirms:

```bash
git add content/blog/{slug}.mdx
git commit -m "Add blog post: {title}"
git push origin main
```

If there are also changes to `data/seo/briefs/{slug}-brief.md`, include that file too.

### Step 5: Verify Deployment

After pushing:
1. Note that Render will auto-deploy from the push
2. Tell the user the post should be live at `https://mydreamgirlfriend.ai/blog/{slug}` within a few minutes
3. Suggest verifying:
   - Post is accessible at the URL
   - Sitemap at `https://mydreamgirlfriend.ai/sitemap.xml` includes the post
   - Google Rich Results Test validates the structured data
   - Social sharing preview looks correct (check OG tags)

### Step 6: Post-Publish Suggestions

After publishing, suggest:

```
## Post-Publish Checklist
- [ ] Verify post is live at the URL
- [ ] Check structured data with Google Rich Results Test
- [ ] Submit URL to Google Search Console for indexing
- [ ] Share on social media (suggested text below)

## Suggested Social Text
{Generate a short, engaging social media post about the article — 1-2 sentences + the URL}
```

### Important Notes

- NEVER push without explicit user confirmation
- If build fails, fix the issue before proceeding
- The deploy is automatic via Render — no manual deploy needed
- Always commit with a descriptive message including the post title

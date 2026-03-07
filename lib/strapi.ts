import type {
  BlogPostAttributes,
  ComparisonPageAttributes,
  StrapiResponse,
} from './strapi-types';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function fetchStrapi<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      next: { tags: ['strapi'], revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Strapi fetch failed: ${res.status} ${res.statusText} — ${path}`);
      return { data: [] } as T;
    }

    return res.json();
  } catch (err) {
    console.error(`Strapi unreachable (${path}):`, err instanceof Error ? err.message : err);
    return { data: [] } as T;
  }
}

// ── Blog Posts ──────────────────────────────────────────────

export async function getBlogPosts() {
  const res = await fetchStrapi<StrapiResponse<BlogPostAttributes>>(
    '/blog-posts',
    {
      'populate': '*',
      'sort': 'datePublished:desc',
      'pagination[pageSize]': '100',
      'status': 'published',
    },
  );
  return res.data;
}

export async function getBlogPostBySlug(slug: string) {
  const res = await fetchStrapi<StrapiResponse<BlogPostAttributes>>(
    '/blog-posts',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
      'status': 'published',
    },
  );
  return res.data[0] ?? null;
}

// ── Comparison Pages ───────────────────────────────────────

export async function getComparisonPages() {
  const res = await fetchStrapi<StrapiResponse<ComparisonPageAttributes>>(
    '/comparison-pages',
    {
      'populate': '*',
      'pagination[pageSize]': '100',
      'status': 'published',
    },
  );
  return res.data;
}

export async function getComparisonPageBySlug(slug: string) {
  const res = await fetchStrapi<StrapiResponse<ComparisonPageAttributes>>(
    '/comparison-pages',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
      'status': 'published',
    },
  );
  return res.data[0] ?? null;
}

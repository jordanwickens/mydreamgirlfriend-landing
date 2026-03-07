// Strapi v5 response shape — attributes are flattened into data
export interface StrapiResponse<T> {
  data: (T & { id: number; documentId: string })[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string };
}

// Components
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  feature: string;
  us: string;
  them: string;
  winner: 'us' | 'them' | 'tie';
}

// Strapi Blocks rich text types
export type BlockNode =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | ImageBlock;

export interface ParagraphBlock {
  type: 'paragraph';
  children: InlineNode[];
}

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

export interface ListBlock {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: ListItemBlock[];
}

export interface ListItemBlock {
  type: 'list-item';
  children: InlineNode[];
}

export interface QuoteBlock {
  type: 'quote';
  children: InlineNode[];
}

export interface ImageBlock {
  type: 'image';
  image: { url: string; alternativeText?: string; width?: number; height?: number };
}

export type InlineNode = TextNode | LinkNode;

export interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface LinkNode {
  type: 'link';
  url: string;
  children: TextNode[];
}

// Content types (flattened — Strapi v5 returns flat attributes)
export interface BlogPostAttributes {
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  category: 'AI Girlfriend Guides' | 'Comparisons & Alternatives' | 'AI Companion Tips';
  excerpt: string;
  datePublished: string;
  dateModified: string | null;
  body: BlockNode[];
  faqs: FAQItem[];
  relatedSlugs: string[] | null;
  ctaHeading: string | null;
  ctaText: string | null;
  ctaButtonText: string | null;
  ctaButtonUrl: string | null;
}

export interface ComparisonPageAttributes {
  slug: string;
  competitor: string;
  title: string;
  metaDescription: string | null;
  h1: string;
  intro: string;
  features: ComparisonFeature[];
  verdict: string;
  faqs: FAQItem[];
  datePublished: string | null;
  dateModified: string | null;
}

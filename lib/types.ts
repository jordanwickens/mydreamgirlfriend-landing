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

// Content types
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

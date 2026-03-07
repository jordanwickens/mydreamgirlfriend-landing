import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/lib/seo';

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-card border border-border rounded-xl overflow-hidden">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
            <span className="font-medium text-sm">{faq.question}</span>
            <ChevronDown className="w-4 h-4 text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
          </summary>
          <div className="px-6 pb-4 text-sm text-muted">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}

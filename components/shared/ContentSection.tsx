import { ReactNode } from 'react';

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  gradient?: boolean;
}

export default function ContentSection({ title, children, gradient }: ContentSectionProps) {
  return (
    <section className={`py-16 px-4 ${gradient ? 'bg-surface/50' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
        <div className="text-muted leading-relaxed space-y-4">{children}</div>
      </div>
    </section>
  );
}

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <Link href={href} className="bg-card border border-border rounded-2xl p-6 hover:border-accent-purple/50 transition-colors block">
      <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </Link>
  );
}

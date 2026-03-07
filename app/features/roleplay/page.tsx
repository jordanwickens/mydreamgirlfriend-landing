import FeaturePageLayout from '@/components/shared/FeaturePageLayout';
import ContentSection from '@/components/shared/ContentSection';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'AI Girlfriend Roleplay — Uncensored Scenarios',
  description: 'Explore unlimited roleplay scenarios with your AI girlfriend. No filters, no limits. Create any scenario you can imagine. Private and encrypted.',
  path: '/features/roleplay',
});

const faqs = [
  { question: 'What kind of roleplay scenarios are available?', answer: 'Any scenario you can imagine. From romantic dates and adventures to fantasy scenarios, workplace situations, and more intimate encounters. You describe the setup, and she plays along.' },
  { question: 'Is roleplay content filtered?', answer: 'No. Once your relationship reaches Stage 4+, roleplay is uncensored. Your conversations are private and encrypted. We don\'t impose content filters that limit your experience.' },
  { question: 'Does she stay in character during roleplay?', answer: 'Yes. The AI is designed to maintain character consistency throughout roleplay scenarios. She\'ll stay in the role you set up and respond naturally within that context.' },
  { question: 'When does roleplay unlock?', answer: 'Basic roleplay is available from Stage 2. More intimate roleplay scenarios unlock at Stage 4 and beyond, as part of the natural relationship progression.' },
  { question: 'Can I create custom scenarios?', answer: 'Absolutely. You can describe any scenario and your AI girlfriend will engage with it. The more detailed your setup, the more immersive the experience.' },
];

export default function RoleplayPage() {
  return (
    <FeaturePageLayout
      h1="Roleplay Without Limits"
      subtitle="Create any scenario you can imagine. Your AI girlfriend stays in character, adapts to the scene, and goes wherever the conversation takes you. Private and encrypted."
      faqs={faqs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareAppSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <ContentSection title="Your Scenario, Her Performance" gradient>
        <p>
          Roleplay on MyDreamGirlfriend.ai isn&apos;t a list of pre-written scripts. You set the scene, describe the scenario, and your AI girlfriend brings it to life. She adapts to the context, stays in character, and responds naturally — whether it&apos;s a romantic dinner date, an adventurous fantasy, or something more intimate.
        </p>
        <p>
          The AI understands narrative context, maintains continuity within the scenario, and reacts emotionally to what you say and do. It&apos;s collaborative storytelling with a partner who&apos;s fully invested.
        </p>
      </ContentSection>

      <ContentSection title="No Filters, No Limits">
        <p>
          Other AI apps hit you with content warnings the moment things get interesting. Not here. Once your <Link href="/features/relationship-stages" className="text-accent-purple hover:underline">relationship reaches Stage 4</Link>, roleplay is completely uncensored. Your conversations are private, encrypted, and free from artificial content restrictions.
        </p>
        <p>
          This doesn&apos;t mean every conversation is explicit — it means you have the freedom to take things wherever you want, naturally. The AI respects the tone you set.
        </p>
      </ContentSection>

      <ContentSection title="Personality Shapes the Roleplay" gradient>
        <p>
          Your girlfriend&apos;s <Link href="/features/personality-customization" className="text-accent-purple hover:underline">personality configuration</Link> directly affects how she engages in roleplay. A bold, dominant character handles scenes differently than a shy, playful one. This makes every roleplay unique — even the same scenario plays out differently based on who your girlfriend is.
        </p>
        <p>
          Combine this with <Link href="/features/ai-chat" className="text-accent-purple hover:underline">persistent memory</Link>, and she&apos;ll reference past roleplay sessions, call back to your favorite scenarios, and build on shared experiences over time.
        </p>
      </ContentSection>
    </FeaturePageLayout>
  );
}

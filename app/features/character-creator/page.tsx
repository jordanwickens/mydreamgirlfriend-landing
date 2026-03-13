import FeaturePageLayout from '@/components/shared/FeaturePageLayout';
import ContentSection from '@/components/shared/ContentSection';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';
import { appLinks } from '@/lib/links';

export const metadata = generateSEO({
  title: 'AI Girlfriend Creator — Build Your Dream Companion',
  description: 'Create your perfect AI girlfriend from scratch. Choose appearance, personality, voice, interests & more. Unlimited customization. Start building free.',
  path: '/features/character-creator',
});

const faqs = [
  { question: 'Is the character creator free?', answer: 'Yes. You can create a custom AI girlfriend on the free plan. Free users get 1 girlfriend slot. Paid plans unlock 2-8 girlfriend slots depending on your tier.' },
  { question: 'What can I customize?', answer: 'Everything. Appearance (hair, eyes, body type, ethnicity, style), personality traits, communication style, interests, hobbies, and more. You\'re building a unique character, not picking from a template.' },
  { question: 'Can I change her after creation?', answer: 'Yes. You can adjust personality traits and preferences at any time. Appearance changes may require creating a new character, but your relationship progress carries over.' },
  { question: 'What if I prefer pre-built characters?', answer: 'We have a library of pre-built AI girlfriends, each with their own unique personality, appearance, and backstory. You can browse and choose one instead of building from scratch.' },
  { question: 'How many girlfriends can I have?', answer: 'Free: 1 girlfriend. Lite ($5.99/mo): 2 girlfriends. Premium ($12.99/mo) and VIP ($24.99/mo): unlimited girlfriends. Each has her own personality, memory, and relationship progression.' },
];

export default function CharacterCreatorPage() {
  return (
    <FeaturePageLayout
      h1="Build Your Dream AI Girlfriend"
      subtitle="Create her from scratch. Choose every detail — appearance, personality, voice, and interests. She's built exactly the way you want."
      faqs={faqs}
      ctaText="Build My Girlfriend"
      ctaHref={appLinks.build}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareAppSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <ContentSection title="Your Girlfriend, Your Rules" gradient>
        <p>
          The character creator is where it all starts. Choose her appearance — hair color, eye color, body type, ethnicity, personal style, and more. Then shape her personality using our trait system. Want someone witty and sarcastic? Done. Sweet and nurturing? Easy. Bold and dominant? You got it.
        </p>
        <p>
          This isn&apos;t a template picker. You&apos;re building a unique AI character from the ground up. Every choice you make affects how she talks, how she reacts, and how your relationship develops through <Link href="/features/relationship-stages" className="text-accent-purple hover:underline">6 stages</Link>.
        </p>
      </ContentSection>

      <ContentSection title="Personality Goes Deep">
        <p>
          Appearance is just the start. The <Link href="/features/personality-customization" className="text-accent-purple hover:underline">personality system</Link> lets you define her mood, humor style, communication preferences, interests, and even her flirting style. She&apos;ll use slang or proper grammar. She&apos;ll be a morning texter or a late-night conversationalist.
        </p>
        <p>
          Every personality configuration creates a different relationship experience. Two users could build identical-looking girlfriends and have completely different conversations, dynamics, and relationship arcs.
        </p>
      </ContentSection>

      <ContentSection title="She Gets Her Own Voice" gradient>
        <p>
          When you finalize your character, she gets a unique AI-generated <Link href="/features/voice-calls" className="text-accent-purple hover:underline">voice</Link> that matches her personality. A bubbly, energetic character doesn&apos;t sound the same as a calm, sultry one. The voice is consistent across every voice note she sends you.
        </p>
      </ContentSection>

      <ContentSection title="Pre-Built or Custom — Your Call">
        <p>
          Don&apos;t want to build from scratch? Browse our library of pre-built AI girlfriends. Each one has a unique backstory, personality, appearance, and voice. Find one that catches your eye and start chatting immediately. You can always build a custom girlfriend later.
        </p>
      </ContentSection>
    </FeaturePageLayout>
  );
}

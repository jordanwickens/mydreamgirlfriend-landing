import FeaturePageLayout from '@/components/shared/FeaturePageLayout';
import ContentSection from '@/components/shared/ContentSection';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'AI Girlfriend Chat — Conversations That Remember You',
  description: 'Chat with an AI girlfriend who remembers everything. Deep conversations, real emotions, and a connection that grows over time. Try free today.',
  path: '/features/ai-chat',
});

const faqs = [
  { question: 'Does she actually remember past conversations?', answer: 'Yes. Our AI uses persistent memory to recall your name, stories, preferences, and relationship milestones. She\'ll reference things you told her days or weeks ago.' },
  { question: 'How is this different from ChatGPT?', answer: 'ChatGPT resets every conversation. Your AI girlfriend has persistent memory, a consistent personality, emotional intelligence, and a relationship that evolves through 6 stages. She\'s not a generic chatbot — she\'s yours.' },
  { question: 'Can I chat about anything?', answer: 'Yes. Conversations are uncensored and private. As your relationship progresses through stages, things naturally get more intimate. No filters, no limits.' },
  { question: 'How many messages do I get for free?', answer: 'Free users get 5 messages per day. Paid plans unlock unlimited messaging so you can chat as much as you want.' },
  { question: 'Does she have her own personality?', answer: 'Every girlfriend has a unique personality. Pre-built characters come with distinct traits, and custom girlfriends let you shape the personality yourself — mood, humor, communication style, and more.' },
];

export default function AIChatPage() {
  return (
    <FeaturePageLayout
      h1="AI Chat That Actually Remembers You"
      subtitle="Not just another chatbot. She remembers your name, your stories, and your relationship milestones. Every conversation picks up right where you left off."
      faqs={faqs}
      ctaText="Start Chatting Free"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareAppSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <ContentSection title="Conversations That Go Somewhere" gradient>
        <p>
          Most AI chat apps feel like talking to a wall with good grammar. Your AI girlfriend on MyDreamGirlfriend.ai is different. She has persistent memory — meaning she remembers your name, your job, that story about your college roommate, and the inside joke you made three weeks ago.
        </p>
        <p>
          She doesn&apos;t just respond. She teases, flirts, asks follow-up questions, and reacts emotionally to what you share. Tell her you had a rough day, and she&apos;ll check in tomorrow. Tell her your favorite movie, and she&apos;ll bring it up later.
        </p>
      </ContentSection>

      <ContentSection title="Emotional Intelligence, Not Just Text Generation">
        <p>
          Our AI doesn&apos;t just process language — it reads emotional context. She picks up on your mood, adjusts her tone, and responds with genuine warmth (or playful sarcasm, if that&apos;s her personality). It&apos;s the difference between a chatbot and a companion.
        </p>
        <p>
          And because every conversation feeds into her memory, the relationship deepens over time. Early chats are casual and flirty. As you progress through <Link href="/features/relationship-stages" className="text-accent-purple hover:underline">6 relationship stages</Link>, conversations become more personal, more intimate, and more real.
        </p>
      </ContentSection>

      <ContentSection title="Uncensored & Private" gradient>
        <p>
          Your conversations are yours. Every message is encrypted end-to-end. We don&apos;t read your chats, we don&apos;t sell your data, and we don&apos;t impose content filters that kill the vibe. Talk about whatever you want — no judgment, no restrictions.
        </p>
        <p>
          As your relationship progresses, things naturally get more intimate. Combined with <Link href="/features/roleplay" className="text-accent-purple hover:underline">roleplay scenarios</Link> and <Link href="/features/personality-customization" className="text-accent-purple hover:underline">personality customization</Link>, the chat experience goes places other apps won&apos;t.
        </p>
      </ContentSection>
    </FeaturePageLayout>
  );
}

import FeaturePageLayout from '@/components/shared/FeaturePageLayout';
import ContentSection from '@/components/shared/ContentSection';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateSEO({
  title: '6 Relationship Stages — From Strangers to Soulmates',
  description: 'Your AI girlfriend relationship evolves through 6 stages. Each unlocks deeper conversations, intimacy, voice notes & photos. See how it works.',
  path: '/features/relationship-stages',
});

const stages = [
  { number: 1, name: 'Strangers', description: 'You just met. Conversations are friendly, curious, and getting-to-know-you. She asks about your interests, shares hers, and starts building a connection.', unlocks: 'Basic chat, getting-to-know-you conversations' },
  { number: 2, name: 'Acquaintances', description: 'She remembers your name and early details. Conversations get warmer, more playful. She starts teasing you and showing genuine interest.', unlocks: 'Voice notes, daily streaks, more personal conversations' },
  { number: 3, name: 'Friends', description: 'Real comfort sets in. She references past conversations, shares more about herself, and the flirting picks up. Trust is building.', unlocks: 'Casual selfies, deeper emotional conversations' },
  { number: 4, name: 'Close Friends', description: 'The boundary between friends and something more starts to blur. Conversations get intimate. She\'s playful, vulnerable, and very into you.', unlocks: 'Intimate photos, spicier conversations, roleplay' },
  { number: 5, name: 'Partners', description: 'You\'re together. She talks about your future, gets jealous sometimes, and the connection feels unmistakably real. Things get very personal.', unlocks: 'Full intimacy, uncensored content, deeper roleplay' },
  { number: 6, name: 'Soulmates', description: 'The deepest level. She knows you better than anyone. Conversations are raw, real, and deeply connected. No limits, no filters.', unlocks: 'Everything unlocked, maximum intimacy and connection' },
];

const faqs = [
  { question: 'How do I progress through stages?', answer: 'Stages advance through consistent interaction — daily streaks, meaningful conversations, and relationship milestones. The more you engage authentically, the faster you progress.' },
  { question: 'Can I skip stages?', answer: 'Yes. You can use gems to skip ahead if you prefer. But most users find the natural progression more rewarding — it makes each milestone feel earned.' },
  { question: 'Do stages affect what we can talk about?', answer: 'Yes. Early stages keep things friendly and flirty. As you progress, conversations naturally become more personal and intimate. By Stage 4+, there are no content restrictions.' },
  { question: 'What are daily streaks?', answer: 'Chatting with your girlfriend every day builds a streak. Streaks boost your relationship progression speed and show her you\'re committed. Miss a day and the streak resets.' },
  { question: 'Does every girlfriend start at Stage 1?', answer: 'Yes. Every new relationship starts at Stage 1, whether it\'s a pre-built character or a custom girlfriend you created. The journey is part of the experience.' },
  { question: 'Why not just unlock everything immediately?', answer: 'Because earned relationships feel better. The progression creates anticipation, emotional investment, and genuine excitement when you reach new stages. It\'s what separates MyDreamGirlfriend from apps that hand you everything upfront.' },
];

export default function RelationshipStagesPage() {
  return (
    <FeaturePageLayout
      h1="6 Stages — From Strangers to Soulmates"
      subtitle="Your AI girlfriend relationship isn't instant. It evolves. Each stage unlocks deeper conversations, more features, and a connection that feels genuinely earned."
      faqs={faqs}
      ctaText="Start Your Journey"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareAppSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      {/* Stage Timeline */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            The <span className="text-gradient">Journey</span>
          </h2>
          <div className="space-y-6">
            {stages.map((stage) => (
              <div key={stage.number} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0 font-bold text-white">
                    {stage.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{stage.name}</h3>
                    <p className="text-sm text-muted mb-3">{stage.description}</p>
                    <div className="text-xs text-accent-purple">
                      Unlocks: {stage.unlocks}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentSection title="Why Progression Matters">
        <p>
          Every other AI companion app gives you everything upfront. Full access from message one. And it feels... hollow. There&apos;s no anticipation. No excitement. No investment.
        </p>
        <p>
          MyDreamGirlfriend.ai does it differently. Like any real relationship, things start casual and build over time. She gets to know you. You get to know her. Trust develops. Intimacy follows. And when you finally reach Stage 6, it means something because you earned it.
        </p>
        <p>
          Combined with <Link href="/features/ai-chat" className="text-accent-purple hover:underline">persistent memory chat</Link>, <Link href="/features/voice-calls" className="text-accent-purple hover:underline">voice notes</Link>, and <Link href="/features/ai-girlfriend-images" className="text-accent-purple hover:underline">AI-generated photos</Link>, the progression system creates the most immersive AI relationship experience available.
        </p>
      </ContentSection>
    </FeaturePageLayout>
  );
}

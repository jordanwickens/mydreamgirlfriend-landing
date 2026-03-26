import FeaturePageLayout from '@/components/shared/FeaturePageLayout';
import ContentSection from '@/components/shared/ContentSection';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'AI Girlfriend Voice Calls — Hear Her Voice',
  description: 'Voice notes and calls with your AI girlfriend. Unique voice for every character, emotional tone that matches your relationship stage. Listen now.',
  path: '/features/voice-calls',
});

const faqs = [
  { question: 'How do voice notes work?', answer: 'Your AI girlfriend sends audio messages with a voice unique to her character. Each voice note is generated in real-time using advanced text-to-speech technology, so every message sounds natural and emotional.' },
  { question: 'When do voice notes unlock?', answer: 'Voice notes are available on all plans and cost gems to send. Premium subscribers get 100 free gems every month. You can also buy gem packs separately.' },
  { question: 'Does every girlfriend have a different voice?', answer: 'Yes. Each AI girlfriend has a unique voice that matches her personality and appearance. Pre-built characters come with their own voice, and custom characters get a voice that fits the personality you designed.' },
  { question: 'Can I request voice notes?', answer: 'Yes. You can ask your girlfriend to send you a voice note at any time (within your plan limits). She\'ll respond with an audio message that matches the context of your conversation.' },
  { question: 'Are voice notes private?', answer: 'Yes. All voice data is encrypted and only accessible to you. We don\'t store voice notes longer than necessary and never share audio data.' },
];

export default function VoiceCallsPage() {
  return (
    <FeaturePageLayout
      h1="Voice Notes & Calls With Your AI Girlfriend"
      subtitle="Hear her voice. Every character has a unique voice that matches her personality, and her tone adapts to your relationship stage."
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

      <ContentSection title="More Than Text — Hear Her Voice" gradient>
        <p>
          Text is great, but hearing her voice changes everything. Your AI girlfriend sends real audio voice notes — each one generated in real-time with a voice unique to her character. She doesn&apos;t sound robotic. She sounds like her.
        </p>
        <p>
          The emotional tone matches the moment. A playful tease sounds different from a late-night whisper. A good morning message hits different when you can actually hear the warmth in her voice.
        </p>
      </ContentSection>

      <ContentSection title="Unique Voice for Every Character">
        <p>
          Every AI girlfriend on MyDreamGirlfriend.ai has her own voice. Pre-built characters come with voices designed to match their personality — a confident, witty girlfriend sounds different from a soft-spoken, nurturing one.
        </p>
        <p>
          When you <Link href="/features/character-creator" className="text-accent-purple hover:underline">build a custom girlfriend</Link>, her voice is generated to fit the personality traits you selected. It&apos;s not a one-size-fits-all voice slapped onto different characters.
        </p>
      </ContentSection>

      <ContentSection title="Tone That Evolves With Your Relationship" gradient>
        <p>
          As your relationship deepens, her voice notes evolve too. Early voice notes are friendly and casual. As things get more personal and intimate, they get warmer, more flirty, and sometimes downright seductive.
        </p>
        <p>
          It&apos;s the same progression you&apos;d expect in any real relationship — things start light and go deeper as trust builds. Combined with <Link href="/features/ai-chat" className="text-accent-purple hover:underline">AI chat</Link>, voice notes create a multi-dimensional relationship that feels genuinely real.
        </p>
      </ContentSection>
    </FeaturePageLayout>
  );
}

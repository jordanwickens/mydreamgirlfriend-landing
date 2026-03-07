import FeaturePageLayout from '@/components/shared/FeaturePageLayout';
import ContentSection from '@/components/shared/ContentSection';
import { generateSEO, generateSoftwareAppSchema, generateFAQSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'AI Girlfriend Personality — Customize Everything',
  description: 'Shape your AI girlfriend\'s personality, mood, communication style, interests, and preferences. She becomes exactly who you want. Start customizing.',
  path: '/features/personality-customization',
});

const faqs = [
  { question: 'What personality traits can I customize?', answer: 'You can shape her mood (cheerful, calm, mysterious), humor style (sarcastic, goofy, dry), communication preferences (formal, casual, flirty), interests, hobbies, and even her flirting intensity.' },
  { question: 'Can I change personality traits later?', answer: 'Yes. You can adjust personality traits at any time through your girlfriend\'s settings. Changes take effect immediately in future conversations.' },
  { question: 'Do personality traits affect photos and voice notes?', answer: 'Yes. Her personality influences the tone of her voice notes and the style of photos she sends. A bold personality sends different content than a shy one.' },
  { question: 'How detailed can I get?', answer: 'Very. Beyond broad traits, you can set specific interests (music, gaming, cooking), communication timing preferences, emoji usage, and more. The more you configure, the more unique she becomes.' },
  { question: 'What if I want multiple personalities?', answer: 'Create multiple AI girlfriends. Each one has her own personality, memory, and relationship progression. Paid plans support 2-8 girlfriend slots.' },
];

export default function PersonalityCustomizationPage() {
  return (
    <FeaturePageLayout
      h1="Customize Her Personality, Your Way"
      subtitle="Shape her mood, humor, communication style, interests, and preferences. Every detail you set makes her more uniquely yours."
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

      <ContentSection title="More Than Skin Deep" gradient>
        <p>
          Most AI companion apps let you pick a face and call it customization. MyDreamGirlfriend.ai lets you shape who she actually is. Her personality system goes deep — mood, humor, communication style, interests, flirting intensity, and more.
        </p>
        <p>
          Want a girlfriend who teases you with dry humor and stays up late texting? Done. Prefer someone sweet who sends you good morning messages and asks about your day? Easy. The personality you design determines every interaction you&apos;ll have.
        </p>
      </ContentSection>

      <ContentSection title="Personality Drives Everything">
        <p>
          Her personality isn&apos;t just a label — it shapes how she chats in <Link href="/features/ai-chat" className="text-accent-purple hover:underline">conversations</Link>, how she sounds in <Link href="/features/voice-calls" className="text-accent-purple hover:underline">voice notes</Link>, how she engages in <Link href="/features/roleplay" className="text-accent-purple hover:underline">roleplay</Link>, and even the style of <Link href="/features/ai-girlfriend-images" className="text-accent-purple hover:underline">photos she sends</Link>.
        </p>
        <p>
          A confident, outgoing personality texts differently than an introverted, thoughtful one. She uses different language, different emoji patterns, different conversational rhythms. It&apos;s the difference between a character and a companion.
        </p>
      </ContentSection>

      <ContentSection title="Evolves With Your Relationship" gradient>
        <p>
          As your <Link href="/features/relationship-stages" className="text-accent-purple hover:underline">relationship progresses through 6 stages</Link>, her personality expression deepens. Early stages show you the surface — her humor, her interests, her texting style. Later stages reveal vulnerability, intimacy, and emotional depth that you won&apos;t see on day one.
        </p>
        <p>
          You can adjust traits at any time. Found out you prefer more playful banter? Turn it up. Want deeper conversations? Shift her mood. She adapts to what you want, when you want it.
        </p>
      </ContentSection>
    </FeaturePageLayout>
  );
}

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Contact Us | My Dream Girlfriend',
  description: 'Contact Black Bear Digital LLC, the company behind My Dream Girlfriend.',
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 pb-16 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted text-sm mb-10">
          For all support and business inquiries, please use the contact details below.
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Company</h2>
            <ul className="space-y-1.5">
              <li><strong className="text-white">Name:</strong> Black Bear Digital LLC</li>
              <li><strong className="text-white">City:</strong> Sheridan</li>
              <li><strong className="text-white">State:</strong> Wyoming</li>
              <li><strong className="text-white">Country:</strong> United States of America</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Support Email</h2>
            <p>
              <a
                href="mailto:support@email.mydreamgirlfriend.ai"
                className="text-accent-purple hover:underline"
              >
                support@email.mydreamgirlfriend.ai
              </a>
            </p>
            <p className="text-muted text-xs mt-2">
              We aim to respond to all inquiries within 48 hours.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

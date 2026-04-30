import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Complaints & Content Removal Policy | My Dream Girlfriend',
};

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 pb-16 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Complaints &amp; Content Removal Policy</h1>
        <p className="text-muted text-sm mb-10">
          Effective Date: March 5, 2026 &mdash; Last Updated: April 30, 2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-gray-300">
          <section>
            <p className="mb-4">
              MyDreamGirlfriend.ai is committed to operating in full compliance with applicable
              laws, card-scheme rules, and CCBill&rsquo;s standards. We take all complaints about
              content on our service seriously.
            </p>

            <h2 className="text-base font-semibold text-white mb-2">How to report content</h2>
            <p className="mb-3">
              If you believe that any content on MyDreamGirlfriend.ai may be illegal, violates our
              policies, or otherwise should not appear on our service, you can report it by:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Using the in-app report function (where available), or</li>
              <li>
                Emailing us at{' '}
                <a href="mailto:support@email.mydreamgirlfriend.ai" className="text-accent-purple hover:underline">support@email.mydreamgirlfriend.ai</a>{' '}
                with a description of the issue, relevant screenshots, and any URLs or timestamps.
              </li>
            </ul>
            <p className="mb-2">
              You may also submit a complaint or takedown request through CCBill&rsquo;s content
              removal form:
            </p>
            <a
              href="https://www.ccbillcomplaintform.com/ccbill/form/CCBillContentRemovalRequest1/formperma/sBK2jfIoZWAFw2hRRt5Rv2PQncscFzpvOH6bPcwopas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block break-all text-accent-purple hover:underline"
            >
              CCBill Content Removal Form &rarr;
            </a>

            <h2 className="text-base font-semibold text-white mt-6 mb-2">Review and response time</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We review all complaints and content removal requests promptly and fairly.</li>
              <li>
                We aim to review and resolve reported complaints within{' '}
                <strong className="text-white">five (5) business days</strong> of receiving all
                necessary information.
              </li>
              <li>
                If the complaint relates to potentially illegal content, we will prioritize our
                review and remove such content immediately once confirmed.
              </li>
            </ul>

            <h2 className="text-base font-semibold text-white mt-6 mb-2">Review process and possible outcomes</h2>
            <p className="mb-3">When we receive a complaint, we will:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li>Review the reported content and relevant context.</li>
              <li>Compare it against our Terms of Service, content standards, and applicable card-scheme rules.</li>
              <li>
                Decide whether to:
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Remove or restrict access to the content;</li>
                  <li>Apply technical or policy changes to prevent similar issues;</li>
                  <li>Take action against the user account involved (warnings, suspension, or termination); or</li>
                  <li>Determine that no violation has occurred.</li>
                </ul>
              </li>
            </ol>

            <h2 className="text-base font-semibold text-white mt-6 mb-2">Appeals</h2>
            <p className="mb-4">
              If you disagree with our decision, you may appeal by replying to our decision email or
              contacting{' '}
              <a href="mailto:support@email.mydreamgirlfriend.ai?subject=Appeal" className="text-accent-purple hover:underline">support@email.mydreamgirlfriend.ai</a>{' '}
              with &ldquo;Appeal&rdquo; in the subject and any additional information you would like
              us to consider. We will re-review the matter and communicate our final decision.
            </p>

            <p className="border-l-2 border-red-500/50 pl-4 italic text-gray-200">
              We do not tolerate any content that involves minors, non-consensual activities,
              exploitation, human trafficking or sex trafficking, or any other illegal material. Any
              such content will be removed immediately once identified, and we may report it to the
              appropriate authorities.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

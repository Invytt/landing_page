import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use Invytt.",
  alternates: { canonical: "https://invytt.com/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      summary="The terms that apply when you create an account or use Invytt."
      updated="Last updated: 18 October 2026 · Effective: 18 October 2026 · Version 1.0"
    >
      <p>By creating an account or using Invytt, you agree to these Terms and our Privacy Policy. If you do not agree, do not use the App.</p>

      <h2>1. Eligibility</h2>
      <p>You must be at least <strong>18</strong> years old, and the age of majority in your jurisdiction where required. You represent that your information is accurate.</p>
      <h2>2. Your account</h2>
      <ul>
        <li>You register with a mobile phone number verified by OTP.</li>
        <li>You are responsible for your phone, account, and all activity under it.</li>
        <li>Keep information current and notify <a href="mailto:support@invytt.com">support@invytt.com</a> of unauthorized use.</li>
      </ul>
      <h2>3. License</h2>
      <p>We grant a limited, non-exclusive, non-transferable, revocable license for personal, non-commercial use. You may not copy, modify, reverse-engineer, resell, or create derivative works except as permitted by law.</p>
      <h2>4. Acceptable use</h2>
      <ul>
        <li>You must not break the law.</li>
        <li>You must not post unlawful, harassing, hateful, defamatory, obscene, infringing, or privacy-violating content.</li>
        <li>You must not impersonate others.</li>
        <li>You must not upload malicious code or disrupt the service.</li>
        <li>You must not scrape user data, send spam, or misuse contact matching.</li>
      </ul>
      <p>We may remove content and suspend or terminate violating accounts.</p>

      <h2>5. User content</h2>
      <ul>
        <li>You retain ownership of content you create.</li>
        <li>You grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, and display content solely to operate the App.</li>
        <li>You are responsible for your content and confirm that you have the rights to share it.</li>
        <li>Text is checked against prohibited terms on our servers. Uploaded image media enters asynchronous backend moderation and may be visible to authorized participants while processing; rejected content is removed or replaced. Supported Apple devices may run an additional local image check. The backend may send image URLs to OpenAI. Media that cannot be automatically inspected may be reviewed, limited, or removed.</li>
        <li>Chat is <strong>not end-to-end encrypted</strong>; authorized backend services can process messages and media for delivery, safety, and moderation.</li>
        <li>You can report content or a person from where you encountered them. If content was blocked in error, contact us through Profile → Account &amp; support.</li>
      </ul>

      <h2>6. Events, invitations, and RSVPs</h2>
      <p>You are solely responsible for events you organize and attend, including legality, safety, and interactions with attendees. Invytt is not a party to and is not responsible for arrangements between users.</p>
      <h2>7. No purchases in V1</h2>
      <p>Version 1 is free and offers no purchases, bookings, or payments. We do not collect payment details, and marketplace, vendor, order, and refund functionality is unavailable. Future paid features will be covered by updated Terms before release.</p>
      <h2>8. Friends and social features</h2>
      <p>Friend requests, contact matching, and profile visibility are provided as-is. Respect other users and do not send unwanted or abusive requests or messages.</p>

      <h2>9. Third-party services</h2>
      <ul>
        <li>Supabase: backend, database, authentication, and storage.</li>
        <li>MSG91 and WhatsApp Business: OTP and selected event notifications.</li>
        <li>AutoSend: email OTPs and transactional email.</li>
        <li>Google Firebase: push notifications and crash diagnostics.</li>
        <li>Google Places and Mapbox: place search, maps, and location display.</li>
        <li>OpenAI: event-assistance features and image safety moderation.</li>
        <li>GIPHY: GIF and sticker search and delivery.</li>
        <li>Apple: on-device content screening on supported devices.</li>
      </ul>
      <p>V1 does not offer marketplace purchases, bookings, paid ticketing, or Google Calendar sync. Third-party use may be governed by their own terms.</p>

      <h2>10. Intellectual property</h2>
      <p>The App, including its design, logos, trademarks, text, and software, is owned by or licensed to Invytt and protected by law. No rights are transferred except for your content and the license granted here.</p>
      <h2>11. Disclaimers</h2>
      <p>The App is provided “as is” and “as available” without warranties, including merchantability, fitness, and non-infringement. We do not warrant uninterrupted, error-free, or secure operation or accurate content.</p>
      <h2>12. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, Invytt and its affiliates will not be liable for indirect, incidental, special, consequential, or punitive damages or loss of data, profits, or goodwill. Total liability will not exceed the greater of INR 5,000 or amounts paid in the preceding 12 months.</p>
      <h2>13. Indemnity</h2>
      <p>You agree to indemnify and hold harmless Invytt from claims, damages, expenses, and legal fees arising from your use, content, or violation of these Terms or the law.</p>
      <h2>14. Suspension and termination</h2>
      <p>You may stop using the App and delete your account through Profile → Account &amp; support → Delete account. We may suspend or terminate access for violations or to protect users or the service. Provisions that should survive termination continue to do so.</p>
      <h2>15. Governing law and disputes</h2>
      <p>These Terms are governed by the laws of India. Courts at Bhubaneswar, Orissa have exclusive jurisdiction, subject to mandatory consumer-protection rights.</p>
      <h2>16. Changes</h2>
      <p>We may update these Terms. The current version is published at <strong>https://invytt.com/terms</strong> and linked from the App. We update the “Last updated” date and provide additional notice for material changes.</p>
      <h2>17. Contact</h2>
      <dl className="my-7 grid gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
        <dt className="font-semibold text-black">Company</dt>
        <dd>INVYTT PRIVATE LIMITED</dd>
        <dt className="font-semibold text-black">Email</dt>
        <dd><a href="mailto:support@invytt.com">support@invytt.com</a></dd>
        <dt className="font-semibold text-black">Address</dt>
        <dd>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</dd>
      </dl>
    </LegalPage>
  );
}

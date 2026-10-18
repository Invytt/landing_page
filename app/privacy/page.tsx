import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Invytt collects, uses, shares, and protects your information.",
  alternates: { canonical: "https://invytt.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="How Invytt collects, uses, shares, and protects your information."
      updated="Last updated: 18 October 2026 · Effective: 18 October 2026 · Version 1.0"
    >
      <p>
        This Privacy Policy explains how Invytt collects, uses, shares, and protects your information. By using the App, you agree to this Policy.
      </p>
      <p>Invytt is based in India. Your information may be processed in India and other countries where our service providers operate.</p>

      <h2>1. Who we are</h2>
      <dl className="my-7 grid gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
        <dt className="font-semibold text-black">Data Controller / Fiduciary</dt>
        <dd>INVYTT PRIVATE LIMITED</dd>
        <dt className="font-semibold text-black">Registered address</dt>
        <dd>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</dd>
        <dt className="font-semibold text-black">Contact / Grievance Officer</dt>
        <dd><a href="mailto:support@invytt.com">support@invytt.com</a></dd>
      </dl>

      <h2>2. Information we collect</h2>
      <h3>2.1 Information you give us</h3>
      <ul>
        <li><strong>Account &amp; identity:</strong> mobile phone number used for sign-in via one-time password, first and last name.</li>
        <li><strong>Profile:</strong> profile photo, banner image, bio, pronouns, gender, date of birth, city, occupation, interests, social handles you choose to add, and optional email address.</li>
        <li><strong>Content you create:</strong> events, invitations, RSVPs, event media (photos, videos, GIFs, and stickers), messages, posts, comments, and other content you submit.</li>
        <li><strong>Moderation records:</strong> moderation status, processing attempts, rejection or fallback state, and the minimum information needed to apply a result to the relevant message, event, profile, or cover.</li>
      </ul>
      <h3>2.2 Information collected automatically</h3>
      <ul>
        <li><strong>Device &amp; usage:</strong> device model, operating system, app version, language, IP address, and in-app activity needed to operate features.</li>
        <li><strong>Location:</strong> with permission, device location used to set your city, show nearby events, and power maps.</li>
        <li><strong>Push tokens:</strong> a device push token if you enable notifications.</li>
        <li><strong>Diagnostics:</strong> crash and performance information used to maintain reliability.</li>
        <li><strong>Cached media:</strong> temporary copies of chat and event media so previously viewed content loads faster.</li>
      </ul>
      <h3>2.3 Permission-gated device data</h3>
      <ul>
        <li><strong>Contacts:</strong> phone numbers are hashed on your device before matching; raw numbers and names are not stored or used for advertising.</li>
        <li><strong>Camera:</strong> to take photos for event chat and event media.</li>
        <li><strong>Photo library:</strong> to set profile/banner images, add event photos or videos, and save event photos.</li>
      </ul>
      <h3>2.4 Third parties</h3>
      <p>Google Places provides requested location and place lookups. GIPHY provides GIF and sticker search results or selected media when you use that feature and may process search terms under its own policy.</p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>Create and manage your account and authenticate you by phone OTP.</li>
        <li>Provide profiles, friends, events, invitations, RSVPs, media, chat, expenses, and maps.</li>
        <li>Match you with existing users through hashed phone numbers.</li>
        <li>Send transactional and, if enabled, push, WhatsApp, SMS, and email notifications.</li>
        <li>Send relevant event details to our AI provider for event-planning suggestions and captions.</li>
        <li><strong>Moderate user-generated content.</strong> Text is checked against prohibited terms on our servers. Uploaded image media enters asynchronous backend moderation and may appear to authorized participants while processing; rejected media is removed or replaced by the relevant fallback. The backend may send an uploaded image URL to OpenAI. On supported Apple devices, an additional image check may run locally; that result is not sent to us and does not replace backend moderation. Videos and third-party media may follow a separate review or removal path.</li>
        <li>Maintain safety, prevent fraud and abuse, enforce our Terms, and comply with legal obligations.</li>
      </ul>
      <p><strong>Legal bases (GDPR, where applicable):</strong> contract performance, consent for permission-gated features, legitimate interests in security and improvement, and legal obligations.</p>

      <h2>4. How we share your information</h2>
      <p>We do <strong>not</strong> sell your personal information.</p>
      <h3>4.1 With other users</h3>
      <p>Your profile details are visible according to your privacy settings. If your profile is private, non-friends see only your name and profile/banner image until you become friends. Content posted to events is visible to event participants.</p>
      <h3>4.2 Service providers</h3>
      <ul>
        <li><strong>Supabase:</strong> backend hosting, database, authentication, and storage.</li>
        <li><strong>MSG91 and WhatsApp Business:</strong> OTP and selected event messages.</li>
        <li><strong>AutoSend:</strong> email OTPs and transactional email.</li>
        <li><strong>Google Firebase:</strong> push notifications and crash/performance diagnostics.</li>
        <li><strong>Google Places and Mapbox:</strong> place search, maps, and location display.</li>
        <li><strong>GIPHY:</strong> GIF and sticker search and delivery.</li>
        <li><strong>OpenAI:</strong> relevant event details for planning/captions and uploaded image URLs for automated safety moderation. We do not use uploaded chat or event images to train our own models.</li>
        <li><strong>Apple:</strong> supported on-device photo screening; nothing is transmitted to Apple or us for that purpose.</li>
      </ul>
      <p>We may also disclose information when required by law or to protect users, the public, or Invytt, and information may transfer in a merger, acquisition, or asset sale.</p>

      <h2>5. Data retention</h2>
      <p>We keep information while your account is active or as needed to provide the App. Messages, event content, moderation records, cached media, and notification records may be retained for the relevant features, subject to deletion requests and applicable law. After account deletion, we delete or anonymize personal data within 30 days except where retention is required for legal, tax, accounting, fraud-prevention, or dispute-resolution purposes.</p>

      <h2>6. Your rights and choices</h2>
      <ul>
        <li>Access, correct, delete, or export your data.</li>
        <li>Withdraw consent, including device permissions, at any time.</li>
        <li>Object to or restrict certain processing where applicable.</li>
        <li>Not be discriminated against for exercising these rights.</li>
      </ul>
      <p>You can permanently delete your account in <strong>Profile → Account &amp; support → Delete account</strong>. For other requests, email <a href="mailto:support@invytt.com">support@invytt.com</a>. California residents: we do not sell or share personal information for cross-context behavioral advertising.</p>

      <h2>7. Privacy controls</h2>
      <ul>
        <li>Under <strong>Profile → Privacy</strong>, you control profile visibility, contact sync, guest-list visibility, external-guest location visibility, and whether guests may contact you or co-hosts.</li>
        <li>Under <strong>Profile → Notifications</strong>, you control event, friend-request, chat, and live-event notifications.</li>
        <li>Device permissions remain revocable in device settings.</li>
      </ul>

      <h2>8. Security</h2>
      <p>We use TLS/HTTPS, backend row-level security, restricted service access, and available device/platform protections. Chat is <strong>not end-to-end encrypted</strong>: authorized backend services can process chat data and media for delivery, storage, safety, and moderation. No transmission or storage method is 100% secure.</p>

      <h2>9. Children</h2>
      <p>The App is not intended for children under 18. If you believe a child has provided us data, contact us and we will delete it.</p>

      <h2>10. International transfers</h2>
      <p>Your information may be processed in India and other countries where service providers operate. Where required, we use appropriate safeguards.</p>

      <h2>11. Third-party links and services</h2>
      <p>Maps, messaging, GIF/sticker search, storage, diagnostics, and AI moderation may be provided by third parties. Their practices are governed by their own policies. Review the policies of Supabase, MSG91, WhatsApp, AutoSend, Google, Firebase, Mapbox, GIPHY, and OpenAI.</p>

      <h2>12. Changes</h2>
      <p>We may update this Policy. The current version is published at <strong>https://invytt.com/privacy</strong> and linked from the App. We update the “Last updated” date and provide additional notice for material changes.</p>

      <h2>13. Contact us</h2>
      <dl className="my-7 grid gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
        <dt className="font-semibold text-black">Company</dt>
        <dd>INVYTT PRIVATE LIMITED</dd>
        <dt className="font-semibold text-black">Email</dt>
        <dd><a href="mailto:support@invytt.com">support@invytt.com</a></dd>
        <dt className="font-semibold text-black">Address</dt>
        <dd>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</dd>
      </dl>
      <p>Under the India DPDP Act, you may also lodge a complaint with the Data Protection Board of India if unsatisfied with our response.</p>
    </LegalPage>
  );
}

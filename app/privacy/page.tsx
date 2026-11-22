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
      kind="privacy"
      title="Privacy Policy"
      summary="How Invytt collects, uses, shares, and protects your information."
      updated="Last updated: 20 November 2026 · Effective: 20 November 2026 · Version 1.1"
    >
      <p>
        This Privacy Policy explains how Invytt collects, uses, shares, and protects your information. By using the App, you agree to this Policy.
      </p>
      <p>Invytt is based in India. Your information may be processed in India and other countries where our service providers operate.</p>

      <h2>1. Who we are</h2>
      <dl className="my-7 grid gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
        <dt className="font-medium text-black">Data Controller / Fiduciary</dt>
        <dd>INVYTT PRIVATE LIMITED</dd>
        <dt className="font-medium text-black">Registered address</dt>
        <dd>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</dd>
        <dt className="font-medium text-black">Contact / Grievance Officer</dt>
        <dd><a href="mailto:support@invytt.com">support@invytt.com</a></dd>
      </dl>

      <h2>2. Information we collect</h2>
      <h3>2.1 Information you give us</h3>
      <ul>
        <li><strong>Account &amp; identity:</strong> mobile phone number used for sign-in via one-time password, first and last name.</li>
        <li><strong>Profile:</strong> profile photo, cover image, bio, pronouns, gender, date of birth, city, the interests you pick when you sign up, Instagram and LinkedIn handles you choose to add, your profile style, and an optional email address that we verify with a code.</li>
        <li><strong>Content you create:</strong> events, invitations, RSVPs and answers to a host&apos;s questions, event media (photos, videos, GIFs, and stickers), chat messages, posts, comments, a song you attach to an event, and other content you submit.</li>
        <li><strong>Group Pot:</strong> if you use an event&apos;s Group Pot, the amounts and who owes whom. This is a record only; no money moves through Invytt.</li>
        <li><strong>Meets:</strong> when you scan another member&apos;s profile QR code, we record that you met, when, and the event you were at, if any. The meet shows on both your profiles.</li>
        <li><strong>Waitlist:</strong> if you join the waitlist on invytt.com, your email address.</li>
        <li><strong>Safety-review records:</strong> whether content passed or failed our safety review, and the information needed to apply that result to the relevant message, event, profile, or cover.</li>
      </ul>
      <h3>2.2 Guests who RSVP by link</h3>
      <p>People can RSVP to an event from a shared web link without the app. For that we collect their first and last name, gender, phone number (verified with a WhatsApp code), their RSVP, and any answers to the host&apos;s questions. These details are shared with the event&apos;s host and co-hosts.</p>
      <h3>2.3 Information collected automatically</h3>
      <ul>
        <li><strong>Device &amp; usage:</strong> device model, operating system, app version, language, IP address, and in-app activity needed to operate features.</li>
        <li><strong>Location:</strong> with permission, device location used to set your city, show nearby events, and power maps.</li>
        <li><strong>Push tokens:</strong> a device push token if you enable notifications.</li>
        <li><strong>Diagnostics:</strong> crash and performance information used to maintain reliability.</li>
        <li><strong>Cached media:</strong> temporary copies of chat and event media so previously viewed content loads faster.</li>
      </ul>
      <h3>2.4 Permission-gated device data</h3>
      <ul>
        <li><strong>Contacts:</strong> phone numbers are changed into an unreadable form on your device before matching; original numbers and names are not stored or used for advertising.</li>
        <li><strong>Camera:</strong> to take photos for event chat and to scan profile QR codes when you meet someone.</li>
        <li><strong>Photo library:</strong> to set profile and cover images, add event covers, photos, or videos, read a QR code from a photo, and save event photos.</li>
        <li><strong>Calendar:</strong> only if you turn on Calendar sync. We look up your calendars to find or create an Invytt calendar and add your plans to it. We do not read your other calendar entries.</li>
      </ul>
      <h3>2.5 Third parties</h3>
      <p>Google Places and Mapbox provide place search and maps. GIPHY provides GIF and sticker search. Apple&apos;s iTunes Search provides song search and previews when you add a song to an event. Each may process your search terms under its own policy.</p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>Create and manage your account and authenticate you by phone OTP.</li>
        <li>Provide profiles, friends, meets, events, invitations, RSVPs, media, chat, shared expenses, calendar sync, and maps.</li>
        <li>Match you with existing users without storing your contacts&apos; original phone numbers.</li>
        <li>Send sign-in codes and RSVP updates on WhatsApp, push notifications you have turned on, email verification codes, and, if you joined the waitlist, launch news by email. We do not send SMS.</li>
        <li>When you use the event coach, send the relevant event details and what you type to OpenAI to generate planning ideas, descriptions, captions, and recaps.</li>
        <li><strong>Keep the community safe.</strong> Text and images are checked against our safety rules. Images may be visible to permitted participants while a review is completed. If an image is not approved, we remove it or show a suitable replacement. Uploaded images are checked by OpenAI&apos;s moderation service. On supported Apple devices, an additional privacy-focused check may happen on the device itself; its result is not sent to us. Videos and third-party media may follow a different review process.</li>
        <li>Maintain safety, prevent fraud and abuse, enforce our Terms, and comply with legal obligations.</li>
      </ul>
      <p><strong>Legal bases (GDPR, where applicable):</strong> contract performance, consent for permission-gated features, legitimate interests in security and improvement, and legal obligations.</p>

      <h2>4. How we share your information</h2>
      <p>We do <strong>not</strong> sell your personal information.</p>
      <h3>4.1 With other users</h3>
      <p>Your profile details are visible according to your privacy settings. If your profile is private, non-friends see only your name and profile/banner image until you become friends. Content posted to events is visible to event participants.</p>
      <h3>4.2 Service providers</h3>
      <ul>
        <li><strong>Supabase:</strong> hosting, database, sign-in, and storage for accounts and uploaded content.</li>
        <li><strong>MSG91 and WhatsApp Business:</strong> sign-in codes, codes for guests who RSVP by link, and RSVP updates.</li>
        <li><strong>AutoSend:</strong> email verification codes and waitlist emails.</li>
        <li><strong>Google Firebase:</strong> push notifications (Cloud Messaging) and crash reports (Crashlytics).</li>
        <li><strong>Google Places and Mapbox:</strong> place search, maps, and location display.</li>
        <li><strong>GIPHY:</strong> GIF and sticker search and delivery.</li>
        <li><strong>OpenAI:</strong> event coach suggestions, and safety checks on uploaded images. We do not use uploaded chat or event images to train our own models.</li>
        <li><strong>Apple:</strong> song search and previews (iTunes Search), and an additional photo safety check on supported devices; for that check the photo is not sent to Apple or to us.</li>
      </ul>
      <p>We may also disclose information when required by law or to protect users, the public, or Invytt, and information may transfer in a merger, acquisition, or asset sale.</p>

      <h2>5. Data retention</h2>
      <p>We keep information while your account is active or as needed to provide the App. Messages, event content, moderation records, cached media, and notification records may be retained for the relevant features, subject to deletion requests and applicable law.</p>
      <p>When you delete your account, we delete it right away, together with your profile and images, the events you host and their media, and the messages, photos, and attachments you shared in other events. Copies in our providers&apos; backups and logs are removed on their regular cycle. We keep information longer only where the law requires it or to resolve disputes, prevent fraud, or enforce our Terms.</p>

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
        <li>Under <strong>Profile → Privacy</strong>, you control profile visibility, contact sync, calendar sync, guest-list visibility, whether guests who join by link can see the event location, whether guests may contact you or co-hosts, and your blocked accounts.</li>
        <li>Under <strong>Profile → Notifications</strong>, you control event invites, RSVP updates, events going live, Group Pot updates, chat messages, friend requests, and photo and post activity.</li>
        <li>Device permissions remain revocable in device settings.</li>
      </ul>

      <h2>8. Security</h2>
      <p>We use encryption while information is sent, limited access for authorized staff and service providers, and available device and platform protections. Chat is <strong>not private from the systems that operate Invytt</strong>: authorized service providers may process chat messages and media to deliver the service, store content, and keep the community safe. No transmission or storage method is 100% secure.</p>

      <h2>9. Children</h2>
      <p>The App is not intended for children under 18. If you believe a child has provided us data, contact us and we will delete it.</p>

      <h2>10. International transfers</h2>
      <p>Your information may be processed in India and other countries where service providers operate. Where required, we use appropriate safeguards.</p>

      <h2>11. Third-party links and services</h2>
      <p>Maps, messaging, GIFs and stickers, song search, storage, diagnostics, AI suggestions, and safety checks are provided by other companies. Their practices are governed by their own policies. Please review the policies of the services used with the feature you choose.</p>

      <h2>12. Changes</h2>
      <p>We may update this Policy. The current version is published at <strong>https://invytt.com/privacy</strong> and linked from the App. We update the “Last updated” date and provide additional notice for material changes.</p>

      <h2>13. Contact us</h2>
      <dl className="my-7 grid gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
        <dt className="font-medium text-black">Company</dt>
        <dd>INVYTT PRIVATE LIMITED</dd>
        <dt className="font-medium text-black">Email</dt>
        <dd><a href="mailto:support@invytt.com">support@invytt.com</a></dd>
        <dt className="font-medium text-black">Address</dt>
        <dd>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</dd>
      </dl>
      <p>Under the India DPDP Act, you may also lodge a complaint with the Data Protection Board of India if unsatisfied with our response.</p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description: "Find answers about your Invytt account, events, friends, notifications, privacy, and more.",
  alternates: { canonical: "https://invytt.com/help" },
};

export default function HelpPage() {
  return (
    <LegalPage
      title="Help & FAQ"
      summary="Quick answers about signing in, creating events, friends, notifications, privacy, and getting support."
      updated="Help centre · Updated 18 October 2026"
    >
      <p>
        Need a hand? Find quick answers below. Still stuck? Contact us at{" "}
        <a href="mailto:support@invytt.com">support@invytt.com</a>.
      </p>

      <h2>Account &amp; sign-in</h2>
      <h3>How do I sign in?</h3>
      <p>Invytt uses your mobile number. Enter your number, then the one-time password (OTP) we send you.</p>
      <h3>I didn&apos;t get my OTP.</h3>
      <p>The code arrives on WhatsApp, so make sure WhatsApp is installed and active on that number. Check your signal, wait a few seconds, and tap <strong>Resend</strong>. Make sure the number and country code are correct. If it still doesn&apos;t arrive, try again shortly or contact support.</p>
      <h3>How do I edit my profile?</h3>
      <p>Go to <strong>Profile → Edit profile</strong>. You can change your name, photo, banner, bio, pronouns, city, occupation, interests, and social links.</p>
      <h3>How do I delete my account?</h3>
      <p>Go to <strong>Profile → Account &amp; support → Delete account</strong>. This permanently removes your account and associated data. See our <a href="/privacy">Privacy Policy</a> for details.</p>

      <h2>Friends</h2>
      <h3>How do I add friends?</h3>
      <p>Open the <strong>Friends</strong> sheet, use <strong>Search people to add</strong>, and tap <strong>Add</strong> to send a request. You can search by name or phone number.</p>
      <h3>How does contact sync work?</h3>
      <p>With your permission, we check your phone book for people already on Invytt. Your contacts&apos; numbers are hashed on your device before matching. We never store raw numbers. Turn this on or off in <strong>Profile → Privacy → Contact sync</strong>.</p>
      <h3>Someone accepted my request but I don&apos;t see them yet.</h3>
      <p>It should update automatically. If not, reopen the Friends sheet or restart the app.</p>
      <h3>What does a private profile show?</h3>
      <p>If someone sets their profile to private, non-friends see only their name and profile/banner image until they become friends.</p>

      <h2>Events</h2>
      <h3>How do I create an event?</h3>
      <p>Tap <strong>Create</strong> and follow the steps. Choose private or public, add details, cover, and guests.</p>
      <h3>How do invitations and RSVPs work?</h3>
      <p>Invites you send and receive appear in <strong>Invites</strong>. Tap an event to RSVP; hosts see RSVPs update in real time.</p>
      <h3>Can I add events to my calendar?</h3>
      <p>Calendar sync is not available in this version of Invytt.</p>

      <h2>Marketplace</h2>
      <h3>Where is the marketplace?</h3>
      <p>It&apos;s on the way. The Market tab shows a preview of what&apos;s coming: shopping for decor and gifts, and booking photographers, caterers, and venues. Tap <strong>Notify me</strong> there and we&apos;ll tell you when it opens in your city.</p>
      <h3>Does Invytt cost anything?</h3>
      <p>No. This version of Invytt is completely free. There are no purchases, no bookings, and no payments, and we never ask for card or bank details.</p>

      <h2>Notifications</h2>
      <h3>How do I manage notifications?</h3>
      <p>Go to <strong>Profile → Notifications</strong> to toggle categories such as event invites, friend requests, chat messages, and events going live. You can also manage system permission in your device settings.</p>
      <h3>Why am I not getting push notifications?</h3>
      <p>Make sure notifications are enabled for Invytt in your device settings. Some alerts also depend on your in-app notification preferences.</p>

      <h2>Privacy &amp; data</h2>
      <h3>Who can see my profile?</h3>
      <p>Control this in <strong>Profile → Privacy → Public profile</strong>. Private profiles are limited to name and photo for non-friends.</p>
      <h3>How is my data used?</h3>
      <p>See our <a href="/privacy">Privacy Policy</a> for full details on what we collect, how we use it, and your rights, including access, correction, and deletion.</p>
      <h3>How do I revoke a permission?</h3>
      <p>Change contacts, location, and camera permissions anytime in your device&apos;s system settings for Invytt.</p>

      <h2>Troubleshooting</h2>
      <h3>The app is behaving unexpectedly.</h3>
      <p>Try closing and reopening the app. Make sure you&apos;re on the latest version from the App Store or Google Play. If the problem persists, contact support.</p>
      <h3>Maps or location aren&apos;t working.</h3>
      <p>Ensure location permission is granted in your device settings.</p>

      <h2>Contact us</h2>
      <p>Still need help? Email <a href="mailto:support@invytt.com">support@invytt.com</a> and we&apos;ll get back to you.</p>
      <dl className="my-7 grid gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
        <dt className="font-semibold text-black">Company</dt>
        <dd>INVYTT PRIVATE LIMITED</dd>
        <dt className="font-semibold text-black">Address</dt>
        <dd>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</dd>
      </dl>
    </LegalPage>
  );
}

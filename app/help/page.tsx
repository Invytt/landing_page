import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description: "Answers to common questions about using Invytt.",
  alternates: { canonical: "https://invytt.com/help" },
};

const faqs = [
  {
    title: "Account & sign-in",
    items: [
      ["How do I sign in?", "Invytt uses your mobile number. Enter it, then enter the one-time password (OTP) we send you."],
      ["I did not get my OTP.", "The code arrives on WhatsApp. Check that WhatsApp is active, verify your signal and country code, wait a few seconds, then tap Resend. Contact support if it still does not arrive."],
      ["How do I edit my profile?", "Go to Profile → Edit profile. You can change your name, photo, banner, bio, pronouns, city, occupation, interests, and social links."],
      ["How do I delete my account?", "Go to Profile → Account & support → Delete account. This permanently removes your account and associated data."],
    ],
  },
  {
    title: "Friends",
    items: [
      ["How do I add friends?", "Open the Friends sheet, use Search people to add, and tap Add to send a request. You can search by name or phone number."],
      ["How does contact sync work?", "With permission, Invytt checks your phone book for people already on Invytt. Numbers are hashed on your device and raw numbers are not stored. Manage this at Profile → Privacy → Contact sync."],
      ["What does a private profile show?", "Non-friends see only the person's name and profile/banner image until they become friends."],
    ],
  },
  {
    title: "Events",
    items: [
      ["How do I create an event?", "Tap Create and follow the steps. Choose private or public, add details and a cover, and invite guests."],
      ["How do invitations and RSVPs work?", "Invitations appear in Invites. Tap an event to RSVP; hosts see RSVP updates in real time."],
      ["Can I add events to my calendar?", "Calendar sync is not available in this version of Invytt."],
    ],
  },
  {
    title: "Marketplace",
    items: [
      ["Where is the marketplace?", "The Market tab is a preview of upcoming decor, gifts, and vendor booking features. Tap Notify me to hear when it opens in your city."],
      ["Does Invytt cost anything?", "V1 is completely free. There are no purchases, bookings, or payments, and we do not ask for card or bank details."],
    ],
  },
  {
    title: "Notifications and privacy",
    items: [
      ["How do I manage notifications?", "Go to Profile → Notifications to toggle event invites, friend requests, chat messages, and live events. You can also manage system permission in device settings."],
      ["Who can see my profile?", "Control this in Profile → Privacy → Public profile. Private profiles are limited to name and photo for non-friends."],
      ["How is my data used?", "See the Privacy Policy for what we collect, how we use it, our service providers, and your rights."],
      ["How do I revoke a permission?", "Change contacts, location, camera, and other permissions in your device settings for Invytt."],
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      ["The app is behaving unexpectedly.", "Close and reopen the app and make sure you have the latest version. Contact support if the problem persists."],
      ["Maps or location are not working.", "Make sure location permission is granted in your device settings."],
    ],
  },
];

export default function HelpPage() {
  return (
    <LegalPage
      title="Help & FAQ"
      summary="Quick answers about accounts, friends, events, notifications, privacy, and troubleshooting."
      updated="V1 support guide · Updated 18 October 2026"
    >
      <p>Need a hand? Find quick answers below. Still stuck? Contact us at <a href="mailto:support@invytt.com">support@invytt.com</a>.</p>
      {faqs.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.items.map(([question, answer]) => (
            <div key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </div>
          ))}
        </section>
      ))}
      <h2>Contact us</h2>
      <p>Still need help? Email <a href="mailto:support@invytt.com">support@invytt.com</a>.</p>
      <p><strong>INVYTT PRIVATE LIMITED</strong><br />PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</p>
    </LegalPage>
  );
}

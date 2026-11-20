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
      ["How do I sign in?", "Invytt uses your mobile number. Enter it, then enter the six-digit code we send you on WhatsApp."],
      ["I did not get my code.", "The code arrives on WhatsApp, not by SMS. Check that WhatsApp is active on that number, check your signal and country code, wait a few seconds, then tap Resend. If it still does not arrive, email support@invytt.com."],
      ["How do I edit my profile?", "Go to Profile → Edit profile. You can change your first and last name, profile photo, cover image, bio, pronouns, date of birth, city, email, phone number, Instagram and LinkedIn, and your profile style."],
      ["How do I delete my account?", "Go to Profile → Account & support → Delete account. Your account is deleted right away, together with your profile, the events you host, and the photos and media you shared. This cannot be undone."],
    ],
  },
  {
    title: "Friends & meeting people",
    items: [
      ["How do I add friends?", "Open the Friends sheet, use Search people to add, and tap Add to send a request. You can search by name or phone number."],
      ["How does contact sync work?", "With your permission, Invytt checks your phone book for people already on Invytt. Numbers are changed into an unreadable form on your device and the original numbers are not stored. Manage this at Profile → Privacy → Contact sync."],
      ["What does a private profile show?", "People who are not your friends see only your name and your profile and cover images until you become friends."],
      ["How do I mark that I met someone?", "Ask them to flip their profile card on their Profile tab; the back shows their QR code. Scan it with Invytt (or your phone's camera, or a photo of the code). The meet shows on both your profiles, with the event you met at."],
      ["How do I block or report someone?", "Open their profile and use the menu to block or report them. You can see and unblock people at Profile → Privacy → Blocked accounts."],
    ],
  },
  {
    title: "Events",
    items: [
      ["How do I create an event?", "Tap + in the middle of the tab bar and follow the steps. Choose private or public, add the details and a cover, and invite guests. In V1, public events are free to join."],
      ["How do invitations and RSVPs work?", "Your invitations are in the Plans tab under Invited. Open an event to RSVP; hosts see RSVP updates in real time."],
      ["Can people without the app join?", "Yes. Share the event link. Guests can RSVP on the web with their name and a phone number verified by a WhatsApp code. You can hide the event location from these guests at Profile → Privacy."],
      ["Can I add events to my calendar?", "Yes. Turn on Profile → Privacy → Calendar sync and your plans are saved to your phone's calendar. Google Calendar sync is not available in V1."],
      ["Something is wrong with an event.", "Open the event and use Report an issue, or email support@invytt.com."],
    ],
  },
  {
    title: "Coming later",
    items: [
      ["Can I shop, book vendors, or buy tickets?", "Not in V1. Shopping, service and venue bookings, ticketed events, and payments are coming in a later version."],
      ["Does Invytt cost anything?", "V1 is completely free. There are no purchases, bookings, or payments, and we never ask for card or bank details."],
    ],
  },
  {
    title: "Notifications and privacy",
    items: [
      ["How do I manage notifications?", "Go to Profile → Notifications to turn event invites, RSVP updates, events going live, Group Pot (shared expenses and settle-ups), chat messages, friend requests, and photo and post activity on or off. You can also manage notification permission in your device settings."],
      ["Who can see my profile?", "Control this in Profile → Privacy → Public profile. Private profiles show only your name and images to people who are not your friends."],
      ["What else can I control?", "In Profile → Privacy you can hide your guest list, hide the event location from guests who join by link, choose whether guests can contact you or your co-hosts, and turn contact sync and calendar sync on or off."],
      ["How is my data used?", "See the Privacy Policy for what we collect, how we use it, the companies that help us run Invytt, and your rights."],
      ["How do I revoke a permission?", "Change contacts, location, camera, photos, calendar, and notification permissions in your device settings for Invytt."],
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      ["The app is behaving unexpectedly.", "Close and reopen the app and make sure you have the latest version. If the problem continues, email support@invytt.com."],
      ["Maps or location are not working.", "Make sure location permission is turned on for Invytt in your device settings."],
      ["The QR scanner will not open.", "Allow camera access for Invytt in your device settings, or use Scan a photo to read a picture of the code."],
    ],
  },
];

export default function HelpPage() {
  return (
    <LegalPage
      kind="help"
      title="Help & FAQ"
      summary="Quick answers about accounts, friends, events, notifications, privacy, and troubleshooting."
      updated="V1 support guide · Updated 20 November 2026"
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

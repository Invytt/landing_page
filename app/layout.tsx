import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FAQ, COMPANY, EVENT } from "./data";
import { LAUNCH_DATE_LABEL } from "@/lib/launch";
import { LITE_SCRIPT } from "@/lib/lite";
import PerfRoot from "@/components/site/PerfRoot";

// The app's own typefaces, self-hosted: Instrument Sans for reading,
// Instrument Serif for headlines.
// Both are trimmed to the characters the site uses (Latin, punctuation, ₹).
// The site never sets sans text in italic, so that file is not shipped.
const sans = localFont({
  src: [{ path: "./fonts/InstrumentSans.woff2", style: "normal", weight: "400 700" }],
  variable: "--f-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.woff2", style: "normal", weight: "400" },
    { path: "./fonts/InstrumentSerif-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--f-serif",
  display: "swap",
});

const SITE_URL = "https://invytt.com";
const OG_IMAGE = "/og-image.png";
const LOGO = "/icon-512.png";

const TITLE = "Invytt — Every good plan starts with an invite";
const DESCRIPTION = `Invytt is the app for hosting in India. Send invites, collect RSVPs (even over WhatsApp), let AI size your food and supplies, split the cost, and run the party with live games and a companion in the chat. Launching ${LAUNCH_DATE_LABEL}.`;
const SHORT =
  "Invites, RSVPs, AI supply planning, cost-splitting and live party games, all in one app. You bring the people, Invytt brings the rest.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Invytt",
  },
  description: DESCRIPTION,
  applicationName: "Invytt",
  generator: "Next.js",
  keywords: [
    "Invytt",
    "event hosting app",
    "party planning app India",
    "online invitations",
    "RSVP tracking",
    "WhatsApp RSVP",
    "AI party supply planner",
    "split party costs",
    "party games app",
    "birthday party planning",
    "housewarming invite",
    "Diwali party planning",
    "event invite app",
  ],
  authors: [{ name: COMPANY.legalName, url: SITE_URL }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  category: "lifestyle",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Invytt",
    title: TITLE,
    description: SHORT,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "The silver Invytt wordmark beside an invitation to a rooftop dinner, with the line: Every good plan starts with an invite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@invyttt",
    creator: "@invyttt",
    title: TITLE,
    description: SHORT,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // icons come from the app's own icon, as files Next picks up by name:
  // app/favicon.ico, app/icon.png and app/apple-icon.png (manifest has the large sizes)
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1F0B0C",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Invytt",
      legalName: COMPANY.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}${LOGO}`,
      email: COMPANY.email,
      foundingDate: "2026",
      areaServed: "IN",
      sameAs: [
        "https://www.instagram.com/invytt",
        "https://x.com/invyttt",
      ],
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Invytt",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      name: "Invytt",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android",
      url: SITE_URL,
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: EVENT.price,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* lite mode for slow connections, Data Saver and low-memory phones */}
        <script dangerouslySetInnerHTML={{ __html: LITE_SCRIPT }} />
        {/* show the loading card once per visit, not on every page view */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('invytt-seen')){document.documentElement.dataset.seen='1'}else{sessionStorage.setItem('invytt-seen','1')}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <PerfRoot />
      </body>
    </html>
  );
}

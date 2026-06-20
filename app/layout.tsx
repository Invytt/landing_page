import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FAQ, COMPANY, EVENT } from "./data";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://invytt.com";
const OG_IMAGE = "/og-image.png";
const LOGO = "/logo-black.png";

const TITLE = "Invytt — The all-in-one platform for hosting events";
const DESCRIPTION =
  "Invytt is the all-in-one event hosting app for India. Send invites, track RSVPs, plan inventory with AI, book vetted vendors, and split costs — all in one place. No more group chats, spreadsheets, or midnight UPI requests.";

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
    "event hosting app",
    "event planning India",
    "online invitations",
    "RSVP tracking",
    "digital invites WhatsApp",
    "AI inventory planner",
    "event vendor marketplace",
    "caterers decorators photographers booking",
    "cost splitting app",
    "party planning app India",
    "birthday housewarming Diwali planning",
    "host events online",
    "Invytt",
  ],
  authors: [{ name: COMPANY.legalName, url: SITE_URL }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Invytt",
    title: TITLE,
    description:
      "Host the event, skip the chaos. Invites, RSVPs, AI inventory planning, a vendor marketplace, and cost-splitting — all in one app.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Invytt — The all-in-one platform for hosting events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Host the event, skip the chaos. Invites, RSVPs, AI inventory planning, a vendor marketplace, and cost-splitting — all in one app.",
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
  icons: {
    icon: LOGO,
    shortcut: LOGO,
    apple: LOGO,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
      operatingSystem: "Web, iOS, Android",
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
    <html lang="en-IN" className={cn(inter.variable, manrope.variable, "font-sans", geist.variable)}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

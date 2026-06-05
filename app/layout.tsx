import type { Metadata } from "next";
import { Inter, Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Invytt — The all-in-one platform for hosting events",
  description:
    "Invites, RSVPs, AI inventory planning, a vendor marketplace, and cost-splitting — all in one app. No more group chats, spreadsheets, and midnight UPI requests. Built for the everyday host in India.",
  openGraph: {
    title: "Invytt — The all-in-one platform for hosting events",
    description:
      "Host the event, skip the chaos. Invites, RSVPs, AI inventory planning, a vendor marketplace, and cost-splitting — all in one app.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, manrope.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}

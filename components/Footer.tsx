import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { COMPANY } from "@/app/data";

type IconProps = { className?: string };

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Who it's for", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Get early access", href: "#tickets" },
];

const Instagram = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm6.95-9.22a1.28 1.28 0 1 1-2.55 0 1.28 1.28 0 0 1 2.55 0Z" />
  </svg>
);
const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z" />
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "X", href: "#", Icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1a1a1a] px-5 pt-12 text-white sm:pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 lg:grid-cols-[1.4fr_1.2fr]">
        {/* brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="font-display text-4xl font-extrabold tracking-tight">
            invytt
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-accent sm:text-xl">
            The all-in-one platform for hosting events.
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Invites, RSVPs, AI inventory planning, a vendor marketplace, and
            cost-splitting all in one app.
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="mt-4 inline-block text-sm text-white/70 transition hover:text-accent"
          >
            {COMPANY.email}
          </a>
          <p className="mt-5 text-xs text-white/40">
            © {COMPANY.legalName}, {COMPANY.year}
          </p>
          <div className="mt-6 flex gap-5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/70 transition hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* navigation column */}
        <div>
          <p className="text-base font-semibold text-white/40">Navigate</p>
          <ul className="mt-4 flex flex-col gap-3 text-base">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-white transition hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* giant hover-fill wordmark — bottom half clipped */}
      <div className="relative mt-12 h-[16vw] w-full overflow-hidden sm:mt-16">
        <div className="absolute inset-x-0 top-0 h-[32vw]">
          <TextHoverEffect text="invytt" />
        </div>
      </div>
    </footer>
  );
}

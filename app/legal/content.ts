import { COMPANY } from "@/app/data";

export type Section = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; updated: string; body: Section[] };

const { legalName, email } = COMPANY;
const UPDATED = "June 2026";

// ⚠️ NEEDS LEGAL REVIEW — boilerplate templates, not lawyer-reviewed.
// Replace with counsel-approved copy before launch.
const REVIEW_NOTE =
  "This document is a working draft and is pending legal review. It does not yet constitute the final, binding terms.";

export const LEGAL_CONTENT: Record<string, LegalDoc> = {
  "privacy-policy": {
    title: "Privacy Policy",
    updated: UPDATED,
    body: [
      {
        heading: "Overview",
        paragraphs: [
          REVIEW_NOTE,
          `This Privacy Policy explains how ${legalName} ("Invytt", "we", "us") collects, uses, and protects information when you use our event-hosting platform and related services (the "Service").`,
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "Account information you provide, such as your name, email address, phone number, and profile details.",
          "Event data you create, including guest lists, RSVPs, invitations, inventory plans, budgets, and vendor bookings.",
          "Usage and device information collected automatically, such as IP address, browser type, and interactions with the Service.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "To provide, maintain, and improve the Service, including guest management, AI inventory planning, the vendor marketplace, and cost-splitting features.",
          "To communicate with you about your account, events, and updates to the Service.",
          "To detect, prevent, and address fraud, abuse, and security issues.",
        ],
      },
      {
        heading: "Sharing of information",
        paragraphs: [
          "We share information with vendors and guests only as needed to fulfil the events you organise.",
          "We may share information with service providers who process data on our behalf under appropriate confidentiality obligations.",
          "We do not sell your personal information.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You may access, correct, or delete your personal information, subject to applicable law.",
          `To exercise these rights, contact us at ${email}.`,
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about this policy can be sent to ${email}.`],
      },
    ],
  },

  terms: {
    title: "Terms and Conditions",
    updated: UPDATED,
    body: [
      {
        heading: "Acceptance of terms",
        paragraphs: [
          REVIEW_NOTE,
          `These Terms and Conditions govern your use of the Service operated by ${legalName}. By accessing or using the Service, you agree to be bound by these terms.`,
        ],
      },
      {
        heading: "Use of the Service",
        paragraphs: [
          "You must be at least 18 years old, or the age of majority in your jurisdiction, to use the Service.",
          "You are responsible for the accuracy of the event, guest, and payment information you submit, and for all activity under your account.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You agree not to misuse the Service, including by attempting to disrupt it, access it without authorisation, or use it for unlawful purposes.",
          "You are responsible for ensuring your events and communications comply with applicable laws.",
        ],
      },
      {
        heading: "Vendors and third parties",
        paragraphs: [
          "The vendor marketplace connects you with independent third-party vendors. We are not a party to the contracts you form with vendors and are not responsible for their services.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "The Service is provided on an \"as is\" and \"as available\" basis. To the maximum extent permitted by law, we disclaim all warranties and limit our liability for any indirect or consequential damages.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`For questions about these terms, contact ${email}.`],
      },
    ],
  },

  eula: {
    title: "End-User License Agreement",
    updated: UPDATED,
    body: [
      {
        heading: "License grant",
        paragraphs: [
          REVIEW_NOTE,
          `${legalName} grants you a limited, non-exclusive, non-transferable, revocable license to use the Invytt application for your personal, non-commercial event-hosting purposes, subject to this Agreement.`,
        ],
      },
      {
        heading: "Restrictions",
        paragraphs: [
          "You may not copy, modify, reverse-engineer, decompile, or create derivative works of the application except as permitted by law.",
          "You may not sublicense, rent, lease, or distribute the application.",
        ],
      },
      {
        heading: "Ownership",
        paragraphs: [
          "The application, including all intellectual property rights, remains the property of Invytt and its licensors. No rights are granted other than those expressly stated.",
        ],
      },
      {
        heading: "Termination",
        paragraphs: [
          "This license terminates automatically if you breach its terms. Upon termination you must stop using and delete the application.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about this Agreement can be sent to ${email}.`],
      },
    ],
  },

  "payment-policy": {
    title: "Payment Policy",
    updated: UPDATED,
    body: [
      {
        heading: "Overview",
        paragraphs: [
          REVIEW_NOTE,
          `This Payment Policy describes how payments are processed on the Service operated by ${legalName}.`,
        ],
      },
      {
        heading: "Payments and fees",
        paragraphs: [
          "Payments for vendor bookings, contributions, and cost-splitting are processed through third-party payment providers.",
          "Applicable fees, taxes, and charges will be shown before you confirm a payment.",
        ],
      },
      {
        heading: "Cost-splitting and contributions",
        paragraphs: [
          "When you collect contributions or split costs among guests, funds are handled according to the instructions you set for the event and the terms of our payment providers.",
        ],
      },
      {
        heading: "Authorisation",
        paragraphs: [
          "By submitting payment details, you authorise us and our payment providers to charge the applicable amounts. You confirm you are authorised to use the payment method provided.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Payment questions can be sent to ${email}.`],
      },
    ],
  },

  "refund-policy": {
    title: "Refund Policy",
    updated: UPDATED,
    body: [
      {
        heading: "Overview",
        paragraphs: [
          REVIEW_NOTE,
          `This Refund Policy explains how refunds are handled on the Service operated by ${legalName}.`,
        ],
      },
      {
        heading: "Vendor bookings",
        paragraphs: [
          "Refunds for vendor bookings are subject to the cancellation terms set by each individual vendor, shown at the time of booking.",
          "Where a vendor fails to deliver agreed services, we will assist in good faith to help resolve the dispute.",
        ],
      },
      {
        heading: "Contributions and cost-splitting",
        paragraphs: [
          "Refunds of guest contributions are subject to the settings configured by the event host and the policies of our payment providers.",
        ],
      },
      {
        heading: "Requesting a refund",
        paragraphs: [
          `To request a refund or raise a dispute, contact ${email} with your event and transaction details.`,
          "Approved refunds are returned to the original payment method, subject to processing times of the payment provider.",
        ],
      },
    ],
  },

  "host-settlement": {
    title: "Host Settlement Terms and Conditions",
    updated: UPDATED,
    body: [
      {
        heading: "Overview",
        paragraphs: [
          REVIEW_NOTE,
          `These Host Settlement Terms govern how funds collected through the Service are settled to event hosts by ${legalName}.`,
        ],
      },
      {
        heading: "Collection of funds",
        paragraphs: [
          "When you collect contributions or payments for an event, those funds are held and processed by our payment providers before settlement to you.",
        ],
      },
      {
        heading: "Settlement",
        paragraphs: [
          "Settlements are made to the bank account or payment instrument you verify, after deduction of applicable fees, taxes, and any amounts subject to dispute or refund.",
          "Settlement timelines depend on payment provider processing and applicable verification checks.",
        ],
      },
      {
        heading: "Host responsibilities",
        paragraphs: [
          "You are responsible for providing accurate settlement details and for any taxes arising from funds you receive.",
          "We may withhold or reverse settlement where required to address fraud, disputes, chargebacks, or legal obligations.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Settlement questions can be sent to ${email}.`],
      },
    ],
  },
};

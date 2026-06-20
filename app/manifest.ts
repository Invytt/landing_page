import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Invytt — The all-in-one platform for hosting events",
    short_name: "Invytt",
    description:
      "Invites, RSVPs, AI inventory planning, a vendor marketplace, and cost-splitting — all in one app. Built for the everyday host in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    lang: "en-IN",
    categories: ["lifestyle", "productivity", "events"],
    icons: [
      {
        src: "/logo-black.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

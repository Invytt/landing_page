import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Invytt — Every good plan starts with an invite",
    short_name: "Invytt",
    description:
      "Invites, RSVPs, AI supply planning, cost-splitting and live party games, all in one app. Built for the everyday host in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#1F0B0C",
    theme_color: "#1F0B0C",
    lang: "en-IN",
    categories: ["lifestyle", "productivity", "events"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

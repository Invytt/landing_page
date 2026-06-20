import type { MetadataRoute } from "next";

const SITE_URL = "https://invytt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["problem", "features", "how-it-works"].map((id) => ({
      url: `${SITE_URL}/#${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

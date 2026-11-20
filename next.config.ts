import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  // Every image in public/ is already a small, compressed WebP. Resizing them
  // on request only added a wait (seconds, the first time each size was asked
  // for) before the picture showed, so they are served as they are.
  images: { unoptimized: true },
};

export default nextConfig;

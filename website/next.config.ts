import path from "node:path";
import type { NextConfig } from "next";

const GITHUB_ISSUES = "https://github.com/DeepanshuPal/hush/issues";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile in a parent directory is ignored.
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // The paid license is gone: Hush is free and open source.
      { source: "/license", destination: "/faq", permanent: true },
      { source: "/license/:path*", destination: "/faq", permanent: true },
      { source: "/payment", destination: "/download", permanent: true },
      { source: "/payment/:path*", destination: "/download", permanent: true },
      { source: "/feedback", destination: GITHUB_ISSUES, permanent: true },
      { source: "/changelogs", destination: "/changelog", permanent: true },
    ];
  },
};

export default nextConfig;

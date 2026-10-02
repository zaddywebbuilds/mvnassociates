import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files from a project subpath, so that build needs
 * an export, a basePath and the image optimizer turned off. Local dev and any
 * Node host keep the optimizer, so the flag is opt in rather than permanent.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "mvnassociates";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack does not walk up into the home directory.
  turbopack: {
    root: process.cwd(),
  },
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: `/${repo}`,
        assetPrefix: `/${repo}`,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] as const },
      }),
};

export default nextConfig;

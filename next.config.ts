import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opt into Cache Components (PPR / runtime-friendly rendering).
  // This replaces the old experimental.ppr behavior from Next 15 and
  // enables the `use cache` / `cacheLife` / `cacheTag` APIs.
  cacheComponents: true,
};

export default nextConfig;

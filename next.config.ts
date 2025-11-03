import type { NextConfig } from "next";

const nextConfig: NextConfig = {
experimental: {
    forceSwcTransforms: true, // Forzar transformaciones SWC
  },
};

export default nextConfig;

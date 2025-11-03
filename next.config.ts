import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Usar esta configuración solo para producción (Vercel)
  ...(process.env.NODE_ENV === 'production' && {
    webpack: (config) => config,
  })
};

export default nextConfig;
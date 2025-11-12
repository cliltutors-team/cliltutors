import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // 1. Desactivar el manejo predeterminado de archivos SVG de Next.js
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // 2. Agregar la regla para usar @svgr/webpack para SVGs
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // <- desactiva SVGO
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración explícita para evitar el conflicto
  turbopack: {}, // Configuración vacía de Turbopack
};

export default nextConfig;
/* eslint-disable @typescript-eslint/no-explicit-any */
// next.config.ts
import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    // 1) Excluir .svg del loader de assets de Next
    const rules = (config.module?.rules ?? []) as RuleSetRule[];

    const fileLoaderRule = rules.find(
      (rule: RuleSetRule) =>
        typeof rule === "object" &&
        rule !== null &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // (Opcional, por si tu setup tiene oneOf anidado)
    for (const rule of rules) {
      if ("oneOf" in (rule as any) && Array.isArray((rule as any).oneOf)) {
        for (const r of (rule as any).oneOf as RuleSetRule[]) {
          if (r.test instanceof RegExp && r.test.test(".svg")) {
            r.exclude = /\.svg$/i;
          }
        }
      }
    }

    // 2) Añadir SVGR para importar SVG como componentes React
    rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
          },
        },
      ],
    });

    config.module = config.module || {};
    config.module.rules = rules;

    return config;
  },
};

export default nextConfig;

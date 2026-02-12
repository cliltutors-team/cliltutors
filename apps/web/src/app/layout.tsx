// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Poppins, Quicksand } from "next/font/google";
import "./globals.css";

import I18nProvider from "../components/I18nProvider";
import { getServerLocale } from "@/src/lib/locale";
import { createMetadataForPage } from "@/src/lib/i18n/metadata";

// Montserrat → títulos / estructura
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Poppins → párrafos / CTAs
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Quicksand → UI, pills, microcopy
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const dynamic = "force-dynamic";

// ✅ Metadata global automática (usa tu JSON: metadata.default)
export async function generateMetadata(): Promise<Metadata> {
  // Si no tienes "metadata.pages.default", esta función igual cae al default del JSON
  return createMetadataForPage("default");
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`
          ${montserrat.variable}
          ${poppins.variable}
          ${quicksand.variable}
          antialiased
          overflow-x-hidden
        `}
      >
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Poppins, Quicksand } from "next/font/google";
import "./globals.css";

import I18nProvider from "../components/I18nProvider";
import Header from "../components/header";
import Footer from "../components/Footer";
import { WhatsAppButton } from "@/src/components/whatsappButton";

import { cookies, headers } from "next/headers";
import {
  getMetaDict,
  pickLocale,
  DEFAULT_LOCALE,
  type Locale,
} from "@/src/lib/getMeta";

/* ===========================
   FUENTES GOOGLE (OPTIMIZADAS)
   =========================== */

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

/* ===========================
   METADATA DINÁMICA (i18n)
   =========================== */

export async function generateMetadata(): Promise<Metadata> {
  const c = await cookies();
  const h = await headers();

  const cookieLocale = c.get("locale")?.value as Locale | undefined;
  const accept = h.get("accept-language") || undefined;
  const locale = cookieLocale ?? pickLocale(accept) ?? DEFAULT_LOCALE;

  const meta = await getMetaDict(locale);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  };
}

export const dynamic = "force-dynamic";

/* ===========================
   ROOT LAYOUT
   =========================== */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const c = await cookies();
  const h = await headers();

  const cookieLocale = c.get("locale")?.value as Locale | undefined;
  const accept = h.get("accept-language") || undefined;
  const locale = cookieLocale ?? pickLocale(accept) ?? DEFAULT_LOCALE;

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
        <I18nProvider locale={locale}>
          <Header />

          <main className="relative min-h-screen">{children}</main>

          <Footer />
        </I18nProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}

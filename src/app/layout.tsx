// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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

// ✅ Fuente global Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

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
      <body className={`${montserrat.variable} antialiased overflow-x-hidden`}>
        <I18nProvider locale={locale}>
          <Header />

          <main className="relative">{children}</main>

          <Footer />
        </I18nProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}

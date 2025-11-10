import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LanguageSwitcher from "@/src/components/languageSwitcher";
import I18nProvider from "../components/I18nProvider";
import Header from "../components/Header";
import { cookies, headers } from "next/headers";
import {
  getMetaDict,
  pickLocale,
  DEFAULT_LOCALE,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/src/lib/getMeta";

// Fuente local OTF
const subjectivity = localFont({
  src: "./fonts/Subjectivity-Regular.otf",
  variable: "--font-subjectivity",
  weight: "400",
  style: "normal",
});

// ✅ METADATA DINÁMICA
export async function generateMetadata(): Promise<Metadata> {
  const c = await cookies();
  const h = await headers();

  const cookieLocale = c.get("locale")?.value as Locale | undefined;
  const accept = h.get("accept-language") || undefined;
  const locale = cookieLocale ?? pickLocale(accept) ?? DEFAULT_LOCALE;

  const meta = await getMetaDict(locale);

  const ogLocale =
    locale === "es" ? "es_ES" : locale === "pt" ? "pt_BR" : "en_US";

  const ogAlternate = SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) =>
    l === "es" ? "es_ES" : l === "pt" ? "pt_BR" : "en_US"
  );

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: meta.ogSiteName,
      locale: ogLocale,
      alternateLocale: ogAlternate,
      type: "website",
    },
  };
}

export const dynamic = "force-dynamic";

// ✅ ROOT LAYOUT
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
      <body className={`${subjectivity.variable} antialiased`}>
        <I18nProvider>
          <Header />
          {children}
          <LanguageSwitcher />
        </I18nProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import I18nProvider from "../components/I18nProvider";
import Header from "../components/Header";
import Image from "next/image";
import { cookies, headers } from "next/headers";
import { usePathname } from "next/navigation";

import {
  getMetaDict,
  pickLocale,
  DEFAULT_LOCALE,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/src/lib/getMeta";

// Fuentes
const subjectivity = localFont({
  src: "./fonts/Subjectivity-Regular.otf",
  variable: "--font-subjectivity",
  weight: "400",
  style: "normal",
});

const montserratAlt = localFont({
  src: "./fonts/MontserratAlt-Regular.ttf",
  variable: "--font-montserrat-alt",
  weight: "400",
  style: "normal",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

// Metadata
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

  // Detectamos la ruta actual
  const pathname = (await headers()).get("x-invoke-path") || "/";

  const isHome = pathname === "/";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${subjectivity.variable} ${montserratAlt.variable} ${poppins.variable} antialiased overflow-x-hidden`}
      >
        <I18nProvider locale={locale}>
          {/* 🔥 Fondo degradado SOLO EN HOME */}
          {isHome && (
            <div
              className="
                pointer-events-none 
                absolute inset-x-0 -right-125 -top-140 
                -z-10 flex justify-center overflow-hidden
              "
              aria-hidden="true"
            >
              <Image
                src="/images/bg_difuminadoo.webp"
                alt="Background gradient"
                width={1400}
                height={600}
                className="max-w-none select-none pointer-events-none"
                priority
              />
            </div>
          )}

          {/* HEADER TRANSPARENTE */}
          <Header />

          {/* CONTENIDO */}
          <main className="relative">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}

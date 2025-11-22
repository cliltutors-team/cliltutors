// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import I18nProvider from "../components/I18nProvider";
import { WhatsAppButton } from "@/src/components/whatsappButton";
import Header from "../components/Header";
import Image from "next/image";
import { cookies, headers } from "next/headers";

import {
  getMetaDict,
  pickLocale,
  DEFAULT_LOCALE,
  type Locale,
} from "@/src/lib/getMeta";
import Footer from "../components/Footer";

// Fuentes
const subjectivity = localFont({
  src: [
    {
      path: "./fonts/Subjectivity-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Subjectivity-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Subjectivity-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Subjectivity-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-subjectivity",
});

// ✅ Fuente local MontserratAlt
const montserratAlt = localFont({
  src: "./fonts/MontserratAlt-Regular.ttf",
  variable: "--font-montserrat-alt",
  weight: "400",
  style: "normal",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // Puedes ajustar los pesos que uses
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

  // Detectar ruta por header x-invoke-path
  const pathname = h.get("x-invoke-path") || "/";
  const isHome = pathname === "/";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${subjectivity.variable} ${montserratAlt.variable} ${poppins.variable} antialiased overflow-x-hidden`}
      >
        <I18nProvider locale={locale}>
          {isHome && (
            <div
              className="
                pointer-events-none 
                absolute inset-x-0 md:-right-125 md:-top-140 -top-15
                -z-10 flex justify-center overflow-x-hidden
              "
              aria-hidden="true"
            >
              <Image
                src="/images/bg_difuminadoo.webp"
                alt="Background gradient"
                width={1400}
                height={600}
                className="max-w-none select-none pointer-events-none overflow-hidden"
                priority
              />
            </div>
          )}

          <Header />

          <main className="relative">{children}</main>

          <Footer />
        </I18nProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}

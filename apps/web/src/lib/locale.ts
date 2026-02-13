import { cookies, headers } from "next/headers";
import { pickLocale, DEFAULT_LOCALE, type Locale } from "@/src/lib/getMeta";

export async function getServerLocale(): Promise<Locale> {
  const c = await cookies();
  const h = await headers();

  const cookieLocale = c.get("locale")?.value as Locale | undefined;
  const accept = h.get("accept-language") || undefined;

  return cookieLocale ?? pickLocale(accept) ?? DEFAULT_LOCALE;
}

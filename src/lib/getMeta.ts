export type Locale = "en" | "es" | "pt";

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

export async function getLangDict(locale: Locale) {
  try {
    const langData = await import(`../lib/data/languages/${locale}.json`);
    return langData.default ?? langData;
  } catch {
    const fallback = await import(
      `../lib/data/languages/${DEFAULT_LOCALE}.json`
    );
    return fallback.default ?? fallback;
  }
}

export function pickLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const languages = acceptLanguage
    .split(",")
    .map((l) => l.trim().toLowerCase());

  for (const lang of languages) {
    const base = lang.split("-")[0];
    if (SUPPORTED_LOCALES.includes(base as Locale)) return base as Locale;
  }

  return DEFAULT_LOCALE;
}

import { promises as fs } from "fs";
import path from "path";

export type Locale = "en" | "es" | "pt";

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

export async function getMetaDict(locale: Locale) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public/languages",
      `${locale}.json`
    );
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data).meta;
  } catch {
    const fallback = path.join(
      process.cwd(),
      "public/languages",
      `${DEFAULT_LOCALE}.json`
    );
    const data = await fs.readFile(fallback, "utf8");
    return JSON.parse(data).meta;
  }
}

export function pickLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const languages = acceptLanguage
    .split(",")
    .map((l) => l.trim().toLowerCase());

  for (const lang of languages) {
    const base = lang.split("-")[0];
    if (SUPPORTED_LOCALES.includes(base as Locale)) {
      return base as Locale;
    }
  }

  return DEFAULT_LOCALE;
}

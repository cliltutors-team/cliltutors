import type { Locale } from "@/src/lib/getMeta";
import { getLangDict } from "@/src/lib/getMeta";
import type { I18nDict } from "@/src/lib/i18n/types";

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export async function getDict(locale: Locale): Promise<I18nDict> {
  const d = await getLangDict(locale);
  return (d?.default ?? d) as unknown as I18nDict;
}

export async function createT(locale: Locale) {
  const dict = await getDict(locale);

  return function t(key: string, fallback?: string): string {
    const val = getPath(dict, key);
    if (typeof val === "string") return val;
    return fallback ?? key;
  };
}

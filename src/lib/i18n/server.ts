import type { Locale } from "@/src/lib/getMeta";
import { getLangDict } from "@/src/lib/getMeta";

type Dict = Record<string, any>;

function getPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export async function getDict(locale: Locale): Promise<Dict> {
  const d = await getLangDict(locale);
  return (d?.default ?? d) as Dict;
}

export async function createT(locale: Locale) {
  const dict = await getDict(locale);

  return function t(key: string, fallback?: string) {
    const val = getPath(dict, key);
    if (typeof val === "string") return val;
    return fallback ?? key;
  };
}

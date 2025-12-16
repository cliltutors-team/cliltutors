import type { Locale } from "@/src/lib/getMeta";
import { getLangDict } from "@/src/lib/getMeta";

/**
 * Diccionario i18n genérico:
 * - JSON profundo
 * - valores string u objetos anidados
 */
type Dict = Record<string, unknown>;

/**
 * Acceso seguro a paths tipo "auth.login.title"
 */
function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Obtiene el diccionario del idioma
 */
export async function getDict(locale: Locale): Promise<Dict> {
  const d = await getLangDict(locale);
  return (d?.default ?? d) as Dict;
}

/**
 * Crea función de traducción server-side
 */
export async function createT(locale: Locale) {
  const dict = await getDict(locale);

  return function t(key: string, fallback?: string): string {
    const val = getPath(dict, key);
    if (typeof val === "string") return val;
    return fallback ?? key;
  };
}

// Ya no necesitamos 'fs' ni 'path' para esta función.
// Next.js maneja la inclusión del JSON en el bundle del servidor a través de 'import()'.

export type Locale = "en" | "es" | "pt";

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

export async function getMetaDict(locale: Locale) {
  try {
    const langData = await import(`../data/languages/${locale}.json`);

    // Devolvemos la propiedad 'meta' del objeto JSON cargado.
    return langData.meta;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // En caso de que el archivo del 'locale' solicitado no exista,
    // cargamos el idioma por defecto como fallback.
    const fallback = await import(`../data/languages/${DEFAULT_LOCALE}.json`);

    // Puedes loguear el error para depuración si es necesario:
    // console.error(`Error loading metadata for locale ${locale}. Using fallback.`, e);

    return fallback.meta;
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

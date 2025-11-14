// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 👇 importa las traducciones directamente en el bundle
import es from "./data/languages/es.json";
import en from "./data/languages/en.json";
import pt from "./data/languages/pt.json";

const resources = {
  es: { translation: es },
  en: { translation: en },
  pt: { translation: pt },
};

export function initI18n(lng: string) {
  // si ya está inicializado, solo cambia de idioma si hace falta
  if (i18n.isInitialized) {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
    return i18n;
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: "es",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })
    .catch((err) => {
      console.error("i18n init error:", err);
    });

  return i18n;
}

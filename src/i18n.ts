// src/i18n.ts
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(Backend) // carga via HTTP desde /languages/{{lng}}.json
    .use(initReactI18next)
    .init({
      fallbackLng: "es",
      lng: "es",
      ns: ["translation"],
      defaultNS: "translation",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      backend: {
        // ruta desde donde i18next solicitará los JSON
        loadPath: "/languages/{{lng}}.json",
      },
    })
    .catch((err) => {
      // si hay fallo en init, al menos no rompe la app
      console.error("i18n init error:", err);
    });
}

export default i18n;

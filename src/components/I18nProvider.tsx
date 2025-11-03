"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/src/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Si i18n ya está inicializado, sincronizamos idioma desde localStorage o navegador
    const langFromStorage = (() => {
      try {
        return localStorage.getItem("language");
      } catch {
        return null;
      }
    })();

    const detect =
      langFromStorage ||
      (typeof navigator !== "undefined" ? navigator.language : null) ||
      "es";
    const normalized = detect.toLowerCase().startsWith("pt")
      ? "pt"
      : detect.toLowerCase().startsWith("en")
      ? "en"
      : "es";

    // cambiar idioma (si i18n ya inicializó el backend hará fetch automático)
    i18n.changeLanguage(normalized).finally(() => setReady(true));
  }, []);

  // Mientras no esté listo, devolvemos children igualmente para evitar bloquear SSR,
  // los componentes cliente que usen useTranslation se re-renderizarán cuando i18n esté listo.
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

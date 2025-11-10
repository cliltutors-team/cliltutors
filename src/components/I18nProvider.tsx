// src/components/I18nProvider.tsx
"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/src/i18n";

export default function I18nProvider({
  children,
  locale, // 👈 ACEPTAR LA PROP 'locale' DEL SERVIDOR
}: {
  children: React.ReactNode;
  locale: string; // Tipo esperado del layout.tsx
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1. OBTENER el idioma del almacenamiento local (si existe) para la persistencia.
    const langFromStorage = (() => {
      try {
        return localStorage.getItem("language");
      } catch {
        return null;
      }
    })();

    // 2. PRIORIZAR: (1) Storage (persistencia), luego (2) el 'locale' del servidor (inicial).
    // El 'locale' del servidor ya fue determinado por cookies y headers.
    const finalLocale = langFromStorage || locale;

    // 3. CAMBIAR y cargar el idioma, y marcar como listo.
    i18n.changeLanguage(finalLocale).finally(() => setReady(true));
  }, [locale]); // Dependencia en 'locale' para re-ejecutar si el layout cambia (e.g., al cambiar la cookie)

  if (!ready) {
    // 💡 IMPORTANTE: El servidor ya ha renderizado el contenido,
    // pero si i18next es lento, este loader evita el parpadeo.
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-600 animate-pulse">Cargando traducciones...</p>
      </div>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

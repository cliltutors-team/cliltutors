"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/src/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
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

    i18n.changeLanguage(normalized).finally(() => setReady(true));
  }, []);

  if (!ready) {
    // 👇 Aquí puedes poner un loader bonito o un skeleton global
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-600 animate-pulse">Cargando traducciones...</p>
      </div>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

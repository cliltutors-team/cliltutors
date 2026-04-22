// src/components/I18nProvider.tsx
"use client";

import React, { ReactNode, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { initI18n } from "@/src/i18n";

export default function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  // 👇 i18n se inicializa con el idioma correcto ANTES de renderizar
  const i18n = useMemo(() => initI18n(locale), [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import LanguageSwitcher from "@/src/components/languageSwitcher"; // ajusta la ruta si la tienes en otro lugar
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Testimonials from '@/src/components/Testimonials';

/**
 * Página que usa react-i18next (SPA)
 * - Asume que i18n ya está inicializado en la app (I18nProvider o import en layout/_app)
 * - Muestra textos mediante t('home.title'), etc.
 * - Se actualizará inmediatamente cuando se llame i18n.changeLanguage(...)
 */

export default function HomePage() {
  // useTranslation devuelve la función t y la instancia i18n
  const { t, i18n } = useTranslation();

  // opcional: control visual mientras i18n carga recursos (si usas backend)
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    // Si i18n ya inicializó resources, marcar como listo.
    // Si usas i18next-http-backend, changeLanguage() dispara la carga y luego 'isInitialized'
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      // escucha evento que indica que i18n ya cargó
      const onInit = () => setReady(true);
      i18n.on && i18n.on("initialized", onInit);
      // Si i18n estuvo inicializado entre el mount y la suscripción:
      if (i18n.isInitialized) setReady(true);
      return () => {
        i18n.off && i18n.off("initialized", onInit);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si no estás usando backend o todo está ya en memoria, listo siempre.
  if (!ready) {
    // no bloqueante: deja que se vea algo mientras carga traducciones
    // Si prefieres que se muestre siempre aunque no esté listo, quita este bloque.
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando traducciones...</p>
        <LanguageSwitcher />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-zinc-50 dark:bg-black text-center">
      {/* Usamos las keys dentro del JSON: 'home.title', 'home.description', ... */}
      <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
      <p className="max-w-2xl text-lg mb-6">{t("home.description")}</p>

      <button className="px-6 py-3 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition">
        {t("home.button")}
      </button>

      <p className="mt-8 text-sm opacity-70">{t("home.footer")}</p>

      {/* Mostrar idioma actual (opcional) */}
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Idioma actual: <strong>{(i18n.language || "es").slice(0, 2)}</strong>
      </p>

      {/* El LanguageSwitcher ya en layout, lo dejo también por si quieres */}
      <LanguageSwitcher />

      <Testimonials/>
    </main>
  );
}

/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import LanguageSwitcher from "@/src/components/languageSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Testimonials from '@/src/components/Testimonials';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
    } else {
      const onInit = () => setReady(true);
      i18n.on && i18n.on("initialized", onInit);
      if (i18n.isInitialized) setReady(true);
      return () => {
        i18n.off && i18n.off("initialized", onInit);
      };
    }
  }, [i18n]);

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center text-black">
        <p>Cargando traducciones...</p>
        <LanguageSwitcher />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#fffefe] text-center text-black">
      <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
      <p className="max-w-2xl text-lg mb-6">{t("home.description")}</p>

      <button className="px-6 py-3 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition">
        {t("home.button")}
      </button>

      <p className="mt-8 text-sm opacity-70">{t("home.footer")}</p>

      <p className="mt-2 text-xs text-black">
        Idioma actual: <strong>{(i18n.language || "es").slice(0, 2)}</strong>
      </p>

      <Testimonials/>
    </main>
  );
}

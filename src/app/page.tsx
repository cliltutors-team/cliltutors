/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Hero from "../components/hero";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (i18n.isInitialized) {
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
      </main>
    );
  }

  return <Hero />;
}

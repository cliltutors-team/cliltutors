"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { setLocaleCookie } from "@/src/app/action";
import { useState } from "react";

type Lang = { code: string; label: string; flag: string };

const LANGUAGES: Lang[] = [
  { code: "es", label: "Español", flag: "es" },
  { code: "en", label: "English", flag: "us" },
  { code: "pt", label: "Português", flag: "br" },
];

const localFlag = (c: string) => `/flags/${c}.svg`;
const cdnFlag = (c: string) =>
  `https://unpkg.com/circle-flags@1.0.27/flags/${c}.svg`;

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();

  // 👇 i18n.language ya viene seteado por el I18nProvider (según cookie/servidor)
  const [current, setCurrent] = useState(() => {
    const lng = (i18n.language || "es").slice(0, 2);
    return lng as "es" | "en" | "pt";
  });

  const select = async (code: string) => {
    const normalized = code.slice(0, 2) as "es" | "en" | "pt";
    if (normalized === current) return;

    // 1) Cambia idioma en i18next (instantáneo en UI)
    await i18n.changeLanguage(normalized);

    // 2) Actualiza estado local del switcher
    setCurrent(normalized);

    // 3) (Opcional) Guarda también en localStorage si quieres
    try {
      localStorage.setItem("language", normalized);
    } catch {}

    // 4) Actualiza cookie en el servidor
    await setLocaleCookie(normalized);

    // 5) Refresca para que el server use ese idioma en futuras navegaciones
    router.refresh();
  };

  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    code: string
  ) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === "cdn") return;
    img.dataset.fallback = "cdn";
    img.src = cdnFlag(code);
  };

  return (
    <div className="flex items-center gap-3">
      {LANGUAGES.map((lang) => {
        const active = current === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => select(lang.code)}
            title={lang.label}
            aria-label={`Cambiar a ${lang.label}`}
            className={[
              "w-7 h-7 rounded-full overflow-hidden shrink-0",
              "bg-white transition-shadow duration-150",
              active
                ? "ring-2 ring-[#36DE6B] ring-offset-2 ring-offset-white"
                : "hover:ring-2 hover:ring-[#9ff3b9] hover:ring-offset-2 hover:ring-offset-white cursor-pointer",
            ].join(" ")}
          >
            <Image
              src={localFlag(lang.flag)}
              alt={lang.label}
              width={28}
              height={28}
              className="rounded-full w-full h-full select-none pointer-events-none will-change-transform"
              onError={(e) => handleImgError(e as never, lang.flag)}
              draggable={false}
              quality={100}
            />
          </button>
        );
      })}
    </div>
  );
}

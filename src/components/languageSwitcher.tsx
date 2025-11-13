"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import i18n from "@/src/i18n";
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
  const [current, setCurrent] = useState(() => {
    try {
      const stored = localStorage.getItem("language");
      return stored ? stored.slice(0, 2) : "es";
    } catch {
      return "es";
    }
  });

  const select = async (code: string) => {
    const normalized = code.slice(0, 2);
    if (normalized === current) return;
    i18n.changeLanguage(normalized);
    setCurrent(normalized);
    try {
      localStorage.setItem("language", normalized);
    } catch {}
    await setLocaleCookie(normalized);
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
                ? // ✅ Anillo verde profesional, sin borde negro
                  "ring-2 ring-[#36DE6B] ring-offset-2 ring-offset-white"
                : // hover con verde suave
                  "hover:ring-2 hover:ring-[#9ff3b9] hover:ring-offset-2 hover:ring-offset-white cursor-pointer",
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

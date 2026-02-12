"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setLocaleCookie } from "@/src/app/action"; // ajusta si es /actions

type LangCode = "es" | "en" | "pt";
type Lang = { code: LangCode; label: string; flag: string };

const LANGUAGES: Lang[] = [
  { code: "es", label: "Español", flag: "es" },
  { code: "en", label: "English", flag: "us" },
  { code: "pt", label: "Português", flag: "br" },
];

const localFlag = (c: string) => `/flags/${c}.svg`;
const cdnFlag = (c: string) =>
  `https://unpkg.com/circle-flags@1.0.27/flags/${c}.svg`;

function ChevronDown({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [align, setAlign] = useState<"left" | "right">("right");

  const current = useMemo(() => {
    const lng = (i18n.language || "es").slice(0, 2) as LangCode;
    return LANGUAGES.find((l) => l.code === lng) ?? LANGUAGES[0];
  }, [i18n.language]);

  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    code: string
  ) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === "cdn") return;
    img.dataset.fallback = "cdn";
    img.src = cdnFlag(code);
  };

  // ✅ calcula posición SIN useEffect (para evitar setState-in-effect)
  const computePlacement = useCallback(() => {
    const root = rootRef.current;
    const menu = menuRef.current;
    if (!root || !menu) return;

    const rootRect = root.getBoundingClientRect();

    // medidas reales del menú (si está visible)
    const menuWidth = menu.offsetWidth || 208;
    const menuHeight = menu.offsetHeight || 220;

    const spaceBelow = window.innerHeight - rootRect.bottom;
    const spaceAbove = rootRect.top;

    const nextDropUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;
    setDropUp(nextDropUp);

    // prevenir choque con bordes (margen 8px)
    const wouldOverflowLeft = rootRect.right - menuWidth < 8;
    const wouldOverflowRight =
      rootRect.left + menuWidth > window.innerWidth - 8;

    if (wouldOverflowLeft && !wouldOverflowRight) setAlign("left");
    else setAlign("right");
  }, []);

  // ✅ cerrar al click afuera / escape (OK que el effect haga listeners)
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // ✅ si está abierto, recalcula en resize/scroll (sin usar setState *directo* en effect body)
  useEffect(() => {
    if (!open) return;

    const rafRecalc = () => requestAnimationFrame(computePlacement);

    window.addEventListener("resize", rafRecalc, { passive: true });
    // scroll puede venir de cualquier contenedor
    window.addEventListener("scroll", rafRecalc, { passive: true });

    // primer cálculo al abrir (deferred)
    rafRecalc();

    return () => {
      window.removeEventListener("resize", rafRecalc);
      window.removeEventListener("scroll", rafRecalc);
    };
  }, [open, computePlacement]);

  const toggleOpen = () => {
    // si va a abrir, necesitamos calcular con el menú “medible”
    setOpen((v) => !v);
  };

  const select = async (code: LangCode) => {
    if (code === current.code) {
      setOpen(false);
      return;
    }

    await i18n.changeLanguage(code);
    try {
      localStorage.setItem("language", code);
    } catch {}

    await setLocaleCookie(code);
    router.refresh();
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggleOpen}
        className={[
          "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5",
          "shadow-sm transition hover:bg-gray-50",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="relative h-5 w-5 overflow-hidden rounded-full">
          <Image
            src={localFlag(current.flag)}
            alt={current.label}
            fill
            sizes="20px"
            className="object-cover"
            onError={(e) => handleImgError(e as never, current.flag)}
            draggable={false}
            quality={100}
          />
        </span>

        <span className="text-xs font-semibold tracking-wide text-gray-800">
          {current.code.toUpperCase()}
        </span>

        <ChevronDown
          className={[
            "h-4 w-4 text-gray-500 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      <div
        ref={menuRef}
        className={[
          "absolute w-52 overflow-hidden rounded-xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur",
          "transition-all duration-150",
          dropUp ? "bottom-full mb-2" : "top-full mt-2",
          align === "left" ? "left-0" : "right-0",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none",
        ].join(" ")}
        role="menu"
        aria-label="Language"
      >
        <div className="p-1">
          {LANGUAGES.map((lang) => {
            const active = lang.code === current.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => select(lang.code)}
                role="menuitem"
                className={[
                  "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm",
                  "transition",
                  active
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-50 text-gray-800",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                ].join(" ")}
              >
                <span className="relative h-5 w-5 overflow-hidden rounded-full">
                  <Image
                    src={localFlag(lang.flag)}
                    alt={lang.label}
                    fill
                    sizes="20px"
                    className="object-cover"
                    onError={(e) => handleImgError(e as never, lang.flag)}
                    draggable={false}
                    quality={100}
                  />
                </span>

                <span className="flex-1">{lang.label}</span>
                {active ? (
                  <span className="text-xs font-semibold text-gray-600">✓</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

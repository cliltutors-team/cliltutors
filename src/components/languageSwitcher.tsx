"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 👈 NECESARIO PARA router.refresh()
import i18n from "@/src/i18n";
import { setLocaleCookie } from "@/src/app/action"; // 👈 IMPORTACIÓN DE LA SERVER ACTION

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
  const router = useRouter(); // 👈 Inicializa useRouter para recarga
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const initialFromI18n = (() => {
    try {
      const lng = (i18n && i18n.language) || "es";
      return lng.slice(0, 2);
    } catch {
      return "es";
    }
  })();

  const [current, setCurrent] = useState<string>(initialFromI18n);

  const tamMain = 56;
  const tamItem = 42; // 🔹 más pequeñas
  const gap = 8;

  // Efecto 1: Inicializa el idioma desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("language");
      if (stored && stored.slice(0, 2) !== current) {
        const norm = stored.slice(0, 2);
        i18n.changeLanguage(norm);
        setCurrent(norm);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efecto 2: Escucha cambios en i18n para actualizar el estado y localStorage
  useEffect(() => {
    const handler = (lng: string) => {
      const code = lng.startsWith("pt")
        ? "pt"
        : lng.startsWith("en")
        ? "en"
        : "es";
      setCurrent(code);
      try {
        localStorage.setItem("language", code);
      } catch {}
    };
    if (i18n && typeof i18n.on === "function") {
      i18n.on("languageChanged", handler);
      return () => i18n.off("languageChanged", handler);
    }
  }, []);

  // Efecto 3: Cierra el menú al hacer clic fuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // 🚨 FUNCIÓN DE SELECCIÓN CLAVE: Sincroniza Cliente y Servidor
  const select = async (code: string) => {
    const normalized = code.slice(0, 2);
    if (normalized === current) return setOpen(false);

    // 1. Actualización del Cliente (inmediata)
    i18n.changeLanguage(normalized);
    setCurrent(normalized);
    try {
      localStorage.setItem("language", normalized);
    } catch {}

    // 2. Sincronización con el Servidor (establecer cookie y recargar)
    await setLocaleCookie(normalized); // 👈 Llama a la Server Action
    router.refresh(); // 👈 Fuerza la re-ejecución del Layout

    setOpen(false);
  };

  // Manejo de error de carga de imagen (fallback a CDN)
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    code: string
  ) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === "cdn") return;
    img.dataset.fallback = "cdn";
    img.src = cdnFlag(code);
  };

  const currentMeta = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];
  const items = LANGUAGES.filter((l) => l.code !== current);

  return (
    <div ref={rootRef} className="fixed right-6 bottom-6 z-50">
      <div className="relative w-max h-max">
        {/* Menú de banderas */}
        <div
          role="menu"
          aria-hidden={!open}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: tamMain,
            height: tamMain,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {items.map((lang, i) => {
            const bottomPx = tamMain + gap + i * (tamItem + gap);
            return (
              <button
                key={lang.code}
                onClick={() => select(lang.code)} // 👈 Llamada a la función asíncrona
                title={lang.label}
                aria-label={`Cambiar a ${lang.label}`}
                className="absolute left-1/2 -translate-x-1/2 rounded-full 
             bg-white/20 backdrop-blur-md shadow-md 
             flex items-center justify-center transition-transform 
             hover:scale-105 focus:outline-none cursor-pointer"
                style={{
                  width: tamItem,
                  height: tamItem,
                  bottom: `${bottomPx}px`,
                  transition:
                    "transform 160ms ease, opacity 160ms ease, bottom 220ms ease",
                  opacity: open ? 1 : 0,
                }}
              >
                <Image
                  src={localFlag(lang.flag)}
                  alt={lang.label}
                  width={tamItem - 8}
                  height={tamItem - 8}
                  className="object-cover rounded-full"
                  onError={(e) => handleImgError(e as never, lang.flag)}
                  draggable={false}
                />
              </button>
            );
          })}
        </div>

        {/* Botón principal */}
        <div className="flex items-center justify-center">
          <button
            className="relative rounded-full 
             bg-white/20 backdrop-blur-md shadow-2xl 
             flex items-center justify-center active:scale-95 transform 
             transition-transform focus:outline-none cursor-pointer"
            aria-label="Seleccionar idioma"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            style={{ width: tamMain, height: tamMain }}
          >
            <Image
              src={localFlag(currentMeta.flag)}
              alt={currentMeta.label}
              width={tamMain - 12}
              height={tamMain - 12}
              className="object-cover rounded-full"
              onError={(e) => handleImgError(e as never, currentMeta.flag)}
              draggable={false}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

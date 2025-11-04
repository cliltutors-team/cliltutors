"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, BookOpen, User, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "/", label: t("header.home"), Icon: Home },
    { href: "/courses", label: t("header.courses"), Icon: BookOpen },
    { href: "/teachers", label: t("header.teachers"), Icon: User },
    { href: "/about", label: t("header.about"), Icon: Info },
  ];

  // cerrar con ESC y cerrar si se cambia a escritorio
  useEffect(() => {
    function onKey(e: { key: string }) {
      if (e.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // cerrar si el usuario hace click fuera del dropdown (solo móvil)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (!dropdownRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!dropdownRef.current.contains(e.target)) {
        const toggle = document.getElementById("mobile-menu-toggle");
        if (toggle && toggle.contains(e.target)) return;
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between md:w-[70%] w-[90%] mx-auto py-4 relative">
        {/* LOGO - siempre visible */}
        <Link href="/" className="flex items-center gap-3 z-20">
          <Image
            src="/images/logo_Cliltutors.png"
            alt="Cliltutors — logo"
            width={130}
            height={130}
            priority
            quality={100}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 text-[#444665] text-[1.05rem] font-semibold">
          {navLinks.map((l, i) => (
            <li key={i}>
              <Link
                href={l.href}
                className="hover:text-[#e45876] transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile button */}
        <div className="flex items-center gap-4 z-20">
          <Link href="/contact" className="hidden md:inline-block">
            <button className="bg-[#36DE6B] text-white px-5 py-2 rounded-full hover:bg-[#27b956] transition-colors duration-200">
              {t("header.contact")}
            </button>
          </Link>

          <button
            id="mobile-menu-toggle"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden p-2 rounded-md text-[#444665] hover:bg-gray-100 transition"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Dropdown móvil (aparece debajo del nav) */}
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 top-full mt-2 z-10 md:hidden flex justify-center pointer-events-none`}
          aria-hidden={!open}
        >
          {/* Panel: ahora SOLO usa opacidad para animar */}
          <div
            className={`w-[92%] max-w-md bg-white rounded-2xl shadow-2xl transition-opacity duration-200
              ${
                open
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }
            `}
            style={{ transitionProperty: "opacity" }}
          >
            <div className="px-5 py-5">
              <ul className="flex flex-col gap-4 text-[#22233a]">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <span className="p-2 bg-gray-100 rounded-md">
                        <link.Icon className="w-4 h-4 text-[#444665]" />
                      </span>
                      <span className="text-base font-medium">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t pt-4">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  <button className="w-full bg-[#36DE6B] text-white py-3 rounded-full font-semibold hover:bg-[#27b956] transition">
                    {t("header.contact")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay más sutil (bg-black/10) */}
        <div
          className={`fixed inset-0 z-0 md:hidden transition-opacity duration-200 ${
            open
              ? "pointer-events-auto opacity-10"
              : "pointer-events-none opacity-0"
          } bg-black`}
          aria-hidden={!open}
          onClick={() => setOpen(false)}
        />
      </nav>
    </header>
  );
}

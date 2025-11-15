"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, BookOpen, User, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/src/components/languageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "/", hrefKey: "header.link1", Icon: Home },
    { href: "/courses", hrefKey: "header.link2", Icon: BookOpen },
    { href: "/teachers", hrefKey: "header.link3", Icon: User },
    { href: "/about", hrefKey: "header.link4", Icon: Info },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open || !dropdownRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!dropdownRef.current.contains(e.target)) {
        const toggle = document.getElementById("mobile-menu-toggle");
        if (!toggle?.contains(e.target)) setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <header
      className="
        sticky top-0 left-0 w-full z-50 h-20
        bg-transparent
        border-none shadow-none
      "
    >
      <nav
        className="
          flex items-center justify-between 
          w-full max-w-[1600px] mx-auto
          px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[260px] 
          py-3 sm:py-4 h-16 sm:h-20
          bg-transparent
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/Logo-ClilTutors.svg"
            alt="Cliltutors logo"
            width={160}
            height={45}
            priority
            quality={100}
            className="w-[120px] sm:w-[140px] md:w-40 lg:w-[180px] xl:w-[200px] h-auto"
          />
        </Link>

        {/* LINKS + SWITCHER DESKTOP */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          <ul className="font-poppins flex items-center gap-8 text-[#484a68] text-[0.95rem] lg:text-[1.05rem]">
            {navLinks.map((l, i) => (
              <li key={i}>
                <Link
                  href={l.href}
                  className="hover:text-[#36DE6B] transition-colors duration-200"
                >
                  {t(l.hrefKey)}
                </Link>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />
        </div>

        {/* BOTÓN MENÚ MÓVIL (este sí puede tener hover bg para ver el click) */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden p-2 rounded-md text-[#444665] hover:bg-white/40 transition cursor-pointer"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* DROPDOWN MÓVIL */}
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 top-full mt-2 z-10 md:hidden flex justify-center transition-all duration-300 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-[92%] max-w-md bg-white rounded-2xl shadow-xl py-5 px-5">
            <ul className="flex flex-col gap-4 text-[#22233a]">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  >
                    <span className="p-2 bg-gray-100 rounded-md">
                      <link.Icon className="w-4 h-4 text-[#444665]" />
                    </span>
                    <span className="text-base font-medium">
                      {t(link.hrefKey)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t pt-4 flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* OVERLAY MÓVIL */}
        <div
          className={`fixed inset-0 z-0 md:hidden transition-opacity duration-300 ${
            open
              ? "pointer-events-auto opacity-30 bg-black"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!open}
          onClick={() => setOpen(false)}
        />
      </nav>
    </header>
  );
}

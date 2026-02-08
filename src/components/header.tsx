"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, BookOpen, User, Info, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/src/components/languageSwitcher";

type NavLinkItem =
  | {
      kind: "link";
      href: string;
      key: string;
      Icon: React.ComponentType<{ className?: string }>;
    }
  | {
      kind: "dropdown";
      key: string;
      Icon: React.ComponentType<{ className?: string }>;
      children: { href: string; key: string }[];
    };

export default function Header() {
  const [open, setOpen] = useState(false); // menú móvil
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null
  ); // dropdown en móvil
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 👇 Links alineados con tu JSON:
  // link1: Home
  // link2: About us
  // link3: Courses (DROPDOWN)
  // link4: Tutors
  // link5: Contact
  const navLinks: NavLinkItem[] = [
    { kind: "link", href: "/", key: "header.link1", Icon: Home },
    { kind: "link", href: "/about", key: "header.link2", Icon: Info },

    // 🔽 DROPDOWN "COURSES"
    {
      kind: "dropdown",
      key: "header.link3", // "Courses / Cursos / Cursos"
      Icon: BookOpen,
      children: [
        {
          href: "/languages",
          key: "footer.courses.links.languages", // "Languages / Idiomas"
        },
        {
          href: "/academic",
          key: "footer.courses.links.academic", // "Academic / Académico"
        },
      ],
    },

    { kind: "link", href: "/tutors", key: "header.link4", Icon: User },
    { kind: "link", href: "/contact", key: "header.link5", Icon: Info },
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
        <div className="hidden md:flex items-center ml-auto w-full">
          {/* CENTRA EL MENÚ */}
          <div className="flex-1 flex justify-center">
            <ul className="font-poppins flex items-center gap-8 text-[#484a68] text-[0.95rem] lg:text-[1.05rem]">
              {navLinks.map((item, idx) => {
                if (item.kind === "link") {
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="hover:text-[#36DE6B] transition-colors duration-200"
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  );
                }

                // 🔽 DROPDOWN DESKTOP (COURSES)
                return (
                  <li key={idx} className="relative group">
                    <button
                      className="
                        inline-flex items-center gap-1 
                        hover:text-[#36DE6B]
                        transition-colors duration-200
                      "
                    >
                      {t(item.key)}
                      <ChevronDown
                        className="
                          w-4 h-4
                          transition-transform duration-200
                          group-hover:rotate-180
                        "
                      />
                    </button>

                    {/* PANEL DEL DROPDOWN */}
                    <div
                      className="
                        absolute left-1/2 top-full -translate-x-1/2
                        min-w-[180px]
                        bg-white rounded-2xl shadow-xl
                        border border-gray-100
                        py-3
                        opacity-0 translate-y-2
                        pointer-events-none
                        group-hover:opacity-100
                        group-hover:pointer-events-auto
                        group-hover:translate-y-0
                        transition-all duration-200
                      "
                    >
                      <ul className="flex flex-col gap-1">
                        {item.children.map((child, cIdx) => (
                          <li key={cIdx}>
                            <Link
                              href={child.href}
                              className="
                                block px-4 py-2.5 
                                text-sm text-[#22233a]
                                hover:bg-gray-50
                                transition-colors
                              "
                            >
                              {t(child.key)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SWITCHER DE IDIOMA A LA DERECHA */}
          <LanguageSwitcher />
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden p-2 rounded-md text-[#444665] hover:bg-white/40 transition cursor-pointer"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* DROPDOWN MÓVIL (MENÚ COMPLETO) */}
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
              {navLinks.map((item, idx) => {
                if (item.kind === "link") {
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                      >
                        <span className="p-2 bg-gray-100 rounded-md">
                          <item.Icon className="w-4 h-4 text-[#444665]" />
                        </span>
                        <span className="text-base font-medium">
                          {t(item.key)}
                        </span>
                      </Link>
                    </li>
                  );
                }

                // 🔽 DROPDOWN EN MÓVIL (ACORDEÓN)
                const isOpen = mobileDropdownOpen === item.key;

                return (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileDropdownOpen((prev) =>
                          prev === item.key ? null : item.key
                        )
                      }
                      className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-gray-100 rounded-md">
                          <item.Icon className="w-4 h-4 text-[#444665]" />
                        </span>
                        <span className="text-base font-medium">
                          {t(item.key)}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`
                        overflow-hidden transition-[max-height,opacity] duration-200
                        ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                      `}
                    >
                      <ul className="mt-1 ml-10 flex flex-col gap-1">
                        {item.children.map((child, cIdx) => (
                          <li key={cIdx}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="
                                block px-2 py-2
                                text-sm text-[#444665]
                                rounded-md hover:bg-gray-50
                                transition-colors
                              "
                            >
                              {t(child.key)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
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

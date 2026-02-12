"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  BookOpen,
  User,
  Info,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks: NavLinkItem[] = [
    { kind: "link", href: "/", key: "header.link1", Icon: Home },
    { kind: "link", href: "/about", key: "header.link2", Icon: Info },
    {
      kind: "dropdown",
      key: "header.link3",
      Icon: BookOpen,
      children: [
        { href: "/languages", key: "footer.courses.links.languages" },
        { href: "/academic", key: "footer.courses.links.academic" },
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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <nav
        className="
          flex items-center justify-between
          w-full max-w-[1600px] mx-auto
          px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[260px]
          h-16 sm:h-20
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/Logo-ClilTutors.svg"
            alt="Cliltutors logo"
            width={180}
            height={50}
            priority
            className="w-[130px] sm:w-[150px] lg:w-[180px]"
          />
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center ml-auto gap-8">
          {/* NAV */}
          <ul className="font-poppins flex items-center gap-8 text-deep-blue">
            {navLinks.map((item, idx) => {
              if (item.kind === "link") {
                return (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="hover:text-warm-yellow transition-colors"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={idx} className="relative group">
                  <button className="inline-flex items-center gap-1 hover:text-warm-yellow transition-colors">
                    {t(item.key)}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <div
                    className="
                      absolute left-1/2 top-full -translate-x-1/2
                      min-w-[180px]
                      bg-white rounded-2xl shadow-xl
                      border border-light-blue/20
                      py-3
                      opacity-0 translate-y-2 pointer-events-none
                      group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                      transition-all duration-200
                    "
                  >
                    <ul>
                      {item.children.map((child, cIdx) => (
                        <li key={cIdx}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-deep-blue hover:bg-light-blue/10"
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

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                border border-deep-blue/30
                text-deep-blue text-sm
                hover:bg-deep-blue hover:text-white
                transition
              "
            >
              <LogIn className="w-4 h-4" />
              {t("header.login") ?? "Iniciar sesión"}
            </Link>

            <Link
              href="/register"
              className="
                px-5 py-2.5 rounded-full
                bg-warm-yellow text-deep-blue
                font-semibold text-sm
                hover:bg-warm-yellow/90
                transition shadow-md
              "
            >
              {t("header.getStarted") ?? "Get started"}
            </Link>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 rounded-md text-deep-blue"
        >
          {open ? <X /> : <Menu />}
        </button>

        {/* MOBILE MENU */}
        {open && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden">
            <div className="px-5 py-6 flex flex-col gap-4">
              {navLinks.map((item, idx) =>
                item.kind === "link" ? (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-deep-blue font-medium"
                  >
                    {t(item.key)}
                  </Link>
                ) : null,
              )}

              <div className="pt-4 border-t border-light-blue/20 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full text-center py-2 rounded-full border border-deep-blue/30 text-deep-blue"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-2 rounded-full bg-warm-yellow text-deep-blue font-semibold"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

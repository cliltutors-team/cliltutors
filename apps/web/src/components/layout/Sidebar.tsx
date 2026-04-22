"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  User,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", icon: LayoutDashboard, key: "sidebar.dashboard" },
  { href: "/courses", icon: BookOpen, key: "sidebar.courses" },
  { href: "/my-learning", icon: GraduationCap, key: "sidebar.myLearning" },
  { href: "/schedule", icon: Calendar, key: "sidebar.schedule" },
  { href: "/instructors", icon: Users, key: "sidebar.instructors" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/">
          <Image
            src="/Logo-ClilTutors.svg"
            alt="Cliltutors"
            width={160}
            height={44}
            className="brightness-0 invert"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">{t("sidebar.main") || "Main"}</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item relative ${isActive ? "active" : ""}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span>{t(item.key) || item.key.split(".").pop()}</span>
            </Link>
          );
        })}

        <div className="sidebar-section-label" style={{ marginTop: "1rem" }}>
          {t("sidebar.account") || "Account"}
        </div>
        <Link
          href="/profile"
          className={`sidebar-nav-item relative ${
            pathname === "/profile" ? "active" : ""
          }`}
        >
          <User size={20} strokeWidth={pathname === "/profile" ? 2 : 1.5} />
          <span>{t("sidebar.profile") || "Profile"}</span>
        </Link>
      </nav>

      {/* Language Switcher */}
      <div className="sidebar-footer">
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="sidebar-nav-item w-full justify-between"
          >
            <span className="flex items-center gap-3">
              <Globe size={18} />
              <span>{currentLang.label}</span>
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                langOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {langOpen && (
            <div
              className="absolute bottom-full left-0 right-0 mb-1 rounded-lg overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setLangOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2.5 text-sm transition-colors
                    ${
                      lang.code === i18n.language
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

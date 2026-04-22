"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  User,
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, key: "sidebar.dashboard" },
  { href: "/courses", icon: BookOpen, key: "sidebar.courses" },
  { href: "/my-learning", icon: GraduationCap, key: "sidebar.myLearning" },
  { href: "/schedule", icon: Calendar, key: "sidebar.schedule" },
  { href: "/profile", icon: User, key: "sidebar.profile" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const Icon = item.icon;
        const label = t(item.key) || item.key.split(".").pop();

        return (
          <Link key={item.href} href={item.href} className={`mobile-nav-item ${isActive ? "active" : ""}`}>
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

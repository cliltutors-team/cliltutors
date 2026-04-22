"use client";

import { useTranslation } from "react-i18next";
import { Search, Bell, Menu } from "lucide-react";
import { currentUser } from "@/src/lib/mock/user";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { t } = useTranslation();
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="topbar">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="topbar-icon-btn lg:hidden mr-2"
        aria-label="Menu"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="topbar-search relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-gray-400)" }}
        />
        <input
          type="text"
          placeholder={t("topbar.search") || "Search courses, lessons..."}
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        <button className="topbar-icon-btn relative" aria-label="Notifications">
          <Bell size={20} />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ background: "var(--color-brand-coral)" }}
          />
        </button>

        <div className="topbar-avatar" title={currentUser.name}>
          {initials}
        </div>
      </div>
    </header>
  );
}

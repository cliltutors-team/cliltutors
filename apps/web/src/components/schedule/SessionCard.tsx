"use client";

import { useTranslation } from "react-i18next";
import { Clock, Users, User, Video, MapPin, Sparkles } from "lucide-react";
import type { Session } from "@/src/lib/types";
import { useBooking } from "@/src/lib/hooks/useBooking";

interface SessionCardProps {
  session: Session;
  lang: string;
  onBook?: (session: Session) => void;
  onCancel?: (session: Session) => void;
  showInstructor?: boolean;
  compact?: boolean;
}

const typeConfig = {
  "1on1": { badge: "badge-purple", label: "1-on-1", icon: User },
  group: { badge: "badge-blue", label: "Group", icon: Users },
  trial: { badge: "badge-green", label: "Free Trial", icon: Sparkles },
};

export default function SessionCard({
  session,
  lang,
  onBook,
  onCancel,
  showInstructor = true,
  compact = false,
}: SessionCardProps) {
  const { t } = useTranslation();
  const { isBooked, getSpotsLeft } = useBooking();
  const booked = isBooked(session.id);
  const spotsLeft = getSpotsLeft(session.id);
  const config = typeConfig[session.type];
  const TypeIcon = config.icon;

  const dateObj = new Date(session.date + "T00:00:00");
  const dayName = dateObj.toLocaleDateString(lang, { weekday: "short" });
  const dayNum = dateObj.getDate();
  const month = dateObj.toLocaleDateString(lang, { month: "short" });

  return (
    <div
      className={`card card-hover-lift ${booked ? "ring-2" : ""}`}
      style={booked ? { borderColor: "var(--color-brand-blue-200)", boxShadow: "0 0 0 2px var(--color-brand-blue-50)" } : undefined}
    >
      <div className="flex gap-4">
        {/* Date column */}
        <div
          className="flex flex-col items-center justify-center rounded-xl px-3 py-2 flex-shrink-0"
          style={{
            background: booked ? "var(--color-brand-blue-50)" : "var(--color-gray-50)",
            minWidth: compact ? 48 : 56,
          }}
        >
          <span className="text-[10px] font-bold uppercase" style={{ color: "var(--color-slate-light)" }}>
            {dayName}
          </span>
          <span
            className="text-xl font-bold"
            style={{ color: booked ? "var(--color-brand-blue)" : "var(--color-brand-navy)" }}
          >
            {dayNum}
          </span>
          <span className="text-[10px]" style={{ color: "var(--color-slate-light)" }}>
            {month}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`badge ${config.badge}`}>
              <TypeIcon size={10} /> {config.label}
            </span>
            {session.price === 0 && session.type !== "trial" && (
              <span className="badge badge-green">FREE</span>
            )}
            {booked && (
              <span className="badge badge-blue">
                ✓ {t("schedule.booked") || "Booked"}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-semibold text-sm mb-1 truncate"
            style={{ color: "var(--color-brand-navy)" }}
          >
            {session.title[lang] || session.title.en}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: "var(--color-slate-light)" }}>
            {showInstructor && (
              <span className="flex items-center gap-1 font-medium">
                {session.instructorName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={11} /> {session.startTime} – {session.endTime}
            </span>
            <span className="flex items-center gap-1">
              <Video size={11} /> {session.durationMinutes}min
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {session.languageFocus}
            </span>
          </div>

          {/* Description */}
          {!compact && (
            <p className="text-xs mt-2 line-clamp-2" style={{ color: "var(--color-gray-500)" }}>
              {session.description[lang] || session.description.en}
            </p>
          )}
        </div>

        {/* Action column */}
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          {/* Price */}
          <div className="text-right">
            {session.price > 0 ? (
              <span className="text-base font-bold" style={{ color: "var(--color-brand-navy)" }}>
                ${session.price}
              </span>
            ) : (
              <span className="text-sm font-bold" style={{ color: "#059669" }}>
                {t("schedule.free") || "Free"}
              </span>
            )}
          </div>

          {/* Spots + Button */}
          <div className="flex flex-col items-end gap-1.5">
            {session.type !== "1on1" && !booked && (
              <span className="text-[10px]" style={{ color: spotsLeft <= 2 ? "var(--color-brand-coral)" : "var(--color-slate-light)" }}>
                {spotsLeft}/{session.maxParticipants} {t("schedule.spots") || "spots"}
              </span>
            )}
            {booked ? (
              <button
                onClick={() => onCancel?.(session)}
                className="btn btn-ghost btn-sm"
                style={{ color: "var(--color-brand-coral)" }}
              >
                {t("schedule.cancel") || "Cancel"}
              </button>
            ) : spotsLeft > 0 ? (
              <button
                onClick={() => onBook?.(session)}
                className="btn btn-primary btn-sm"
              >
                {t("schedule.book") || "Book"}
              </button>
            ) : (
              <span className="text-xs font-medium" style={{ color: "var(--color-brand-coral)" }}>
                {t("schedule.full") || "Full"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {!compact && session.tags.length > 0 && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {session.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: "var(--color-gray-100)", color: "var(--color-gray-500)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

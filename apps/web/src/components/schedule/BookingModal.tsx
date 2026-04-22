"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Star,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { Session } from "@/src/lib/types";
import { useBooking } from "@/src/lib/hooks/useBooking";
import { useInstructor } from "@/src/lib/queries";

/**
 * NOTE: Backend API Required
 * This modal will be fully functional once the backend implements:
 *   - POST /api/sessions/book - to create a booking
 *   - GET /api/sessions/:id/availability - to check spots
 *   - GET /api/sessions/user/bookings - to fetch user's bookings
 * Currently shows a disabled state with clear messaging.
 */

interface BookingModalProps {
  session: Session;
  onClose: () => void;
}

export default function BookingModal({ session, onClose }: BookingModalProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";
  const { bookSession, getSpotsLeft } = useBooking();
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: instructorData } = useInstructor(session.instructorId);
  const instructor = instructorData;
  const spotsLeft = getSpotsLeft(session.id);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await bookSession(session.id, notes || undefined);
      setConfirmed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book session");
    } finally {
      setIsSubmitting(false);
    }
  };

  const dateObj = new Date(session.date + "T00:00:00");
  const fullDate = dateObj.toLocaleDateString(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = session.instructorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md rounded-2xl p-6 space-y-5 animate-in"
        style={{
          background: "white",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={18} style={{ color: "var(--color-gray-400)" }} />
        </button>

        {confirmed ? (
          <div className="text-center py-6 space-y-4">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ background: "#ecfdf5" }}
            >
              <Check size={32} style={{ color: "#059669" }} />
            </div>
            <h2
              className="text-xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-navy)",
              }}
            >
              {t("schedule.bookingConfirmed") || "Session Booked!"}
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("schedule.confirmationMsg") ||
                "You'll receive a confirmation email with the session link."}
            </p>
            <div
              className="card text-left text-sm space-y-2"
              style={{ background: "var(--color-gray-50)" }}
            >
              <p
                className="font-medium"
                style={{ color: "var(--color-brand-navy)" }}
              >
                {session.title[lang] || session.title.en}
              </p>
              <p style={{ color: "var(--color-slate-light)" }}>
                {fullDate} · {session.startTime} – {session.endTime}
              </p>
              <p style={{ color: "var(--color-slate-light)" }}>
                {session.instructorName}
              </p>
            </div>
            <button onClick={onClose} className="btn btn-primary btn-lg w-full">
              {t("common.close") || "Done"}
            </button>
          </div>
        ) : (
          <>
            <h2
              className="text-lg font-bold pr-8"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-navy)",
              }}
            >
              {t("schedule.confirmBooking") || "Confirm Booking"}
            </h2>

            <div
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "var(--color-gray-50)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-purple))",
                }}
              >
                {initials}
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "var(--color-brand-navy)" }}
                >
                  {session.instructorName}
                </p>
                {instructor && "rating" in instructor && (
                  <div className="flex items-center gap-1 text-xs">
                    <Star
                      size={12}
                      fill="var(--color-brand-gold)"
                      style={{ color: "var(--color-brand-gold)" }}
                    />
                    <span style={{ color: "var(--color-brand-navy)" }}>
                      {(instructor as { rating?: number }).rating}
                    </span>
                    <span style={{ color: "var(--color-slate-light)" }}>
                      ({(instructor as { review_count?: number }).review_count})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="p-3 rounded-lg flex items-start gap-2"
              style={{ background: "#fef3c7", border: "1px solid #f59e0b" }}
            >
              <AlertCircle
                size={18}
                style={{ color: "#d97706", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p className="font-medium text-sm" style={{ color: "#92400e" }}>
                  {t("schedule.backendRequired") ||
                    "Session booking requires backend implementation"}
                </p>
                <p className="text-xs mt-1" style={{ color: "#b45309" }}>
                  {t("schedule.backendRequiredDesc") ||
                    "This feature will be available once /api/sessions/ endpoints are implemented."}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3
                className="font-semibold text-sm"
                style={{ color: "var(--color-brand-navy)" }}
              >
                {session.title[lang] || session.title.en}
              </h3>
              <p
                className="text-xs"
                style={{ color: "var(--color-slate-light)", lineHeight: 1.6 }}
              >
                {session.description[lang] || session.description.en}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: "var(--color-gray-50)" }}
                >
                  <Calendar
                    size={14}
                    style={{ color: "var(--color-brand-blue)" }}
                  />
                  <span style={{ color: "var(--color-slate)" }}>
                    {fullDate}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: "var(--color-gray-50)" }}
                >
                  <Clock
                    size={14}
                    style={{ color: "var(--color-brand-blue)" }}
                  />
                  <span style={{ color: "var(--color-slate)" }}>
                    {session.startTime} – {session.endTime}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: "var(--color-gray-50)" }}
                >
                  <Video
                    size={14}
                    style={{ color: "var(--color-brand-blue)" }}
                  />
                  <span style={{ color: "var(--color-slate)" }}>
                    {session.durationMinutes} min
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: "var(--color-gray-50)" }}
                >
                  <span className="text-base">🌍</span>
                  <span style={{ color: "var(--color-slate)" }}>
                    {session.languageFocus} · {session.level}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label
                className="flex items-center gap-1.5 text-sm font-medium mb-1.5"
                style={{ color: "var(--color-brand-navy)" }}
              >
                <MessageSquare size={14} />
                {t("schedule.notesLabel") || "Notes for instructor"} (
                {t("common.optional") || "optional"})
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  t("schedule.notesPlaceholder") ||
                  "What would you like to focus on?"
                }
                className="w-full h-20 p-3 rounded-lg border text-sm outline-none resize-none"
                style={{
                  borderColor: "var(--color-gray-200)",
                  background: "var(--color-gray-50)",
                }}
              />
            </div>

            {error && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{ background: "#fef2f2", color: "#dc2626" }}
              >
                {error}
              </div>
            )}

            <div
              className="flex items-center justify-between pt-2 border-t"
              style={{ borderColor: "var(--color-gray-200)" }}
            >
              <div>
                {session.price > 0 ? (
                  <>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--color-brand-navy)" }}
                    >
                      ${session.price}
                    </span>
                    <span
                      className="text-xs ml-1"
                      style={{ color: "var(--color-slate-light)" }}
                    >
                      / session
                    </span>
                  </>
                ) : (
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#059669" }}
                  >
                    {t("schedule.freeSession") || "Free Session"}
                  </span>
                )}
              </div>
              <button
                onClick={handleConfirm}
                disabled
                className="btn btn-primary btn-lg flex items-center gap-2 opacity-50 cursor-not-allowed"
                title={
                  t("schedule.backendRequired") ||
                  "Session booking requires backend implementation"
                }
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {t("schedule.confirmBook") || "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

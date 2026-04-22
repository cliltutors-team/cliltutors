"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import type { Session } from "@/src/lib/types";
import { useBooking } from "@/src/lib/hooks/useBooking";

interface CancelModalProps {
  session: Session;
  onClose: () => void;
}

const cancelReasons = [
  {
    key: "schedule_conflict",
    en: "Schedule conflict",
    es: "Conflicto de horario",
    pt: "Conflito de horário",
  },
  {
    key: "found_alternative",
    en: "Found an alternative",
    es: "Encontré una alternativa",
    pt: "Encontrei alternativa",
  },
  {
    key: "not_needed",
    en: "No longer needed",
    es: "Ya no es necesario",
    pt: "Não é mais necessário",
  },
  { key: "other", en: "Other reason", es: "Otra razón", pt: "Outra razão" },
];

export default function CancelModal({ session, onClose }: CancelModalProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";
  const { cancelSession } = useBooking();
  const [selectedReason, setSelectedReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await cancelSession(session.id, selectedReason);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel session");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-sm rounded-2xl p-6 space-y-5"
        style={{
          background: "white",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={18} style={{ color: "var(--color-gray-400)" }} />
        </button>

        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--color-brand-coral-50)" }}
          >
            <AlertTriangle
              size={20}
              style={{ color: "var(--color-brand-coral)" }}
            />
          </div>
          <div>
            <h2
              className="font-bold text-base"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("schedule.cancelTitle") || "Cancel Session?"}
            </h2>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("schedule.cancelWarning") ||
                "This action cannot be undone. Your spot will be released."}
            </p>
          </div>
        </div>

        <div
          className="p-3 rounded-xl text-sm"
          style={{ background: "var(--color-gray-50)" }}
        >
          <p
            className="font-medium"
            style={{ color: "var(--color-brand-navy)" }}
          >
            {session.title[lang] || session.title.en}
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--color-slate-light)" }}
          >
            {session.instructorName} · {session.date} · {session.startTime}
          </p>
        </div>

        <div>
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--color-brand-navy)" }}
          >
            {t("schedule.cancelReasonLabel") || "Why are you cancelling?"} (
            {t("common.optional") || "optional"})
          </p>
          <div className="space-y-1.5">
            {cancelReasons.map((reason) => (
              <label
                key={reason.key}
                className="flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                style={{
                  background:
                    selectedReason === reason.key
                      ? "var(--color-brand-blue-50)"
                      : "transparent",
                  border: `1px solid ${selectedReason === reason.key ? "var(--color-brand-blue-200)" : "var(--color-gray-200)"}`,
                }}
              >
                <input
                  type="radio"
                  name="cancel-reason"
                  value={reason.key}
                  checked={selectedReason === reason.key}
                  onChange={() => setSelectedReason(reason.key)}
                  className="accent-[var(--color-brand-blue)]"
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-slate)" }}
                >
                  {reason[lang] || reason.en}
                </span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div
            className="p-3 rounded-lg text-sm"
            style={{ background: "#fef2f2", color: "#dc2626" }}
          >
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="btn btn-secondary btn-md flex-1">
            {t("common.goBack") || "Go Back"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="btn btn-md flex-1 flex items-center justify-center gap-2"
            style={{
              background: "var(--color-brand-coral)",
              color: "white",
              border: "none",
            }}
          >
            {isSubmitting && <Loader2 size={14} className="animate-spin" />}
            {t("schedule.confirmCancel") || "Cancel Session"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Star,
  Globe,
  BookOpen,
  ArrowRight,
  Calendar,
  DollarSign,
  Loader2,
} from "lucide-react";
import { useInstructors, useSessions } from "@/src/lib/queries";
import { apiInstructorToFrontend } from "@/src/lib/types";
import type { Session } from "@/src/lib/api/types";

export default function InstructorsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";

  const {
    data: instructorsData,
    isLoading: instructorsLoading,
    error: instructorsError,
  } = useInstructors();
  const { data: sessionsData } = useSessions();

  const instructors =
    instructorsData?.results?.map(apiInstructorToFrontend) ?? [];
  const sessions = sessionsData?.results ?? [];

  const getSessionsByInstructor = (instructorId: string): Session[] => {
    return sessions.filter(
      (s: Session) => String(s.instructor.id) === instructorId,
    );
  };

  if (instructorsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--color-brand-blue)" }}
        />
      </div>
    );
  }

  if (instructorsError) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl mb-3">⚠️</p>
        <p className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
          Failed to load instructors
        </p>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--color-slate-light)" }}
        >
          Please try again later
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-navy)",
          }}
        >
          {t("instructors.title") || "Our Instructors"}
        </h1>
        <p style={{ color: "var(--color-slate-light)", fontSize: "0.9375rem" }}>
          {t("instructors.subtitle") ||
            "Meet our expert team of language and methodology specialists"}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructors.map((instructor) => {
          const initials = instructor.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          const sessionCount = getSessionsByInstructor(instructor.id).length;

          return (
            <div
              key={instructor.id}
              className="card card-hover-lift text-center"
            >
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-purple))",
                }}
              >
                {initials}
              </div>

              <h3
                className="font-bold text-base mb-1"
                style={{ color: "var(--color-brand-navy)" }}
              >
                {instructor.name}
              </h3>

              <div className="flex items-center justify-center gap-1 mb-2">
                <Star
                  size={14}
                  fill="var(--color-brand-gold)"
                  style={{ color: "var(--color-brand-gold)" }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-brand-navy)" }}
                >
                  {instructor.rating}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-slate-light)" }}
                >
                  ({instructor.reviewCount})
                </span>
              </div>

              <div
                className="flex items-center justify-center gap-3 mb-3 text-xs"
                style={{ color: "var(--color-slate-light)" }}
              >
                <span className="flex items-center gap-1">
                  <DollarSign size={12} /> ${instructor.hourlyRate}/hr
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {sessionCount} sessions
                </span>
              </div>

              <p
                className="text-xs mb-4 line-clamp-3"
                style={{ color: "var(--color-slate-light)", lineHeight: 1.6 }}
              >
                {instructor.bio[lang] || instructor.bio.en}
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                {instructor.languages.map((langName) => (
                  <span key={langName} className="badge badge-blue">
                    <Globe size={10} /> {langName}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {instructor.specialties.map((s) => (
                  <span key={s} className="badge badge-purple">
                    <BookOpen size={10} /> {s}
                  </span>
                ))}
              </div>

              <Link
                href={`/instructors/${instructor.id}`}
                className="btn btn-primary btn-md w-full"
              >
                {t("instructors.viewProfile") || "View Profile & Book"}{" "}
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

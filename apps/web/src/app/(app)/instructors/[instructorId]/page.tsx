"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Star,
  Globe,
  BookOpen,
  ArrowLeft,
  MapPin,
  Calendar,
  Video,
  Award,
  Loader2,
} from "lucide-react";
import { useInstructor, useSessions } from "@/src/lib/queries";
import {
  apiInstructorToFrontend,
  apiSessionToFrontend,
  type Session,
} from "@/src/lib/types";
import SessionCard from "@/src/components/schedule/SessionCard";
import BookingModal from "@/src/components/schedule/BookingModal";
import CancelModal from "@/src/components/schedule/CancelModal";

export default function InstructorDetailPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";
  const params = useParams();
  const instructorId = params.instructorId as string;

  const {
    data: instructorData,
    isLoading: instructorLoading,
    error: instructorError,
  } = useInstructor(instructorId);
  const { data: sessionsData } = useSessions();

  const instructor = instructorData
    ? apiInstructorToFrontend(instructorData)
    : null;
  const allSessions = sessionsData?.results.map(apiSessionToFrontend) ?? [];
  const sessions = allSessions.filter(
    (s: Session) => s.instructorId === instructorId,
  );

  const [bookingSession, setBookingSession] = useState<Session | null>(null);
  const [cancellingSession, setCancellingSession] = useState<Session | null>(
    null,
  );

  if (instructorLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--color-brand-blue)" }}
        />
      </div>
    );
  }

  if (instructorError || !instructor) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl mb-3">🔍</p>
        <p
          className="font-bold text-lg"
          style={{ color: "var(--color-brand-navy)" }}
        >
          Instructor not found
        </p>
        <Link href="/instructors" className="btn btn-primary btn-md mt-4">
          <ArrowLeft size={14} /> Back to Instructors
        </Link>
      </div>
    );
  }

  const initials = instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const countryNames: Record<string, string> = {
    AR: "🇦🇷 Argentina",
    MX: "🇲🇽 Mexico",
    BR: "🇧🇷 Brazil",
    GB: "🇬🇧 United Kingdom",
    ES: "🇪🇸 Spain",
  };

  return (
    <div className="space-y-6">
      <Link
        href="/instructors"
        className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        style={{ color: "var(--color-brand-blue)" }}
      >
        <ArrowLeft size={14} />{" "}
        {t("instructors.backToAll") || "All Instructors"}
      </Link>

      <div className="card">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-purple))",
            }}
          >
            {initials}
          </div>

          <div className="flex-1">
            <h1
              className="text-2xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-navy)",
              }}
            >
              {instructor.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
              <span className="flex items-center gap-1">
                <Star
                  size={14}
                  fill="var(--color-brand-gold)"
                  style={{ color: "var(--color-brand-gold)" }}
                />
                <b>{instructor.rating}</b>
                <span style={{ color: "var(--color-slate-light)" }}>
                  ({instructor.reviewCount} reviews)
                </span>
              </span>
              <span
                className="flex items-center gap-1"
                style={{ color: "var(--color-slate-light)" }}
              >
                <MapPin size={14} />{" "}
                {countryNames[instructor.country] || instructor.country}
              </span>
              <span
                className="flex items-center gap-1"
                style={{ color: "var(--color-slate-light)" }}
              >
                <Calendar size={14} /> {sessions.length} sessions available
              </span>
            </div>

            <p
              className="text-sm"
              style={{ color: "var(--color-slate)", lineHeight: 1.7 }}
            >
              {instructor.bio[lang] || instructor.bio.en}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {instructor.languages.map((l) => (
                <span key={l} className="badge badge-blue">
                  <Globe size={10} /> {l}
                </span>
              ))}
              {instructor.specialties.map((s) => (
                <span key={s} className="badge badge-purple">
                  <BookOpen size={10} /> {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col gap-3">
            <div
              className="card text-center px-6 py-3"
              style={{ background: "var(--color-gray-50)" }}
            >
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-brand-blue)" }}
              >
                ${instructor.hourlyRate || 30}
              </p>
              <p
                className="text-[10px] font-medium"
                style={{ color: "var(--color-slate-light)" }}
              >
                / hour
              </p>
            </div>
            <div
              className="card text-center px-6 py-3"
              style={{ background: "var(--color-gray-50)" }}
            >
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-brand-navy)" }}
              >
                {instructor.courseIds.length}
              </p>
              <p
                className="text-[10px] font-medium"
                style={{ color: "var(--color-slate-light)" }}
              >
                courses
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2
          className="font-bold text-lg mb-4 flex items-center gap-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-navy)",
          }}
        >
          <Video size={20} style={{ color: "var(--color-brand-blue)" }} />
          {t("instructors.availableSessions") || "Available Sessions"}
        </h2>

        {sessions.length > 0 ? (
          <div className="space-y-3">
            {sessions.map((session: Session) => (
              <SessionCard
                key={session.id}
                session={session}
                lang={lang}
                showInstructor={false}
                onBook={(s) => setBookingSession(s)}
                onCancel={(s) => setCancellingSession(s)}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-10">
            <p className="text-3xl mb-3">📅</p>
            <p
              className="font-medium"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("instructors.noSessions") || "No upcoming sessions"}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              Check back later for new availability
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <h2
          className="font-bold text-base mb-4 flex items-center gap-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-navy)",
          }}
        >
          <Award size={18} style={{ color: "var(--color-brand-purple)" }} />
          {t("instructors.qualifications") || "Qualifications & Experience"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <QualCard
            emoji="🎓"
            title="Education"
            desc={
              instructor.specialties.includes("CLIL")
                ? "MA Applied Linguistics"
                : "PhD Education"
            }
          />
          <QualCard emoji="⏳" title="Experience" desc="10+ years teaching" />
          <QualCard
            emoji="🌍"
            title="Languages spoken"
            desc={instructor.languages.join(", ")}
          />
          <QualCard
            emoji="📜"
            title="Certifications"
            desc="CELTA, DELTA, CLIL certified"
          />
        </div>
      </div>

      {bookingSession && (
        <BookingModal
          session={bookingSession}
          onClose={() => setBookingSession(null)}
        />
      )}
      {cancellingSession && (
        <CancelModal
          session={cancellingSession}
          onClose={() => setCancellingSession(null)}
        />
      )}
    </div>
  );
}

function QualCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{ background: "var(--color-gray-50)" }}
    >
      <span className="text-xl">{emoji}</span>
      <div>
        <p
          className="text-xs font-bold mb-0.5"
          style={{ color: "var(--color-brand-navy)" }}
        >
          {title}
        </p>
        <p className="text-xs" style={{ color: "var(--color-slate-light)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

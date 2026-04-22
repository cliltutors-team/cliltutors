"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Calendar as CalendarIcon,
  Clock,
  List,
  User,
  Users,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useBooking, type SessionFilters } from "@/src/lib/hooks/useBooking";
import { useInstructors, useCalendarMonth } from "@/src/lib/queries";
import { apiInstructorToFrontend } from "@/src/lib/types";
import type { Session, SessionType } from "@/src/lib/types";
import SessionCard from "@/src/components/schedule/SessionCard";
import BookingModal from "@/src/components/schedule/BookingModal";
import CancelModal from "@/src/components/schedule/CancelModal";

type Tab = "browse" | "my-sessions" | "calendar";

const typeOptions = [
  { value: "all", label: "All Types", icon: List },
  { value: "1on1", label: "1-on-1", icon: User },
  { value: "group", label: "Group", icon: Users },
  { value: "trial", label: "Free Trial", icon: Sparkles },
];

const languageOptions = ["all", "English", "Spanish", "Portuguese"];

export default function SchedulePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";
  const booking = useBooking();

  const { data: instructorsData } = useInstructors();
  const instructors =
    instructorsData?.results?.map(apiInstructorToFrontend) ?? [];

  const [tab, setTab] = useState<Tab>("browse");
  const [bookingSession, setBookingSession] = useState<Session | null>(null);
  const [cancellingSession, setCancellingSession] = useState<Session | null>(
    null,
  );

  const [typeFilter, setTypeFilter] = useState<SessionType | "all">("all");
  const [langFilter, setLangFilter] = useState("all");
  const [instructorFilter, setInstructorFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const { data: calendarData } = useCalendarMonth(currentYear, currentMonth);
  const datesWithSessions = calendarData?.dates ?? [];

  const weekDates = useMemo(() => generateWeekDates(new Date()), []);

  const filters: SessionFilters = {
    type: typeFilter,
    language: langFilter === "all" ? undefined : langFilter,
    instructorId: instructorFilter === "all" ? undefined : instructorFilter,
    date: selectedDate || undefined,
    onlyAvailable: true,
  };
  const filteredSessions = booking.filterSessions(filters);

  const myUpcoming = booking.upcomingBookings
    .map((b) => booking.sessions.find((s) => s.id === b.sessionId))
    .filter(Boolean) as Session[];
  const myPast = booking.pastBookings
    .map((b) => booking.sessions.find((s) => s.id === b.sessionId))
    .filter(Boolean) as Session[];

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "browse", label: t("schedule.browse") || "Browse Sessions" },
    {
      key: "my-sessions",
      label: t("schedule.mySessions") || "My Sessions",
      count: myUpcoming.length,
    },
    { key: "calendar", label: t("schedule.calendar") || "Calendar" },
  ];

  if (booking.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--color-brand-blue)" }}
        />
      </div>
    );
  }

  if (booking.error) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl mb-3">⚠️</p>
        <p className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
          {t("schedule.loadError") || "Failed to load sessions"}
        </p>
        <button
          onClick={() => booking.refetch()}
          className="btn btn-primary btn-md mt-4"
        >
          Try Again
        </button>
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
          {t("schedule.title") || "Schedule"}
        </h1>
        <p style={{ color: "var(--color-slate-light)", fontSize: "0.9375rem" }}>
          {t("schedule.subtitle") || "Book live sessions with our instructors"}
        </p>
      </div>

      <div
        className="flex gap-1 p-1 rounded-xl"
        style={{ background: "var(--color-gray-100)" }}
      >
        {tabs.map((tabItem) => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5"
            style={{
              background: tab === tabItem.key ? "white" : "transparent",
              color:
                tab === tabItem.key
                  ? "var(--color-brand-navy)"
                  : "var(--color-slate-light)",
              boxShadow: tab === tabItem.key ? "var(--shadow-sm)" : "none",
            }}
          >
            {tabItem.label}
            {tabItem.count !== undefined && tabItem.count > 0 && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background:
                    tab === tabItem.key
                      ? "var(--color-brand-blue)"
                      : "var(--color-brand-blue-50)",
                  color:
                    tab === tabItem.key ? "white" : "var(--color-brand-blue)",
                }}
              >
                {tabItem.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <div className="space-y-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedDate(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all flex-shrink-0"
              style={{
                background: !selectedDate
                  ? "var(--color-brand-blue)"
                  : "var(--color-gray-50)",
                color: !selectedDate ? "white" : "var(--color-slate-light)",
                border: `1px solid ${!selectedDate ? "var(--color-brand-blue)" : "var(--color-gray-200)"}`,
              }}
            >
              {t("schedule.allDays") || "All"}
            </button>
            {weekDates.map((d) => {
              const isActive = selectedDate === d.iso;
              const hasSession = datesWithSessions.includes(d.iso);
              return (
                <button
                  key={d.iso}
                  onClick={() => setSelectedDate(isActive ? null : d.iso)}
                  className="px-3 py-2 rounded-xl text-center transition-all flex-shrink-0 relative"
                  style={{
                    background: isActive
                      ? "var(--color-brand-blue)"
                      : "var(--color-gray-50)",
                    color: isActive ? "white" : "var(--color-brand-navy)",
                    border: `1px solid ${isActive ? "var(--color-brand-blue)" : "var(--color-gray-200)"}`,
                    opacity: hasSession ? 1 : 0.4,
                  }}
                >
                  <span className="text-[10px] block font-medium">
                    {d.dayName}
                  </span>
                  <span className="text-base font-bold block">{d.dayNum}</span>
                  {hasSession && !isActive && (
                    <div
                      className="w-1 h-1 rounded-full mx-auto mt-0.5"
                      style={{ background: "var(--color-brand-blue)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as SessionType | "all")
              }
              className="h-9 px-3 rounded-lg border text-xs outline-none cursor-pointer"
              style={{
                borderColor: "var(--color-gray-200)",
                background: "var(--color-gray-50)",
                color: "var(--color-slate)",
              }}
            >
              {typeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border text-xs outline-none cursor-pointer"
              style={{
                borderColor: "var(--color-gray-200)",
                background: "var(--color-gray-50)",
                color: "var(--color-slate)",
              }}
            >
              {languageOptions.map((l) => (
                <option key={l} value={l}>
                  {l === "all" ? "All Languages" : l}
                </option>
              ))}
            </select>

            <select
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border text-xs outline-none cursor-pointer"
              style={{
                borderColor: "var(--color-gray-200)",
                background: "var(--color-gray-50)",
                color: "var(--color-slate)",
              }}
            >
              <option value="all">All Instructors</option>
              {instructors.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  lang={lang}
                  onBook={(s) => setBookingSession(s)}
                  onCancel={(s) => setCancellingSession(s)}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">📅</p>
                <p
                  className="font-medium"
                  style={{ color: "var(--color-brand-navy)" }}
                >
                  {t("schedule.noSessions") || "No sessions found"}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--color-slate-light)" }}
                >
                  {t("schedule.tryFilters") ||
                    "Try changing your filters or browse a different week"}
                </p>
              </div>
            )}
          </div>

          <div
            className="card text-center py-8"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-blue-50), var(--color-brand-purple-50))",
              border: "1px solid var(--color-brand-blue-200)",
            }}
          >
            <p className="text-3xl mb-3">🎯</p>
            <h3
              className="font-bold text-lg mb-2"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("schedule.tryFree") || "Try a Free Session"}
            </h3>
            <p
              className="text-sm mb-4 max-w-md mx-auto"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("schedule.tryFreeDesc") ||
                "Experience our methodology with a complimentary 25-minute trial session"}
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setTypeFilter("trial")}
            >
              {t("schedule.showTrials") || "Show Free Trials"}{" "}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {tab === "my-sessions" && (
        <div className="space-y-6">
          <div>
            <h2
              className="font-bold text-base mb-3 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-navy)",
              }}
            >
              <CalendarIcon
                size={18}
                style={{ color: "var(--color-brand-blue)" }}
              />
              {t("schedule.upcomingSessions") || "Upcoming Sessions"}
              <span className="badge badge-blue">{myUpcoming.length}</span>
            </h2>
            {myUpcoming.length > 0 ? (
              <div className="space-y-3">
                {myUpcoming.map((s) => (
                  <SessionCard
                    key={s.id}
                    session={s}
                    lang={lang}
                    onCancel={(s) => setCancellingSession(s)}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-10">
                <p className="text-3xl mb-3">📭</p>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--color-brand-navy)" }}
                >
                  {t("schedule.noUpcoming") || "No upcoming sessions"}
                </p>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--color-slate-light)" }}
                >
                  {t("schedule.browseToBook") ||
                    "Browse available sessions to get started"}
                </p>
                <button
                  onClick={() => setTab("browse")}
                  className="btn btn-primary btn-md"
                >
                  {t("schedule.browseSessions") || "Browse Sessions"}{" "}
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>

          {myPast.length > 0 && (
            <div>
              <h2
                className="font-bold text-base mb-3 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-brand-navy)",
                }}
              >
                <Clock
                  size={18}
                  style={{ color: "var(--color-slate-light)" }}
                />
                {t("schedule.pastSessions") || "Past & Cancelled"}
              </h2>
              <div className="space-y-3 opacity-60">
                {myPast.map((s) => (
                  <SessionCard key={s.id} session={s} lang={lang} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "calendar" && (
        <CalendarView
          lang={lang}
          sessions={booking.sessions}
          onSelectSession={(s) => setBookingSession(s)}
          onCancelSession={(s) => setCancellingSession(s)}
        />
      )}

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

function CalendarView({
  lang,
  sessions,
  onSelectSession,
  onCancelSession,
}: {
  lang: string;
  sessions: Session[];
  onSelectSession: (s: Session) => void;
  onCancelSession: (s: Session) => void;
}) {
  const { t } = useTranslation();
  const { isBooked } = useBooking();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const monthLabel = today.toLocaleDateString(lang, {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOffset =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
  const dayHeaders = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const sessionDates = new Set(sessions.map((s) => s.date));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const daySessions = selectedDay
    ? sessions.filter((s) => s.date === selectedDay)
    : [];

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 card">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="font-bold text-base"
            style={{ color: "var(--color-brand-navy)" }}
          >
            {monthLabel}
          </h2>
          <div className="flex gap-1.5 items-center text-[10px]">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-brand-blue)" }}
            />
            <span style={{ color: "var(--color-slate-light)" }}>Group</span>
            <span
              className="w-2 h-2 rounded-full ml-2"
              style={{ background: "var(--color-brand-purple)" }}
            />
            <span style={{ color: "var(--color-slate-light)" }}>1-on-1</span>
            <span
              className="w-2 h-2 rounded-full ml-2"
              style={{ background: "#059669" }}
            />
            <span style={{ color: "var(--color-slate-light)" }}>Trial</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {dayHeaders.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-bold py-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={i} />;
            const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const hasSessions = sessionDates.has(iso);
            const isSelected = selectedDay === iso;
            const isToday = iso === today.toISOString().slice(0, 10);
            const daySess = sessions.filter((s) => s.date === iso);
            const hasBooked = daySess.some((s) => isBooked(s.id));

            return (
              <button
                key={i}
                onClick={() =>
                  hasSessions && setSelectedDay(isSelected ? null : iso)
                }
                className={`relative p-2 rounded-lg text-center transition-all text-sm ${hasSessions ? "cursor-pointer hover:bg-gray-50" : "cursor-default"}`}
                style={{
                  background: isSelected
                    ? "var(--color-brand-blue)"
                    : isToday
                      ? "var(--color-brand-blue-50)"
                      : "transparent",
                  color: isSelected
                    ? "white"
                    : hasSessions
                      ? "var(--color-brand-navy)"
                      : "var(--color-gray-300)",
                  fontWeight: hasSessions || isToday ? 700 : 400,
                  border:
                    isToday && !isSelected
                      ? "1px solid var(--color-brand-blue-200)"
                      : "1px solid transparent",
                }}
              >
                {day}
                {hasSessions && (
                  <div className="flex gap-0.5 justify-center mt-0.5">
                    {daySess.some((s) => s.type === "group") && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: isSelected
                            ? "white"
                            : "var(--color-brand-blue)",
                        }}
                      />
                    )}
                    {daySess.some((s) => s.type === "1on1") && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: isSelected
                            ? "white"
                            : "var(--color-brand-purple)",
                        }}
                      />
                    )}
                    {daySess.some((s) => s.type === "trial") && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: isSelected ? "white" : "#059669" }}
                      />
                    )}
                  </div>
                )}
                {hasBooked && (
                  <div
                    className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-brand-coral)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedDay ? (
          <div className="space-y-3">
            <h3
              className="font-bold text-sm"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {new Date(selectedDay + "T00:00:00").toLocaleDateString(lang, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
            {daySessions.map((s) => (
              <SessionCard
                key={s.id}
                session={s}
                lang={lang}
                compact
                onBook={onSelectSession}
                onCancel={onCancelSession}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <CalendarIcon
              size={32}
              className="mx-auto mb-3"
              style={{ color: "var(--color-gray-300)" }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("schedule.selectDay") || "Select a day"}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("schedule.selectDayDesc") ||
                "Click on a date with sessions to see details"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function generateWeekDates(startDate: Date) {
  const result: { iso: string; dayName: string; dayNum: number }[] = [];
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    result.push({
      iso: d.toISOString().slice(0, 10),
      dayName: d.toLocaleDateString("en", { weekday: "short" }),
      dayNum: d.getDate(),
    });
  }
  return result;
}

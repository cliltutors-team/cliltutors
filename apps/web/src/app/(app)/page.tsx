"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Play,
  Clock,
  Flame,
  BookCheck,
  ArrowRight,
  TrendingUp,
  Calendar,
  Loader2,
} from "lucide-react";
import {
  useProfile,
  useDashboard,
  useCourseProgress,
  useBookings,
  useRecentActivity,
} from "@/src/lib/queries";
import { useSessions } from "@/src/lib/queries";

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";

  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard();
  const { data: courseProgress, isLoading: progressLoading } =
    useCourseProgress();
  const { data: bookingsData } = useBookings();
  const { data: recentActivity } = useRecentActivity(5);
  const { data: sessionsData } = useSessions({ page_size: 5 });

  const isLoading = profileLoading || dashboardLoading;

  const enrolledCourses = courseProgress ?? dashboard?.enrolled_courses ?? [];
  const stats = dashboard?.stats;
  const upcomingBookings =
    bookingsData?.bookings
      .filter((b) => b.status === "confirmed" || b.status === "pending")
      .slice(0, 3) ?? [];

  const recentSessions =
    sessionsData?.results
      .filter((s) => s.is_booked_by_current_user)
      .slice(0, 3) ?? [];

  const lastCourse = enrolledCourses.sort(
    (a, b) =>
      new Date(b.last_accessed_at).getTime() -
      new Date(a.last_accessed_at).getTime(),
  )[0];

  const displayName = profile?.first_name
    ? `${profile.first_name}${profile.last_name ? ` ${profile.last_name}` : ""}`
    : (profile?.username ?? "Student");

  const statsDisplay = [
    {
      icon: <Clock size={22} />,
      value: stats ? `${stats.total_hours}h` : "—",
      label: t("dashboard.totalHours") || "Hours Studied",
      color: "var(--color-brand-blue-50)",
      iconColor: "var(--color-brand-blue)",
    },
    {
      icon: <Flame size={22} />,
      value: stats?.streak?.toString() ?? "0",
      label: t("dashboard.streak") || "Day Streak",
      color: "var(--color-brand-coral-50)",
      iconColor: "var(--color-brand-coral)",
    },
    {
      icon: <BookCheck size={22} />,
      value: stats?.lessons_completed?.toString() ?? "0",
      label: t("dashboard.lessonsCompleted") || "Lessons Completed",
      color: "#ecfdf5",
      iconColor: "#059669",
    },
    {
      icon: <TrendingUp size={22} />,
      value: stats?.current_level ?? profile?.level ?? "—",
      label: t("dashboard.currentLevel") || "Current Level",
      color: "var(--color-brand-purple-50)",
      iconColor: "var(--color-brand-purple)",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "var(--color-brand-blue)" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div
        className="rounded-2xl p-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-navy-900), var(--color-brand-blue-dark))",
        }}
      >
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">
            {t("dashboard.welcomeBack") || "Welcome back"} 👋
          </p>
          <h1
            className="text-white text-2xl lg:text-3xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {displayName}
          </h1>
          {lastCourse && (
            <p className="text-white/60 text-sm mb-6">
              {t("dashboard.continueMsg") || "Continue where you left off"}
            </p>
          )}
          {lastCourse?.last_lesson_id && (
            <Link
              href={`/courses/${lastCourse.course_id}/lessons/${lastCourse.last_lesson_id}`}
              className="btn btn-md inline-flex items-center gap-2"
              style={{ background: "white", color: "var(--color-brand-navy)" }}
            >
              <Play size={16} fill="currentColor" />
              {t("dashboard.continueCourse") || "Continue Learning"}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
        <div
          className="absolute -top-10 -right-10 w-60 h-60 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-brand-blue)" }}
        />
        <div
          className="absolute -bottom-10 right-20 w-40 h-40 rounded-full opacity-15 blur-2xl"
          style={{ background: "var(--color-brand-purple)" }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsDisplay.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div
                className="stat-card-icon"
                style={{ background: stat.color, color: stat.iconColor }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      {(upcomingBookings.length > 0 || recentSessions.length > 0) && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-navy)",
              }}
            >
              {t("dashboard.upcomingSessions") || "Upcoming Sessions"}
            </h2>
            <Link href="/schedule" className="btn btn-ghost btn-sm">
              {t("common.viewAll") || "View All"} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...upcomingBookings, ...recentSessions]
              .slice(0, 3)
              .map((session) => {
                const s = session as {
                  id: string;
                  title?: string;
                  date?: string;
                  bookedAt?: string;
                };
                return (
                  <div key={s.id} className="card">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--color-brand-coral-50)" }}
                      >
                        <Calendar
                          size={18}
                          style={{ color: "var(--color-brand-coral)" }}
                        />
                      </div>
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: "var(--color-brand-navy)" }}
                        >
                          {s.title ?? `Session`}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-slate-light)" }}
                        >
                          {s.date ?? s.bookedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-navy)",
            }}
          >
            {t("dashboard.continueLearning") || "Continue Learning"}
          </h2>
          <Link href="/my-learning" className="btn btn-ghost btn-sm">
            {t("common.viewAll") || "View All"} <ArrowRight size={14} />
          </Link>
        </div>

        {progressLoading ? (
          <div className="flex justify-center py-8">
            <Loader2
              className="w-6 h-6 animate-spin"
              style={{ color: "var(--color-brand-blue)" }}
            />
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((course) => (
              <Link
                key={course.course_id}
                href={`/courses/${course.course_id}`}
                className="card card-hover-lift"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "var(--color-brand-blue-50)" }}
                  >
                    📚
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-semibold text-sm truncate"
                      style={{ color: "var(--color-brand-navy)" }}
                    >
                      {course.course_title}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-slate-light)" }}
                    >
                      {course.instructor_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--color-brand-blue)" }}
                  >
                    {course.percent_complete}%{" "}
                    {t("common.complete") || "complete"}
                  </span>
                  {course.level && (
                    <span className="badge badge-blue">{course.level}</span>
                  )}
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${course.percent_complete}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 card">
            <p className="text-3xl mb-3">📚</p>
            <p
              className="font-medium"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("dashboard.noCourses") || "No courses enrolled yet"}
            </p>
            <Link href="/courses" className="btn btn-primary btn-md mt-4">
              {t("dashboard.browseCourses") || "Browse Courses"}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {recentActivity && recentActivity.length > 0 && (
        <div>
          <h2
            className="text-lg font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-navy)",
            }}
          >
            {t("dashboard.recentActivity") || "Recent Activity"}
          </h2>
          <div className="space-y-2">
            {recentActivity.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="card py-3 px-4 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{
                    background:
                      activity.type === "lesson_completed"
                        ? "var(--color-brand-green-50)"
                        : activity.type === "session_booked"
                          ? "var(--color-brand-coral-50)"
                          : "var(--color-brand-blue-50)",
                    color:
                      activity.type === "lesson_completed"
                        ? "var(--color-brand-green)"
                        : activity.type === "session_booked"
                          ? "var(--color-brand-coral)"
                          : "var(--color-brand-blue)",
                  }}
                >
                  {activity.type === "lesson_completed"
                    ? "✓"
                    : activity.type === "session_booked"
                      ? "📅"
                      : "📖"}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--color-brand-navy)" }}
                  >
                    {activity.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-slate-light)" }}
                  >
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2
          className="text-lg font-bold mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-navy)",
          }}
        >
          {t("dashboard.explore") || "Explore"}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/courses"
            className="card text-center py-8 card-hover-lift"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("dashboard.browseCourses") || "Browse Courses"}
            </h3>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("common.available") || "Available"}
            </p>
          </Link>
          <Link
            href="/schedule"
            className="card text-center py-8 card-hover-lift"
          >
            <div className="text-3xl mb-3">📅</div>
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("dashboard.bookSession") || "Book a Session"}
            </h3>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("dashboard.liveInstructors") || "Live with instructors"}
            </p>
          </Link>
          <Link
            href="/instructors"
            className="card text-center py-8 card-hover-lift"
          >
            <div className="text-3xl mb-3">👩‍🏫</div>
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--color-brand-navy)" }}
            >
              {t("dashboard.meetInstructors") || "Meet Instructors"}
            </h3>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-slate-light)" }}
            >
              {t("dashboard.expertTeam") || "Our expert team"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

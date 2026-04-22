"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Play, Clock, ArrowRight, BookOpen } from "lucide-react";
import { currentUser, userProgress } from "@/src/lib/mock/user";
import { courses } from "@/src/lib/mock/courses";
import { useState } from "react";

type Tab = "in-progress" | "completed" | "bookmarked";

export default function MyLearningPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";
  const [activeTab, setActiveTab] = useState<Tab>("in-progress");

  const enrolled = currentUser.enrolledCourseIds
    .map((id) => {
      const course = courses.find((c) => c.id === id);
      const progress = userProgress.find((p) => p.courseId === id);
      return course && progress ? { course, progress } : null;
    })
    .filter(Boolean) as { course: (typeof courses)[0]; progress: (typeof userProgress)[0] }[];

  const inProgress = enrolled.filter((e) => e.progress.percentComplete < 100);
  const completed = enrolled.filter((e) => e.progress.percentComplete === 100);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "in-progress", label: t("myLearning.inProgress") || "In Progress", count: inProgress.length },
    { key: "completed", label: t("myLearning.completed") || "Completed", count: completed.length },
    { key: "bookmarked", label: t("myLearning.bookmarked") || "Bookmarked", count: 0 },
  ];

  const current = activeTab === "in-progress" ? inProgress : activeTab === "completed" ? completed : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-navy)" }}>
          {t("myLearning.title") || "My Learning"}
        </h1>
        <p style={{ color: "var(--color-slate-light)", fontSize: "0.9375rem" }}>
          {t("myLearning.subtitle") || "Track your progress and continue where you left off"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--color-gray-100)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.key ? "white" : "transparent",
              color: activeTab === tab.key ? "var(--color-brand-navy)" : "var(--color-slate-light)",
              boxShadow: activeTab === tab.key ? "var(--shadow-sm)" : "none",
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Course List */}
      {current.length > 0 ? (
        <div className="space-y-4">
          {current.map(({ course, progress }) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="card card-hover-lift flex flex-col sm:flex-row gap-4">
              <div
                className="w-full sm:w-48 h-28 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--color-brand-navy-900), var(--color-brand-blue-dark))" }}
              >
                <BookOpen size={28} className="text-white/50" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold" style={{ color: "var(--color-brand-navy)" }}>
                      {course.title[lang] || course.title.en}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                      {course.instructor.name} · {course.level}
                    </p>
                  </div>
                  <span className="badge badge-blue">{course.language}</span>
                </div>

                <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "var(--color-gray-500)" }}>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {course.estimatedHours}h
                  </span>
                  <span>
                    {progress.completedLessonIds.length}/{course.totalLessons} lessons
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${progress.percentComplete}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold flex-shrink-0" style={{ color: "var(--color-brand-blue)" }}>
                    {progress.percentComplete}%
                  </span>
                  <span className="btn btn-primary btn-sm flex-shrink-0">
                    <Play size={14} fill="white" /> {t("common.resume") || "Resume"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📚</p>
          <p className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
            {activeTab === "bookmarked"
              ? t("myLearning.noBookmarks") || "No bookmarked courses yet"
              : t("myLearning.noCompleted") || "No completed courses yet"}
          </p>
          <Link href="/courses" className="btn btn-primary btn-md mt-4">
            {t("myLearning.exploreCourses") || "Explore Courses"} <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}

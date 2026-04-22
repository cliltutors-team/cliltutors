"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  FileText,
  Download,
  List,
} from "lucide-react";
import { courses } from "@/src/lib/mock/courses";
import { userProgress } from "@/src/lib/mock/user";
import { useState } from "react";

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const course = courses.find((c) => c.id === courseId);
  const progress = userProgress.find((p) => p.courseId === courseId);

  if (!course) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl mb-4">📭</p>
        <h2 className="text-xl font-bold" style={{ color: "var(--color-brand-navy)" }}>
          Course not found
        </h2>
      </div>
    );
  }

  // Find lesson in modules
  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  );

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const lesson = allLessons[currentIndex];
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (!lesson) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl mb-4">📭</p>
        <h2 className="text-xl font-bold" style={{ color: "var(--color-brand-navy)" }}>
          Lesson not found
        </h2>
        <Link href={`/courses/${courseId}`} className="btn btn-primary btn-md mt-4">
          <ArrowLeft size={16} /> Back to Course
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-6 -mx-2 -mt-2 min-h-[calc(100vh-80px)]">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Video Player Area */}
        <div
          className="w-full aspect-video rounded-xl flex items-center justify-center relative overflow-hidden mb-6"
          style={{
            background: "linear-gradient(135deg, var(--color-brand-navy-900), var(--color-brand-blue-dark))",
          }}
        >
          <div className="text-center z-10">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer transition-transform hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
            <p className="text-white/80 text-sm">
              {t("lessons.clickToPlay") || "Click to play"}
            </p>
            <p className="text-white/50 text-xs mt-1">{lesson.duration} min</p>
          </div>
          {/* Decorative */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--color-brand-blue)" }}
          />
        </div>

        {/* Lesson Info */}
        <div className="space-y-4 px-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--color-brand-blue)" }}>
                {lesson.moduleTitle[lang] || lesson.moduleTitle.en}
              </p>
              <h1
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-brand-navy)",
                }}
              >
                {lesson.title[lang] || lesson.title.en}
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-ghost btn-sm lg:hidden"
              aria-label="Toggle lesson list"
            >
              <List size={18} />
            </button>
          </div>

          {/* Resources */}
          <div className="card">
            <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--color-brand-navy)" }}>
              {t("lessons.resources") || "Resources"}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText size={16} style={{ color: "var(--color-brand-blue)" }} />
                <span className="text-sm flex-1" style={{ color: "var(--color-slate)" }}>
                  Lesson Notes - {lesson.title.en}.pdf
                </span>
                <Download size={14} style={{ color: "var(--color-gray-400)" }} className="cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--color-gray-200)" }}>
            {prevLesson ? (
              <Link
                href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                className="btn btn-secondary btn-sm"
              >
                <ChevronLeft size={16} /> {t("lessons.prev") || "Previous"}
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                className="btn btn-primary btn-sm"
              >
                {t("lessons.next") || "Next Lesson"} <ChevronRight size={16} />
              </Link>
            ) : (
              <Link href={`/courses/${courseId}`} className="btn btn-primary btn-sm">
                {t("lessons.backToCourse") || "Complete Course"} <CheckCircle2 size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Sidebar */}
      {sidebarOpen && (
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="card sticky top-20" style={{ padding: "1rem", maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--color-brand-navy)" }}>
              {t("lessons.courseContent") || "Course Content"}
            </h3>

            {course.modules.map((module) => (
              <div key={module.id} className="mb-4">
                <p
                  className="text-xs font-bold uppercase mb-2"
                  style={{
                    color: "var(--color-slate-light)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {module.title[lang] || module.title.en}
                </p>
                <div className="space-y-0.5">
                  {module.lessons.map((l) => {
                    const isCurrent = l.id === lessonId;
                    const completed = progress?.completedLessonIds.includes(l.id);
                    return (
                      <Link
                        key={l.id}
                        href={`/courses/${courseId}/lessons/${l.id}`}
                        className={`
                          flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors
                          ${isCurrent ? "font-semibold" : ""}
                        `}
                        style={{
                          background: isCurrent ? "var(--color-brand-blue-50)" : "transparent",
                          color: isCurrent
                            ? "var(--color-brand-blue)"
                            : completed
                            ? "var(--color-slate-light)"
                            : "var(--color-slate)",
                        }}
                      >
                        <span className="flex-shrink-0">
                          {completed ? (
                            <CheckCircle2 size={14} style={{ color: "#059669" }} />
                          ) : isCurrent ? (
                            <Play size={14} fill="currentColor" />
                          ) : (
                            <Circle size={14} />
                          )}
                        </span>
                        <span className="truncate">{l.title[lang] || l.title.en}</span>
                        <span className="ml-auto text-[10px] flex-shrink-0" style={{ color: "var(--color-gray-400)" }}>
                          {l.duration}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

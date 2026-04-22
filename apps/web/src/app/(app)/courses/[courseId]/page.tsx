"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { courses } from "@/src/lib/mock/courses";
import { userProgress } from "@/src/lib/mock/user";
import { useState } from "react";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";

  const course = courses.find((c) => c.id === courseId);
  const progress = userProgress.find((p) => p.courseId === courseId);
  const isEnrolled = !!progress;

  const [openModules, setOpenModules] = useState<string[]>(
    course?.modules.map((m) => m.id) || []
  );

  if (!course) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl mb-4">📭</p>
        <h2 className="text-xl font-bold" style={{ color: "var(--color-brand-navy)" }}>
          Course not found
        </h2>
        <Link href="/courses" className="btn btn-primary btn-md mt-4">
          <ArrowLeft size={16} /> Back to Courses
        </Link>
      </div>
    );
  }

  const toggleModule = (id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const lessonIcon = (type: string) => {
    switch (type) {
      case "video": return <Play size={14} />;
      case "quiz": return <HelpCircle size={14} />;
      case "reading": return <FileText size={14} />;
      case "exercise": return <BookOpen size={14} />;
      default: return <Play size={14} />;
    }
  };

  // Total lessons across modules

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-1 text-sm font-medium"
        style={{ color: "var(--color-brand-blue)" }}
      >
        <ArrowLeft size={16} />
        {t("courses.backToCatalog") || "Back to Courses"}
      </Link>

      {/* Course Header */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <span className="badge badge-blue">{course.level}</span>
            <span className="badge badge-purple">{course.language}</span>
            <span className="badge badge-gold">{course.category}</span>
          </div>

          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-navy)",
            }}
          >
            {course.title[lang] || course.title.en}
          </h1>

          <p style={{ color: "var(--color-slate-light)", lineHeight: 1.7 }}>
            {course.description[lang] || course.description.en}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-6 flex-wrap text-sm" style={{ color: "var(--color-gray-500)" }}>
            <span className="flex items-center gap-1.5">
              <Clock size={16} /> {course.estimatedHours}h total
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={16} /> {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={16} /> {course.enrolledCount.toLocaleString()} enrolled
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={16} style={{ color: "var(--color-brand-gold)" }} /> {course.rating}
            </span>
          </div>

          {/* Instructor */}
          <div className="card flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-purple))" }}
            >
              {course.instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--color-brand-navy)" }}>
                {course.instructor.name}
              </p>
              <p className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                {t("courses.instructor") || "Instructor"}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="card space-y-4">
            {isEnrolled ? (
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "var(--color-brand-blue)" }}>
                    {progress.percentComplete}%
                  </div>
                  <p className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                    {t("common.complete") || "Complete"}
                  </p>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div className="progress-bar-fill" style={{ width: `${progress.percentComplete}%` }} />
                </div>
                <Link
                  href={`/courses/${course.id}/lessons/${progress.lastLessonId}`}
                  className="btn btn-primary btn-lg w-full"
                >
                  <Play size={16} fill="white" />
                  {t("courses.continueLearning") || "Continue Learning"}
                </Link>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: "var(--color-brand-navy)" }}>
                    {t("courses.free") || "Free"}
                  </div>
                  <p className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                    {t("courses.fullAccess") || "Full access to all lessons"}
                  </p>
                </div>
                <button className="btn btn-primary btn-lg w-full">
                  {t("courses.enrollNow") || "Enroll Now"} <ArrowRight size={16} />
                </button>
              </>
            )}

            <div className="space-y-2 pt-2 border-t" style={{ borderColor: "var(--color-gray-200)" }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-slate-light)" }}>
                  {t("courses.duration") || "Duration"}
                </span>
                <span className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
                  {course.estimatedHours}h
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-slate-light)" }}>
                  {t("courses.lessons") || "Lessons"}
                </span>
                <span className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
                  {course.totalLessons}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-slate-light)" }}>
                  {t("courses.modules") || "Modules"}
                </span>
                <span className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
                  {course.modules.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div>
        <h2
          className="text-xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-navy)",
          }}
        >
          {t("courses.curriculum") || "Curriculum"}
        </h2>

        <div className="space-y-3">
          {course.modules.map((module, mi) => {
            const isOpen = openModules.includes(module.id);
            const moduleLessons = module.lessons.length;
            const completedInModule = progress
              ? module.lessons.filter((l) =>
                  progress.completedLessonIds.includes(l.id)
                ).length
              : 0;

            return (
              <div key={module.id} className="card" style={{ padding: 0 }}>
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "var(--color-brand-blue-50)",
                        color: "var(--color-brand-blue)",
                      }}
                    >
                      {mi + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--color-brand-navy)" }}>
                        {module.title[lang] || module.title.en}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                        {moduleLessons} lessons
                        {isEnrolled && ` · ${completedInModule}/${moduleLessons} complete`}
                      </p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={18} style={{ color: "var(--color-gray-400)" }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: "var(--color-gray-400)" }} />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-3 space-y-1">
                    {module.lessons.map((lesson) => {
                      const completed = progress?.completedLessonIds.includes(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/courses/${course.id}/lessons/${lesson.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-gray-50"
                        >
                          <span style={{ color: completed ? "#059669" : "var(--color-gray-400)" }}>
                            {completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          </span>
                          <span
                            className="flex items-center gap-2"
                            style={{ color: "var(--color-gray-500)" }}
                          >
                            {lessonIcon(lesson.type)}
                          </span>
                          <span
                            className="flex-1"
                            style={{ color: completed ? "var(--color-slate-light)" : "var(--color-brand-navy)" }}
                          >
                            {lesson.title[lang] || lesson.title.en}
                          </span>
                          <span className="text-xs" style={{ color: "var(--color-gray-400)" }}>
                            {lesson.duration}m
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

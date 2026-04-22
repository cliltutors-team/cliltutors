"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Search, Clock, Users, Star, ArrowRight } from "lucide-react";
import { courses } from "@/src/lib/mock/courses";
import { userProgress } from "@/src/lib/mock/user";
import { useState } from "react";

const levels = ["All", "A1", "A2", "B1", "B2", "C1", "C2"];
const languageFilters = ["All", "English", "Spanish", "Portuguese"];
const categories = ["All", "Business", "Academic", "CLIL", "Certification", "Conversation"];

export default function CoursesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "es" | "pt";

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = courses.filter((c) => {
    const matchSearch =
      !search ||
      c.title[lang]?.toLowerCase().includes(search.toLowerCase()) ||
      c.title.en.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "All" || c.level === levelFilter;
    const matchLang = langFilter === "All" || c.language === langFilter;
    const matchCat = catFilter === "All" || c.category === catFilter;
    return matchSearch && matchLevel && matchLang && matchCat;
  });

  const featured = courses.filter((c) => c.isFeatured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-navy)" }}
        >
          {t("courses.title") || "Course Catalog"}
        </h1>
        <p style={{ color: "var(--color-slate-light)", fontSize: "0.9375rem" }}>
          {t("courses.subtitle") || "Explore our language and methodology courses"}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-gray-400)" }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("courses.searchPlaceholder") || "Search courses or instructors..."}
              className="w-full h-10 pl-10 pr-4 rounded-lg border text-sm outline-none"
              style={{
                borderColor: "var(--color-gray-200)",
                background: "var(--color-gray-50)",
              }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <FilterDropdown
              label={t("courses.language") || "Language"}
              options={languageFilters}
              value={langFilter}
              onChange={setLangFilter}
            />
            <FilterDropdown
              label={t("courses.level") || "Level"}
              options={levels}
              value={levelFilter}
              onChange={setLevelFilter}
            />
            <FilterDropdown
              label={t("courses.category") || "Category"}
              options={categories}
              value={catFilter}
              onChange={setCatFilter}
            />
          </div>
        </div>
      </div>

      {/* Featured */}
      {!search && levelFilter === "All" && langFilter === "All" && catFilter === "All" && (
        <div>
          <h2
            className="text-base font-bold mb-3 flex items-center gap-2"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-navy)" }}
          >
            <Star size={18} style={{ color: "var(--color-brand-gold)" }} />
            {t("courses.featured") || "Featured Courses"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} lang={lang} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Courses */}
      <div>
        <h2
          className="text-base font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-navy)" }}
        >
          {search || levelFilter !== "All" || langFilter !== "All" || catFilter !== "All"
            ? `${filtered.length} ${t("courses.results") || "results"}`
            : t("courses.allCourses") || "All Courses"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} lang={lang} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">🔍</p>
            <p className="font-medium" style={{ color: "var(--color-brand-navy)" }}>
              {t("courses.noResults") || "No courses found"}
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-slate-light)" }}>
              {t("courses.tryDifferent") || "Try adjusting your filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  lang,
  featured,
}: {
  course: (typeof courses)[0];
  lang: string;
  featured?: boolean;
}) {
  const progress = userProgress.find((p) => p.courseId === course.id);
  const isEnrolled = !!progress;

  const levelColors: Record<string, string> = {
    A1: "badge-green",
    A2: "badge-green",
    B1: "badge-blue",
    B2: "badge-blue",
    C1: "badge-purple",
    C2: "badge-purple",
  };

  return (
    <Link
      href={`/courses/${course.id}`}
      className={`card card-hover-lift ${featured ? "border-brand-blue-200" : ""}`}
      style={featured ? { borderColor: "var(--color-brand-blue-200)" } : undefined}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2">
          <span className={`badge ${levelColors[course.level] || "badge-blue"}`}>
            {course.level}
          </span>
          {course.isNew && <span className="badge badge-coral">NEW</span>}
          {course.isFeatured && featured && (
            <span className="badge badge-gold">⭐ FEATURED</span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3
        className="font-semibold mb-1 text-sm"
        style={{ color: "var(--color-brand-navy)" }}
      >
        {course.title[lang] || course.title.en}
      </h3>
      <p
        className="text-xs mb-3 line-clamp-2"
        style={{ color: "var(--color-slate-light)" }}
      >
        {course.description[lang] || course.description.en}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "var(--color-gray-500)" }}>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {course.estimatedHours}h
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} /> {course.enrolledCount.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Star size={12} style={{ color: "var(--color-brand-gold)" }} /> {course.rating}
        </span>
      </div>

      {/* Instructor */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "var(--color-slate-light)" }}>
          {course.instructor.name}
        </span>
        {isEnrolled ? (
          <span className="text-xs font-semibold" style={{ color: "var(--color-brand-blue)" }}>
            {progress.percentComplete}% ✓
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-brand-blue)" }}>
            Enroll <ArrowRight size={12} />
          </span>
        )}
      </div>

      {/* Progress bar if enrolled */}
      {isEnrolled && (
        <div className="progress-bar mt-2">
          <div className="progress-bar-fill" style={{ width: `${progress.percentComplete}%` }} />
        </div>
      )}
    </Link>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 px-3 rounded-lg border text-sm outline-none cursor-pointer"
      style={{
        borderColor: "var(--color-gray-200)",
        background: "var(--color-gray-50)",
        color: "var(--color-slate)",
        fontFamily: "var(--font-sans)",
      }}
      aria-label={label}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt === "All" ? `${label}: All` : opt}
        </option>
      ))}
    </select>
  );
}

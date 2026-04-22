import type { Course as ApiCourse } from "../api/types";

export interface Course {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  thumbnail?: string;
  instructor: { id: string; name: string };
  level: string;
  language: string;
  category: string;
  totalLessons: number;
  estimatedHours: number;
  enrolledCount: number;
  rating: number;
  isFeatured?: boolean;
  isNew?: boolean;
  modules: Module[];
}

export interface ApiCourseFrontend {
  id: number;
  title: string;
  description: string | null;
  price: string;
  level: string | null;
  is_published: boolean;
  total_lessons: number;
  created_at: string;
}

export interface Module {
  id: string;
  title: Record<string, string>;
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  title: Record<string, string>;
  duration: number;
  type: "video" | "quiz" | "reading" | "exercise";
  isPreview?: boolean;
}

export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type CourseLanguage = "English" | "Spanish" | "Portuguese";
export type CourseCategory =
  | "Business"
  | "Academic"
  | "CLIL"
  | "Certification"
  | "Conversation";

export function apiCourseToFrontend(c: ApiCourse): ApiCourseFrontend {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    price: String(c.price),
    level: c.level,
    is_published: c.is_published,
    total_lessons: c.total_lessons,
    created_at: c.created_at,
  };
}

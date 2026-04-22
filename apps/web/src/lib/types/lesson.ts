export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: Record<string, string>;
  description: Record<string, string>;
  videoUrl: string;              // YouTube/Vimeo URL or path
  videoProvider: "youtube" | "vimeo" | "native";
  duration: number;              // minutes
  type: "video" | "quiz" | "reading" | "exercise";
  resources: LessonResource[];
  transcript?: Record<string, string>;
  order: number;
  isPreview?: boolean;
}

export interface LessonResource {
  id: string;
  title: string;
  type: "pdf" | "doc" | "link" | "audio";
  url: string;
}

export interface LessonProgress {
  lessonId: string;
  courseId: string;
  completed: boolean;
  watchedPercent: number;          // 0-100
  lastWatchedAt?: string;          // ISO date
  notes?: string;
}

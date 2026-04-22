import type { User } from "../types";

export const currentUser: User = {
  id: "u1",
  name: "Giovanni Rossi",
  email: "giovanni@example.com",
  avatar: undefined,
  role: "student",
  preferredLanguage: "en",
  enrolledCourseIds: ["eng-business-b2", "spa-conversation-a2", "eng-clil-certification"],
  level: "B2",
  streak: 12,
  totalHours: 47.5,
  joinedAt: "2025-09-15T00:00:00Z",
};

export interface CourseProgress {
  courseId: string;
  completedLessonIds: string[];
  lastLessonId: string;
  lastAccessedAt: string;
  percentComplete: number;
}

export const userProgress: CourseProgress[] = [
  {
    courseId: "eng-business-b2",
    completedLessonIds: ["l1", "l2", "l3", "l4", "l5"],
    lastLessonId: "l6",
    lastAccessedAt: "2026-03-15T10:30:00Z",
    percentComplete: 50,
  },
  {
    courseId: "spa-conversation-a2",
    completedLessonIds: ["l1", "l2"],
    lastLessonId: "l3",
    lastAccessedAt: "2026-03-14T16:00:00Z",
    percentComplete: 33,
  },
  {
    courseId: "eng-clil-certification",
    completedLessonIds: ["l1"],
    lastLessonId: "l2",
    lastAccessedAt: "2026-03-12T09:00:00Z",
    percentComplete: 12,
  },
];

export function getProgressForCourse(courseId: string): CourseProgress | undefined {
  return userProgress.find((p) => p.courseId === courseId);
}

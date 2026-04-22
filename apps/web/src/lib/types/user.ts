export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
  preferredLanguage: "en" | "es" | "pt";
  enrolledCourseIds: string[];
  level: string;
  streak: number;                // current day streak
  totalHours: number;            // total hours studied
  joinedAt: string;              // ISO date
}

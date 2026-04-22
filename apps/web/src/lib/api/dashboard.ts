import { api } from "./client";

export interface DashboardStats {
  total_sessions: number;
  completed_sessions: number;
  upcoming_sessions: number;
  total_hours: number;
  languages_learned: number;
  current_streak: number;
  longest_streak: number;
  average_rating: number;
}

export interface UpcomingSession {
  id: string;
  title: Record<string, string>;
  date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  language: string;
  level: string;
  instructor: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
  type: "1on1" | "group" | "trial";
  status: "available" | "full" | "cancelled";
  meeting_url?: string;
}

export interface RecentActivity {
  id: string;
  type:
    | "session_completed"
    | "session_booked"
    | "session_cancelled"
    | "course_purchased"
    | "lesson_completed"
    | "review_submitted";
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export const dashboardApi = {
  getStats: () => api.get<DashboardStats>("/api/dashboard/stats"),

  getUpcomingSessions: (limit?: number) =>
    api.get<{ sessions: UpcomingSession[]; count: number }>(
      "/api/dashboard/upcoming-sessions",
      limit ? { limit } : undefined,
    ),

  getRecentActivity: (limit?: number) =>
    api.get<{ activities: RecentActivity[]; count: number }>(
      "/api/dashboard/recent-activity",
      limit ? { limit } : undefined,
    ),
};

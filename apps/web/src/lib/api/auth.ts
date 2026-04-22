import { api, ApiClientError } from "./client";

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}

export interface User {
  id: number | string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

const ACCESS_TOKEN_KEY = "cliltutors_access_token";
const REFRESH_TOKEN_KEY = "cliltutors_refresh_token";

function isNotImplementedError(error: unknown): boolean {
  if (error instanceof ApiClientError) {
    return error.statusCode === 404;
  }
  return false;
}

function createFallbackUserProfile(): UserProfile {
  return {
    id: "pending",
    username: "pending",
    email: "pending@example.com",
    role: "student",
    preferred_language: "en",
  };
}

function createFallbackDashboard(): DashboardData {
  return {
    stats: {
      total_hours: 0,
      streak: 0,
      lessons_completed: 0,
      current_level: "A1",
    },
    enrolled_courses: [],
    recent_activity: [],
    upcoming_sessions: [],
  };
}

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>("/api/login/", data, {
    coldStartRetries: 8,
    coldStartTimeout: 90000,
  });
  storeTokens(response);
  return response;
}

export async function register(data: RegisterRequest): Promise<User> {
  return api.post<User>("/api/register/", data, {
    coldStartRetries: 8,
    coldStartTimeout: 90000,
  });
}

export async function refreshToken(): Promise<string> {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error("No refresh token available");
  }

  const response = await api.post<TokenResponse>(
    "/api/token/refresh/",
    {
      refresh,
    },
    { skipAuth: true },
  );
  storeAccessToken(response.access);
  return response.access;
}

export function storeTokens(tokens: TokenResponse): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
}

export function storeAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function logout(): void {
  clearTokens();
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export interface UserStats {
  total_hours: number;
  streak: number;
  lessons_completed: number;
  current_level: string;
}

export interface CourseProgress {
  course_id: number;
  course_title: string;
  instructor_name: string;
  percent_complete: number;
  completed_lessons: number;
  total_lessons: number;
  last_accessed_at: string;
  last_lesson_id?: number;
  level?: string;
  language?: string;
  estimated_hours?: number;
}

export interface RecentActivity {
  id: string;
  type:
    | "lesson_completed"
    | "course_enrolled"
    | "session_booked"
    | "achievement";
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardData {
  stats: UserStats;
  enrolled_courses: CourseProgress[];
  recent_activity: RecentActivity[];
  upcoming_sessions: {
    id: string;
    title: string;
    instructor_name: string;
    date: string;
    start_time: string;
    type: "1on1" | "group" | "trial";
    meeting_url?: string;
  }[];
}

export interface UserProfile {
  id: number | string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
  preferred_language: "en" | "es" | "pt";
  level?: string;
  streak?: number;
  total_hours?: number;
  enrolled_courses?: string[];
  joined_at?: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  preferred_language?: "en" | "es" | "pt";
}

export async function getCurrentUser(): Promise<UserProfile> {
  try {
    return await api.get<UserProfile>("/api/users/me/");
  } catch (error) {
    if (isNotImplementedError(error)) {
      console.warn(
        "User profile endpoint not implemented yet. Using fallback.",
      );
      return createFallbackUserProfile();
    }
    throw error;
  }
}

export async function updateProfile(
  data: UpdateProfileRequest,
): Promise<UserProfile> {
  return api.put<UserProfile>("/api/users/me/", data);
}

export async function getDashboard(): Promise<DashboardData> {
  try {
    return await api.get<DashboardData>("/api/users/me/dashboard/");
  } catch (error) {
    if (isNotImplementedError(error)) {
      console.warn("Dashboard endpoint not implemented yet. Using fallback.");
      return createFallbackDashboard();
    }
    throw error;
  }
}

export async function getUserStats(): Promise<UserStats> {
  try {
    return await api.get<UserStats>("/api/users/me/stats/");
  } catch (error) {
    if (isNotImplementedError(error)) {
      console.warn("User stats endpoint not implemented yet. Using fallback.");
      return createFallbackDashboard().stats;
    }
    throw error;
  }
}

export async function getCourseProgress(): Promise<CourseProgress[]> {
  try {
    return await api.get<CourseProgress[]>("/api/users/me/progress/");
  } catch (error) {
    if (isNotImplementedError(error)) {
      console.warn(
        "Course progress endpoint not implemented yet. Using fallback.",
      );
      return [];
    }
    throw error;
  }
}

export async function getRecentActivity(
  limit?: number,
): Promise<RecentActivity[]> {
  try {
    return await api.get<RecentActivity[]>(
      "/api/users/me/activity/",
      limit ? { limit } : undefined,
    );
  } catch (error) {
    if (isNotImplementedError(error)) {
      console.warn(
        "Recent activity endpoint not implemented yet. Using fallback.",
      );
      return [];
    }
    throw error;
  }
}

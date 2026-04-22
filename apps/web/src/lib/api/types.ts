export interface InstructorProfile {
  avatar_url: string | null;
  bio: Record<string, string>;
  languages: string[];
  specialties: string[];
  rating: number;
  review_count: number;
  country: string;
  timezone: string;
  hourly_rate: string;
  session_duration: 30 | 60;
  is_active: boolean;
}

export interface Instructor {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  profile: InstructorProfile;
}

export interface Course {
  id: number;
  title: string;
  description: string | null;
  price: string;
  level: string | null;
  is_published: boolean;
  total_lessons: number;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  date_joined: string;
  last_login?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface SessionsQueryParams {
  instructor_id?: number;
  date_from?: string;
  date_to?: string;
  type?: "1on1" | "group" | "trial";
  language?: string;
  level?: string;
  status?: "available" | "full" | "cancelled";
  page?: number;
  page_size?: number;
}

export interface Session {
  id: string;
  instructor: {
    id: number;
    name: string;
    avatar_url: string | null;
    rating: number;
  };
  title: Record<string, string>;
  description: Record<string, string>;
  date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  type: "1on1" | "group" | "trial";
  language: string;
  level: string;
  max_participants: number;
  enrolled_count: number;
  spots_left: number;
  price: string;
  status: "available" | "full" | "cancelled";
  tags: string[];
  is_booked_by_current_user: boolean;
}

export interface SessionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Session[];
}

export interface Booking {
  id: string;
  sessionId: string;
  userId: string;
  status: string;
  bookedAt: string;
  cancelledAt?: string;
  notes?: string;
  cancelReason?: string;
  meetingUrl?: string;
}

export interface CreateBookingRequest {
  sessionId: string;
  notes?: string;
}

export interface CreateBookingResponse {
  booking: Booking;
}

export interface CancelBookingRequest {
  reason?: string;
}

export interface Student {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  date_joined: string;
  last_login: string | null;
}

export interface CreateInstructorRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  country: string;
  timezone: string;
  hourly_rate: string;
}

export interface CreateInstructorResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface RegisterResponse {
  user: Student;
  tokens: {
    refresh: string;
    access: string;
  };
  message: string;
}

export interface CalendarMonthResponse {
  year: number;
  month: number;
  dates: string[];
}

export interface ApiLoadingState {
  isLoading: boolean;
  isRetrying: boolean;
  retryAttempt: number;
  maxRetries: number;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  isNotImplemented?: boolean;
  isColdStart?: boolean;
}

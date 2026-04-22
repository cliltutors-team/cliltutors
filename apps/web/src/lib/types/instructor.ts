import type {
  Session as ApiSession,
  Booking as ApiBooking,
  Instructor as ApiInstructor,
} from "../api/types";

export type SessionType = "1on1" | "group" | "trial";
export type SessionStatus = "available" | "full" | "cancelled";
export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: Record<string, string>;
  languages: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  courseIds: string[];
  country: string;
  timezone: string;
  hourlyRate: number;
  sessionDuration: number;
  availableSlots?: TimeSlot[];
}

export interface InstructorSummary {
  id: string;
  name: string;
  avatar?: string;
}

export interface TimeSlot {
  id: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Session {
  id: string;
  instructorId: string;
  instructorName: string;
  instructor?: InstructorSummary;
  title: Record<string, string>;
  description: Record<string, string>;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  type: SessionType;
  languageFocus: string;
  level: string;
  maxParticipants: number;
  enrolledCount: number;
  spotsLeft?: number;
  price: number;
  status: SessionStatus;
  tags: string[];
  isBookedByCurrentUser?: boolean;
  meetingUrl?: string;
}

export interface BookedSession {
  id?: string;
  sessionId: string;
  userId: string;
  status: BookingStatus;
  bookedAt: string;
  cancelledAt?: string;
  notes?: string;
  cancelReason?: string;
  meetingUrl?: string;
}

export function apiSessionToFrontend(s: ApiSession): Session {
  return {
    id: s.id,
    instructorId: String(s.instructor.id),
    instructorName: s.instructor.name,
    instructor: {
      id: String(s.instructor.id),
      name: s.instructor.name,
      avatar: s.instructor.avatar_url ?? undefined,
    },
    title: s.title,
    description: s.description,
    date: s.date,
    startTime: s.start_time,
    endTime: s.end_time,
    durationMinutes: s.duration_minutes,
    type: s.type,
    languageFocus: s.language,
    level: s.level,
    maxParticipants: s.max_participants,
    enrolledCount: s.enrolled_count,
    spotsLeft: s.spots_left,
    price: parseFloat(s.price),
    status: s.status,
    tags: s.tags,
    isBookedByCurrentUser: s.is_booked_by_current_user,
  };
}

export function apiBookingToFrontend(b: ApiBooking): BookedSession {
  return {
    id: b.id,
    sessionId: b.sessionId,
    userId: b.userId,
    status: b.status as BookingStatus,
    bookedAt: b.bookedAt,
    cancelledAt: b.cancelledAt,
    notes: b.notes,
    cancelReason: b.cancelReason,
    meetingUrl: b.meetingUrl,
  };
}

export function mapApiSessionList(data: {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiSession[];
}): { sessions: Session[]; total: number } {
  return {
    sessions: data.results.map(apiSessionToFrontend),
    total: data.count,
  };
}

export function apiInstructorToFrontend(i: ApiInstructor): Instructor {
  const fullName =
    [i.first_name, i.last_name].filter(Boolean).join(" ") || i.username;
  return {
    id: String(i.id),
    name: fullName,
    avatar: i.profile?.avatar_url ?? "",
    bio: i.profile?.bio ?? {},
    languages: i.profile?.languages ?? [],
    specialties: i.profile?.specialties ?? [],
    rating: i.profile?.rating ?? 0,
    reviewCount: i.profile?.review_count ?? 0,
    courseIds: [],
    country: i.profile?.country ?? "",
    timezone: i.profile?.timezone ?? "UTC",
    hourlyRate: parseFloat(i.profile?.hourly_rate ?? "0"),
    sessionDuration: i.profile?.session_duration ?? 50,
  };
}

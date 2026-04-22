"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionsApi, bookingsApi, instructorsApi } from "../api";
import type { SessionsQueryParams, CreateBookingRequest } from "../api/types";

export function useSessions(params?: SessionsQueryParams) {
  return useQuery({
    queryKey: ["sessions", params],
    queryFn: () => sessionsApi.list(params),
    staleTime: 1000 * 60,
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionsApi.get(id),
    enabled: !!id,
  });
}

export function useCalendarMonth(year: number, month: number) {
  return useQuery({
    queryKey: ["calendar", year, month],
    queryFn: () => sessionsApi.getCalendarMonth(year, month),
    staleTime: 1000 * 60 * 60,
  });
}

export function useInstructors() {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: instructorsApi.list,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInstructor(id: number | string) {
  return useQuery({
    queryKey: ["instructor", id],
    queryFn: () =>
      instructorsApi.get(typeof id === "string" ? parseInt(id, 10) : id),
    enabled: !!id,
  });
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: bookingsApi.list,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      bookingsApi.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export {
  useLogin,
  useRegister,
  useLogout,
  useAuth,
  useRefreshToken,
  useProfile,
  useUpdateProfile,
} from "./auth";

export { useCourses, useCourse, usePurchaseCourse } from "./courses";
export { useStudents } from "./students";
export { useCreateInstructor } from "./admin";

export {
  useDashboard,
  useDashboardStats,
  useCourseProgress,
  useRecentActivity,
  useUpcomingSessions,
} from "./dashboard";

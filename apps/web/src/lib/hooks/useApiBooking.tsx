"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionsApi, bookingsApi } from "../api";
import type { Session, Booking } from "../api/types";

interface BookingState {
  sessions: Session[];
  bookedSessions: Booking[];
  isLoading: boolean;
  error: Error | null;
  bookSession: (sessionId: string, notes?: string) => Promise<void>;
  cancelSession: (sessionId: string, reason?: string) => Promise<void>;
  isBooked: (sessionId: string) => boolean;
  getBooking: (sessionId: string) => Booking | undefined;
  getSpotsLeft: (sessionId: string) => number;
  filterSessions: (filters: SessionFilters) => Session[];
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  refetch: () => void;
}

export interface SessionFilters {
  instructorId?: string;
  date?: string;
  type?: "1on1" | "group" | "trial" | "all";
  language?: string;
  level?: string;
  onlyAvailable?: boolean;
}

const BookingContext = createContext<BookingState | null>(null);

export function ApiBookingProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data: sessionsData,
    isLoading: sessionsLoading,
    error: sessionsError,
    refetch: refetchSessions,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => sessionsApi.list(),
  });

  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    error: bookingsError,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => bookingsApi.list(),
  });

  const createBookingMutation = useMutation({
    mutationFn: ({ sessionId, notes }: { sessionId: string; notes?: string }) =>
      bookingsApi.create({ sessionId, notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: ({
      bookingId,
      reason,
    }: {
      bookingId: string;
      reason?: string;
    }) => bookingsApi.cancel(bookingId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  const sessions = useMemo(() => sessionsData?.results ?? [], [sessionsData]);
  const bookedSessions = useMemo(
    () => bookingsData?.bookings ?? [],
    [bookingsData],
  );

  const bookSession = useCallback(
    async (sessionId: string, notes?: string) => {
      await createBookingMutation.mutateAsync({ sessionId, notes });
    },
    [createBookingMutation],
  );

  const cancelSession = useCallback(
    async (sessionId: string, reason?: string) => {
      const booking = bookedSessions.find(
        (b) => b.sessionId === sessionId && b.status === "confirmed",
      );
      if (booking) {
        await cancelBookingMutation.mutateAsync({
          bookingId: booking.id,
          reason,
        });
      }
    },
    [bookedSessions, cancelBookingMutation],
  );

  const isBooked = useCallback(
    (sessionId: string) => {
      return bookedSessions.some(
        (b) => b.sessionId === sessionId && b.status === "confirmed",
      );
    },
    [bookedSessions],
  );

  const getBooking = useCallback(
    (sessionId: string) => {
      return bookedSessions.find(
        (b) => b.sessionId === sessionId && b.status === "confirmed",
      );
    },
    [bookedSessions],
  );

  const getSpotsLeft = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return 0;
      return session.spots_left;
    },
    [sessions],
  );

  const filterSessions = useCallback(
    (filters: SessionFilters): Session[] => {
      return sessions.filter((s) => {
        if (
          filters.instructorId &&
          String(s.instructor.id) !== filters.instructorId
        )
          return false;
        if (filters.date && s.date !== filters.date) return false;
        if (filters.type && filters.type !== "all" && s.type !== filters.type)
          return false;
        if (
          filters.language &&
          filters.language !== "all" &&
          s.language !== filters.language
        )
          return false;
        if (
          filters.level &&
          filters.level !== "all" &&
          s.level !== filters.level &&
          s.level !== "All"
        )
          return false;
        if (filters.onlyAvailable) {
          if (s.spots_left <= 0 && !isBooked(s.id)) return false;
        }
        return true;
      });
    },
    [sessions, isBooked],
  );

  const today = new Date().toISOString().slice(0, 10);

  const upcomingBookings = useMemo(() => {
    return bookedSessions.filter((b) => {
      if (b.status !== "confirmed") return false;
      const session = sessions.find((s) => s.id === b.sessionId);
      return session ? session.date >= today : false;
    });
  }, [bookedSessions, sessions, today]);

  const pastBookings = useMemo(() => {
    return bookedSessions.filter((b) => {
      const session = sessions.find((s) => s.id === b.sessionId);
      if (!session) return false;
      return (
        session.date < today ||
        b.status === "cancelled" ||
        b.status === "completed"
      );
    });
  }, [bookedSessions, sessions, today]);

  const value: BookingState = {
    sessions,
    bookedSessions,
    isLoading: sessionsLoading || bookingsLoading,
    error: sessionsError || bookingsError,
    bookSession,
    cancelSession,
    isBooked,
    getBooking,
    getSpotsLeft,
    filterSessions,
    upcomingBookings,
    pastBookings,
    refetch: () => {
      refetchSessions();
      refetchBookings();
    },
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useApiBooking(): BookingState {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error("useApiBooking must be used inside ApiBookingProvider");
  return ctx;
}

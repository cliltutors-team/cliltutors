"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import type { Session, BookedSession, SessionType } from "@/src/lib/types";
import { defaultBookedSessions } from "@/src/lib/mock/sessions";
import { useSessions, useBookings } from "@/src/lib/queries";
import { apiSessionToFrontend } from "@/src/lib/types";

/* ─── Types ──────────────────────────────────────────── */
interface BookingState {
  sessions: Session[];
  bookedSessions: BookedSession[];
  isLoading: boolean;
  error: Error | null;
  bookSession: (sessionId: string, notes?: string) => void;
  cancelSession: (sessionId: string, reason?: string) => void;
  isBooked: (sessionId: string) => boolean;
  getBooking: (sessionId: string) => BookedSession | undefined;
  getSpotsLeft: (sessionId: string) => number;
  filterSessions: (filters: SessionFilters) => Session[];
  upcomingBookings: BookedSession[];
  pastBookings: BookedSession[];
  refetch: () => void;
}

export interface SessionFilters {
  instructorId?: string;
  date?: string;
  type?: SessionType | "all";
  language?: string;
  level?: string;
  onlyAvailable?: boolean;
}

const STORAGE_KEY = "cliltutors_booked_sessions";
const today = "2026-03-15";

/* ─── Context ────────────────────────────────────────── */
const BookingContext = createContext<BookingState | null>(null);

function getInitialBookings(): BookedSession[] {
  if (typeof window === "undefined") return defaultBookedSessions;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBookedSessions));
    return defaultBookedSessions;
  } catch {
    return defaultBookedSessions;
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookedSessions, setBookedSessions] =
    useState<BookedSession[]>(getInitialBookings);
  const isInitialMount = useRef(true);

  const { data: sessionsData, isLoading, error, refetch } = useSessions();
  const sessions = useMemo(
    () => sessionsData?.results?.map(apiSessionToFrontend) ?? [],
    [sessionsData],
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookedSessions));
  }, [bookedSessions]);

  const bookSession = useCallback((sessionId: string, notes?: string) => {
    setBookedSessions((prev) => {
      if (
        prev.find((b) => b.sessionId === sessionId && b.status === "confirmed")
      ) {
        return prev;
      }
      return [
        ...prev,
        {
          sessionId,
          userId: "gio",
          status: "confirmed" as const,
          bookedAt: new Date().toISOString(),
          notes,
        },
      ];
    });
  }, []);

  const cancelSession = useCallback((sessionId: string, reason?: string) => {
    setBookedSessions((prev) =>
      prev.map((b) =>
        b.sessionId === sessionId && b.status === "confirmed"
          ? {
              ...b,
              status: "cancelled" as const,
              cancelledAt: new Date().toISOString(),
              cancelReason: reason,
            }
          : b,
      ),
    );
  }, []);

  const isBooked = useCallback(
    (sessionId: string) =>
      bookedSessions.some(
        (b) => b.sessionId === sessionId && b.status === "confirmed",
      ),
    [bookedSessions],
  );

  const getBooking = useCallback(
    (sessionId: string) =>
      bookedSessions.find(
        (b) => b.sessionId === sessionId && b.status === "confirmed",
      ),
    [bookedSessions],
  );

  const getSpotsLeft = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return 0;
      const bookedCount = bookedSessions.filter(
        (b) => b.sessionId === sessionId && b.status === "confirmed",
      ).length;
      return Math.max(
        0,
        session.maxParticipants - session.enrolledCount - bookedCount,
      );
    },
    [sessions, bookedSessions],
  );

  const filterSessions = useCallback(
    (filters: SessionFilters): Session[] => {
      return sessions.filter((s) => {
        if (filters.instructorId && s.instructorId !== filters.instructorId)
          return false;
        if (filters.date && s.date !== filters.date) return false;
        if (filters.type && filters.type !== "all" && s.type !== filters.type)
          return false;
        if (
          filters.language &&
          filters.language !== "all" &&
          s.languageFocus !== filters.language
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
          const spots = getSpotsLeft(s.id);
          if (spots <= 0 && !isBooked(s.id)) return false;
        }
        return true;
      });
    },
    [sessions, getSpotsLeft, isBooked],
  );

  const upcomingBookings = useMemo(
    () =>
      bookedSessions.filter((b) => {
        if (b.status !== "confirmed") return false;
        const session = sessions.find((s) => s.id === b.sessionId);
        return session ? session.date >= today : false;
      }),
    [bookedSessions, sessions],
  );

  const pastBookings = useMemo(
    () =>
      bookedSessions.filter((b) => {
        const session = sessions.find((s) => s.id === b.sessionId);
        if (!session) return false;
        return (
          session.date < today ||
          b.status === "cancelled" ||
          b.status === "completed"
        );
      }),
    [bookedSessions, sessions],
  );

  return (
    <BookingContext.Provider
      value={{
        sessions,
        bookedSessions,
        isLoading,
        error: error as Error | null,
        bookSession,
        cancelSession,
        isBooked,
        getBooking,
        getSpotsLeft,
        filterSessions,
        upcomingBookings,
        pastBookings,
        refetch,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingState {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

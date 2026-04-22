/**
 * ✅ Sessions endpoints are NOW IMPLEMENTED in the backend!
 *
 * Available endpoints:
 * - GET /api/sessions/ - List sessions with filters (paginated)
 * - GET /api/sessions/{id}/ - Single session detail
 *
 * Still missing:
 * - GET /api/calendar/month - Calendar dates (using fallback)
 * - POST/GET/PUT /api/bookings/ - Booking management
 */

import { api, ApiClientError } from "./client";
import type { SessionsResponse, SessionsQueryParams, Session } from "./types";

function isNotImplementedError(error: unknown): boolean {
  if (error instanceof ApiClientError) {
    return error.statusCode === 404;
  }
  return false;
}

function generateCalendarFallback(
  year: number,
  month: number,
): { year: number; month: number; dates: string[] } {
  const dates: string[] = [];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }

  return { year, month, dates };
}

export const sessionsApi = {
  list: (params?: SessionsQueryParams) =>
    api.get<SessionsResponse>(
      "/api/sessions/",
      params ? { ...params } : undefined,
      { coldStartRetries: 8, coldStartTimeout: 90000 },
    ),

  get: (id: string) =>
    api.get<Session>(`/api/sessions/${id}/`, undefined, {
      coldStartRetries: 8,
      coldStartTimeout: 90000,
    }),

  getCalendarMonth: async (year: number, month: number) => {
    try {
      return await api.get<{ year: number; month: number; dates: string[] }>(
        "/api/calendar/month",
        { year, month },
      );
    } catch (error) {
      if (isNotImplementedError(error)) {
        console.warn("Calendar endpoint not implemented yet. Using fallback.");
        return generateCalendarFallback(year, month);
      }
      throw error;
    }
  },
};

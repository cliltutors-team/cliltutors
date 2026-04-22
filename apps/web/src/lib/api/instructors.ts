import { api } from "./client";
import type { Instructor, PaginatedResponse } from "./types";

export const instructorsApi = {
  list: () => api.get<PaginatedResponse<Instructor>>("/api/instructors/"),

  get: (id: number | string) => api.get<Instructor>(`/api/instructors/${id}/`),

  getAvailability: (id: number | string) =>
    api.get<{
      slots: Array<{
        date: string;
        startTime: string;
        endTime: string;
        isBooked: boolean;
      }>;
    }>(`/api/instructors/${id}/availability/`),
};

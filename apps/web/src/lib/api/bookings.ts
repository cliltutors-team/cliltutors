import { api, ApiClientError } from "./client";
import type {
  Booking,
  CreateBookingRequest,
  CreateBookingResponse,
  CancelBookingRequest,
} from "./types";

function isNotImplementedError(error: unknown): boolean {
  if (error instanceof ApiClientError) {
    return error.statusCode === 404;
  }
  return false;
}

export const bookingsApi = {
  list: async () => {
    try {
      return await api.get<{ bookings: Booking[] }>("/api/bookings/me");
    } catch (error) {
      if (isNotImplementedError(error)) {
        console.warn(
          "Bookings list endpoint not implemented yet. Returning empty array.",
        );
        return { bookings: [] };
      }
      throw error;
    }
  },

  get: async (id: string) => {
    try {
      return await api.get<Booking>(`/api/bookings/${id}`);
    } catch (error) {
      if (isNotImplementedError(error)) {
        console.warn(`Booking ${id} endpoint not implemented yet.`);
        throw new ApiClientError("Booking not found", 404);
      }
      throw error;
    }
  },

  create: async (data: CreateBookingRequest) => {
    try {
      return await api.post<CreateBookingResponse>("/api/bookings", data, {
        coldStartRetries: 8,
        coldStartTimeout: 90000,
      });
    } catch (error) {
      if (isNotImplementedError(error)) {
        console.warn("Booking creation endpoint not implemented yet.");
        throw new ApiClientError(
          "Booking functionality not yet available",
          501,
        );
      }
      throw error;
    }
  },

  cancel: async (id: string, reason?: string) => {
    try {
      return await api.put<Booking>(`/api/bookings/${id}/cancel`, {
        reason,
      } as CancelBookingRequest);
    } catch (error) {
      if (isNotImplementedError(error)) {
        console.warn(`Booking cancellation endpoint not implemented yet.`);
        throw new ApiClientError("Booking cancellation not yet available", 501);
      }
      throw error;
    }
  },
};

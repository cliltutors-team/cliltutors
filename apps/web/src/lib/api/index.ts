export { api, apiClient, ApiClientError } from "./client";
export type { ApiError } from "./client";

export { sessionsApi } from "./sessions";
export { bookingsApi } from "./bookings";
export { instructorsApi } from "./instructors";
export { dashboardApi } from "./dashboard";
import * as coursesApi from "./courses";
export { coursesApi };
import * as studentsApi from "./students";
export { studentsApi };
import * as adminApi from "./admin";
export { adminApi };

export * from "./types";

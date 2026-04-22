import { api } from "./client";
import type { Course, PaginatedResponse } from "./types";

export type { Course, PaginatedResponse };

export async function listCourses(
  page?: number,
): Promise<PaginatedResponse<Course>> {
  return api.get<PaginatedResponse<Course>>(
    "/api/courses/",
    page !== undefined ? { page } : undefined,
  );
}

export async function getCourse(id: number): Promise<Course> {
  return api.get<Course>(`/api/courses/${id}/`);
}

export async function purchaseCourse(courseId: number): Promise<void> {
  return api.post(`/api/courses/purchase/${courseId}/`);
}

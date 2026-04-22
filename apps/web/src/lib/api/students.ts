import { api } from "./client";
import type { PaginatedResponse } from "./types";

export interface Student {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  date_joined: string;
}

export async function listStudents(
  page?: number,
): Promise<PaginatedResponse<Student>> {
  return api.get<PaginatedResponse<Student>>(
    "/api/students/",
    page !== undefined ? { page } : undefined,
  );
}

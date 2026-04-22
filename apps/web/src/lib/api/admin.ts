import { api } from "./client";
import type { Instructor } from "./types";

export interface CreateInstructorRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export async function createInstructor(
  data: CreateInstructorRequest,
): Promise<Instructor> {
  return api.post<Instructor>("/api/admin/create-instructor/", data);
}

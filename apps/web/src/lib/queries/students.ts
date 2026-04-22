"use client";

import { useQuery } from "@tanstack/react-query";
import * as studentsApi from "../api/students";

export function useStudents(page?: number) {
  return useQuery({
    queryKey: ["students", page],
    queryFn: () => studentsApi.listStudents(page),
    staleTime: 1000 * 60 * 5,
  });
}

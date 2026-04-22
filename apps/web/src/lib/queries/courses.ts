"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as coursesApi from "../api/courses";

export function useCourses(page?: number) {
  return useQuery({
    queryKey: ["courses", page],
    queryFn: () => coursesApi.listCourses(page),
    staleTime: 1000 * 60,
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => coursesApi.getCourse(id),
    enabled: !!id,
  });
}

export function usePurchaseCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: number) => coursesApi.purchaseCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

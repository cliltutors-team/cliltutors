"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "../api/admin";
import type { CreateInstructorRequest } from "../api/types";

export function useCreateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInstructorRequest) =>
      adminApi.createInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

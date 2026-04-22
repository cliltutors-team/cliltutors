"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboard,
  getUserStats,
  getCourseProgress,
  getRecentActivity,
} from "../api/auth";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 1000 * 60,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getUserStats,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCourseProgress() {
  return useQuery({
    queryKey: ["courseProgress"],
    queryFn: getCourseProgress,
    staleTime: 1000 * 60 * 2,
  });
}

export function useRecentActivity(limit?: number) {
  return useQuery({
    queryKey: ["recentActivity", limit],
    queryFn: () => getRecentActivity(limit),
    staleTime: 1000 * 30,
  });
}

export function useUpcomingSessions() {
  const { data, ...rest } = useQuery({
    queryKey: ["dashboard", "upcoming-sessions"],
    queryFn: async () => {
      const dashboard = await getDashboard();
      return dashboard.upcoming_sessions;
    },
    staleTime: 1000 * 60,
  });

  return {
    data: data ?? [],
    ...rest,
  };
}

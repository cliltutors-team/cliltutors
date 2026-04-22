"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authApi from "../api/auth";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authApi.login(data),
    onSuccess: (tokens) => {
      authApi.storeTokens(tokens);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      password: string;
      password_confirm: string;
      first_name?: string;
      last_name?: string;
    }) => authApi.register(data),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      authApi.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: () => {
      const accessToken = authApi.getAccessToken();
      const refreshToken = authApi.getRefreshToken();
      if (!accessToken) return null;
      return {
        accessToken,
        refreshToken,
        isAuthenticated: authApi.isAuthenticated(),
      };
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.refreshToken(),
    onSuccess: (newAccessToken) => {
      queryClient.setQueryData(["auth", "user"], (old: unknown) => {
        if (!old) return old;
        return {
          ...(old as object),
          accessToken: newAccessToken,
        };
      });
    },
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: authApi.UpdateProfileRequest) =>
      authApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

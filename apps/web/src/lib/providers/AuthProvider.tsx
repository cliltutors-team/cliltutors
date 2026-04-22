"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "../api/client";
import {
  getAuthToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../api/client";

interface User {
  id: number | string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: "student" | "instructor" | "admin";
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<User>;
  refreshUser: () => Promise<void>;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTE_PREFIXES = ["/profile", "/my-learning", "/schedule"];

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_REFRESH_THRESHOLD_MS = 5 * 60 * 1000;
const REFRESH_INTERVAL_MS = 4 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isRefreshing: false,
  });
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);
  const mountedRef = useRef(false);

  const fetchCurrentUser = useCallback(async (): Promise<User | null> => {
    try {
      const user = await api.get<User>("/api/me/");
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (isRefreshingRef.current) {
      return false;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    isRefreshingRef.current = true;
    setState((prev) => ({ ...prev, isRefreshing: true }));

    try {
      const response = await api.post<TokenResponse>(
        "/api/token/refresh/",
        { refresh: refreshToken },
        { skipAuth: true },
      );
      setTokens(response.access, response.refresh);
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearTokens();
      return false;
    } finally {
      isRefreshingRef.current = false;
      setState((prev) => ({ ...prev, isRefreshing: false }));
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    const accessToken = getAuthToken();
    const refreshToken = getRefreshToken();

    if (!accessToken && !refreshToken) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    if (!accessToken && refreshToken) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    }

    const user = await fetchCurrentUser();
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      isRefreshing: false,
    });
  }, [refreshAccessToken, fetchCurrentUser]);

  useEffect(() => {
    mountedRef.current = true;
    initializeAuth();

    return () => {
      mountedRef.current = false;
    };
  }, [initializeAuth]);

  useEffect(() => {
    if (!state.isAuthenticated || refreshIntervalRef.current) {
      return;
    }

    refreshIntervalRef.current = setInterval(async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return;
      }

      await refreshAccessToken();
    }, REFRESH_INTERVAL_MS);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [state.isAuthenticated, refreshAccessToken]);

  useEffect(() => {
    if (state.isLoading) return;

    const isAuthRoute = AUTH_ROUTES.some((route) =>
      pathname?.startsWith(route),
    );
    const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
      pathname?.startsWith(prefix),
    );

    if (!state.isAuthenticated && isProtectedRoute) {
      const redirect = encodeURIComponent(pathname || "/");
      router.push(`/login?redirect=${redirect}`);
    }

    if (state.isAuthenticated && isAuthRoute) {
      router.push("/");
    }
  }, [state.isAuthenticated, state.isLoading, pathname, router]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await api.post<TokenResponse>(
        "/api/login/",
        credentials,
        { skipAuth: true },
      );
      setTokens(response.access, response.refresh);

      const user = await fetchCurrentUser();

      if (!mountedRef.current) return;

      setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        isRefreshing: false,
      });

      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "/";
      router.push(redirect);
    },
    [fetchCurrentUser, router],
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/api/logout/");
    } catch (error) {
      console.error("Logout API call failed:", error);
    }

    clearTokens();

    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isRefreshing: false,
    });

    router.push("/login");
  }, [router]);

  const register = useCallback(async (data: RegisterData): Promise<User> => {
    const user = await api.post<User>("/api/register/", data, {
      skipAuth: true,
    });
    return user;
  }, []);

  const refreshUser = useCallback(async () => {
    if (!state.isAuthenticated) return;

    const user = await fetchCurrentUser();
    setState((prev) => ({ ...prev, user }));
  }, [state.isAuthenticated, fetchCurrentUser]);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };

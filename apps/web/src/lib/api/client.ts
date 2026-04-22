const API_BASE_URL =
  typeof window !== "undefined"
    ? "" // Use relative URLs in browser (goes through Next.js rewrite)
    : process.env.NEXT_PUBLIC_API_URL ||
      "https://cliltutors-backend.onrender.com";

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
  skipAuth?: boolean;
  coldStartRetries?: number;
  coldStartTimeout?: number;
}

interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

class ApiClientError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cliltutors_access_token");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cliltutors_refresh_token");
}

function setTokens(accessToken: string, refreshToken?: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("cliltutors_access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("cliltutors_refresh_token", refreshToken);
  }
}

function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cliltutors_access_token");
  localStorage.removeItem("cliltutors_refresh_token");
}

function redirectToLogin(): void {
  if (typeof window === "undefined") return;
  const currentPath = window.location.pathname + window.location.search;
  window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | undefined>,
): string {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

function parseErrorResponse(data: unknown): {
  message: string;
  errors?: Record<string, string[]>;
} {
  if (!data || typeof data !== "object") {
    return { message: "An unexpected error occurred" };
  }

  const errorObj = data as Record<string, unknown>;

  if (typeof errorObj.detail === "string") {
    return { message: errorObj.detail };
  }

  const errors: Record<string, string[]> = {};
  let hasValidationErrors = false;

  for (const [key, value] of Object.entries(errorObj)) {
    if (key === "detail" || key === "message") continue;
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      errors[key] = value;
      hasValidationErrors = true;
    }
  }

  if (hasValidationErrors) {
    return { message: "Validation error", errors };
  }

  if (typeof errorObj.message === "string") {
    return { message: errorObj.message };
  }

  return { message: "An unexpected error occurred" };
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        clearTokens();
        return false;
      }

      const data = await response.json();
      setTokens(data.access, data.refresh);
      return true;
    } catch {
      clearTokens();
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function handleResponse<T>(
  response: Response,
  isRetry = false,
): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (response.status === 401 && !isRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      throw new Error("RETRY_WITH_NEW_TOKEN");
    }
    clearTokens();
    redirectToLogin();
    throw new ApiClientError("Session expired", 401);
  }

  if (response.status === 401) {
    clearTokens();
    redirectToLogin();
  }

  if (!response.ok) {
    const errorData = isJson ? await response.json() : null;
    const { message, errors } = parseErrorResponse(errorData);
    throw new ApiClientError(
      message || `HTTP ${response.status}`,
      response.status,
      errors,
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return isJson ? response.json() : (response.text() as Promise<T>);
}

function createHeaders(
  token: string | null,
  customHeaders?: HeadersInit,
): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function fetchWithColdStartRetry<T>(
  url: string,
  options: ApiOptions,
): Promise<T> {
  const maxRetries = options.coldStartRetries ?? 5;
  const baseTimeout = options.coldStartTimeout ?? 90000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = Math.min(baseTimeout, 60000);
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const token = getAuthToken();
      const headers = createHeaders(token, options.headers);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 503 || response.status === 502) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : getExponentialBackoff(attempt);
        console.log(
          `Backend spinning up (attempt ${attempt + 1}/${maxRetries}). Waiting ${Math.round(delay / 1000)}s...`,
        );
        await sleep(delay);
        continue;
      }

      return await handleResponse<T>(response);
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;

      if (error instanceof Error && error.name === "AbortError") {
        if (isLastAttempt) {
          throw new ApiClientError(
            "Request timeout. Backend may be starting up. Please try again.",
            408,
          );
        }
        const delay = getExponentialBackoff(attempt);
        console.log(
          `Request timeout (attempt ${attempt + 1}/${maxRetries}). Retrying in ${Math.round(delay / 1000)}s...`,
        );
        await sleep(delay);
        continue;
      }

      if (isColdStartError(error)) {
        if (isLastAttempt) {
          throw new ApiClientError(
            "Unable to connect to server. Please check your connection and try again.",
            0,
          );
        }
        const delay = getExponentialBackoff(attempt);
        console.log(
          `Connection error (attempt ${attempt + 1}/${maxRetries}). Retrying in ${Math.round(delay / 1000)}s...`,
        );
        await sleep(delay);
        continue;
      }

      throw error;
    }
  }

  throw new ApiClientError("Max retries exceeded", 0);
}

async function fetchWithAuth<T>(url: string, options: ApiOptions): Promise<T> {
  try {
    return await fetchWithColdStartRetry<T>(url, options);
  } catch (error) {
    if (error instanceof Error && error.message === "RETRY_WITH_NEW_TOKEN") {
      const newToken = getAuthToken();
      const newHeaders = createHeaders(newToken, options.headers);
      return fetchWithColdStartRetry<T>(url, {
        ...options,
        headers: newHeaders,
      });
    }
    throw error;
  }
}

function isColdStartError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError") ||
      error.message.includes("Network request failed")
    );
  }
  if (error instanceof ApiClientError) {
    return (
      error.statusCode === 0 ||
      error.statusCode === 503 ||
      error.statusCode === 502
    );
  }
  return false;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getExponentialBackoff(attempt: number, baseDelay = 2000): number {
  const maxDelay = 60000;
  const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  const jitter = Math.random() * 1000;
  return exponentialDelay + jitter;
}

export async function apiClient<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    params,
    skipAuth,
    coldStartRetries,
    coldStartTimeout,
    ...fetchOptions
  } = options;
  const url = buildUrl(path, params);

  if (skipAuth) {
    const headers = createHeaders(null, options.headers);
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      coldStartRetries,
      coldStartTimeout,
    });
    return handleResponse<T>(response);
  }

  return fetchWithAuth<T>(url, {
    ...fetchOptions,
    coldStartRetries,
    coldStartTimeout,
  });
}

export const api = {
  get: <T>(
    path: string,
    params?: Record<string, string | number | undefined>,
    options?: ApiOptions,
  ) => apiClient<T>(path, { method: "GET", params, ...options }),

  post: <T>(path: string, body?: unknown, options?: ApiOptions) =>
    apiClient<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T>(path: string, body?: unknown, options?: ApiOptions) =>
    apiClient<T>(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T>(path: string, body?: unknown, options?: ApiOptions) =>
    apiClient<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T>(path: string, options?: ApiOptions) =>
    apiClient<T>(path, { method: "DELETE", ...options }),
};

export {
  ApiClientError,
  clearTokens,
  setTokens,
  getAuthToken,
  getRefreshToken,
};
export type { ApiError };

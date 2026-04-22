"use client";

import { Component, ReactNode } from "react";
import { ApiClientError } from "@/lib/api/client";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ApiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("API Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error;
      const isApiError = error instanceof ApiClientError;

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-red-50 rounded-lg">
          <div className="text-red-600 font-semibold text-lg">
            {isApiError && error.statusCode === 401
              ? "Authentication Required"
              : isApiError && error.statusCode === 403
                ? "Access Denied"
                : isApiError && error.statusCode === 404
                  ? "Not Found"
                  : isApiError && error.statusCode === 408
                    ? "Request Timeout"
                    : isApiError && error.statusCode === 501
                      ? "Feature Not Yet Available"
                      : "Something went wrong"}
          </div>
          <p className="text-gray-600 text-sm max-w-md text-center">
            {error?.message || "An unexpected error occurred"}
          </p>
          {isApiError && error.statusCode === 401 && (
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          )}
          {isApiError &&
            (error.statusCode === 408 || error.statusCode === 0) && (
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Retry
              </button>
            )}
        </div>
      );
    }

    return this.props.children;
  }
}

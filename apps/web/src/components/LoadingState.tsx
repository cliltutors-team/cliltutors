"use client";

import { useState, useEffect } from "react";

interface LoadingStateProps {
  retryAttempt?: number;
  maxRetries?: number;
  isRetrying?: boolean;
}

export function LoadingState({
  retryAttempt = 0,
  maxRetries = 5,
  isRetrying = false,
}: LoadingStateProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (isRetrying) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 font-medium">
            Connecting to server{dots}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Attempt {retryAttempt} of {maxRetries}
        </p>
        <p className="text-xs text-gray-400 max-w-md text-center">
          The backend server is starting up. This may take 30-60 seconds on
          first load.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

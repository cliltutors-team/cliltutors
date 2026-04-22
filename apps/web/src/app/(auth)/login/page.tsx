"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { api, setTokens } from "@/src/lib/api/client";

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 533.5 544.3" aria-hidden="true">
      <path
        d="M533.5 278.4c0-18.7-1.7-37.4-5.3-55.5H272.1v105h146.9c-6.3 34.1-25 63-53.2 82.3v68h86.1c50.5-46.5 81.6-115.1 81.6-199.8z"
        fill="#4285F4"
      />
      <path
        d="M272.1 544.3c72.6 0 133.6-23.9 178.1-65.1l-86.1-68c-23.9 16.3-54.5 25.6-92 25.6-70.1 0-129.5-47.2-150.7-110.7H32.6v69.5c45.6 90.5 139.2 148.7 239.5 148.7z"
        fill="#34A853"
      />
      <path
        d="M121.4 326.1c-10.9-34.1-10.9-70.5 0-104.6V152H32.6c-38.7 77.1-38.7 167.9 0 245.1l88.8-71z"
        fill="#FBBC05"
      />
      <path
        d="M272.1 107.6c39.5-.6 77.4 14.3 106.3 41.6l79.2-79.2C408.9 24.3 343.7-1 272.1 0 171.8 0 78.2 58.2 32.6 152l88.8 69.5c21.1-63.5 80.6-110.7 150.7-110.7z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post<{ access: string; refresh: string }>(
        "/api/login/",
        { email, password },
      );

      setTokens(response.access, response.refresh);

      // Redirect to home or the page they were trying to access
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err) {
      setError(t("auth.login.error", "Invalid email or password"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo-ClilTutors.svg"
              alt="ClilTutors"
              width={140}
              height={40}
              priority
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-brand-navy)",
                  }}
                >
                  {t("auth.login.title", "Welcome back")}
                </h1>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-slate-light)" }}
                >
                  {t("auth.login.subtitle", "Sign in to continue learning")}
                </p>
              </div>

              {error && (
                <div
                  className="rounded-lg p-3 text-sm"
                  style={{
                    background: "var(--color-red-50)",
                    color: "var(--color-red-600)",
                    border: "1px solid var(--color-red-200)",
                  }}
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                  style={{ color: "var(--color-brand-navy)" }}
                >
                  {t("auth.login.email", "Email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-10 w-full rounded-lg border px-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderColor: "var(--color-gray-200)",
                    background: "var(--color-gray-50)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                    style={{ color: "var(--color-brand-navy)" }}
                  >
                    {t("auth.login.password", "Password")}
                  </label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                    style={{ color: "var(--color-brand-blue)" }}
                  >
                    {t("auth.login.forgot", "Forgot password?")}
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-10 w-full rounded-lg border px-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderColor: "var(--color-gray-200)",
                    background: "var(--color-gray-50)",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {isLoading
                  ? t("auth.login.signingIn", "Signing in...")
                  : t("auth.login.cta", "Sign in")}
              </button>

              <div className="flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--color-gray-200)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--color-gray-400)" }}
                >
                  {t("auth.login.or", "or")}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--color-gray-200)" }}
                />
              </div>

              <button type="button" className="btn btn-secondary btn-lg w-full">
                <GoogleIcon />
                {t("auth.login.google", "Continue with Google")}
              </button>

              <p
                className="text-center text-sm"
                style={{ color: "var(--color-slate-light)" }}
              >
                {t("auth.login.noAccount", "Don't have an account?")}{" "}
                <Link
                  href="/register"
                  className="font-medium underline underline-offset-4"
                  style={{ color: "var(--color-brand-blue)" }}
                >
                  {t("auth.login.signup", "Sign up")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Brand gradient panel */}
      <div
        className="relative hidden lg:flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-navy, #34354f), var(--color-brand-blue-dark, #486ae0))",
        }}
      >
        <div className="text-center px-12 z-10">
          <div className="text-5xl mb-6">🌍</div>
          <h2
            className="text-white text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", lineHeight: 1.2 }}
          >
            Learning systems for
            <br />
            global performance
          </h2>
          <p className="text-white/70 text-base max-w-md mx-auto">
            Language development, multicultural communication, and cognitive
            learning systems designed for global environments.
          </p>
        </div>
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "#528aed" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-15 blur-2xl"
          style={{ background: "#a67bf4" }}
        />
      </div>
    </div>
  );
}

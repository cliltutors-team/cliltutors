"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { api, setTokens, ApiClientError } from "@/src/lib/api/client";

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

export default function RegisterFormClient({
  initialName,
  initialEmail,
}: {
  initialName?: string;
  initialEmail?: string;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const [name, setName] = useState(initialName ?? "");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("auth.register.passwordMismatch", "Passwords do not match"));
      return;
    }

    if (password.length < 8) {
      setError(
        t(
          "auth.register.passwordTooShort",
          "Password must be at least 8 characters",
        ),
      );
      return;
    }

    setIsLoading(true);

    try {
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ") || "";

      const response = await api.post<{
        user: { id: number; username: string; email: string };
        tokens: { access: string; refresh: string };
        message: string;
      }>("/api/register/", {
        username: email.split("@")[0],
        email,
        password,
        password_confirm: confirmPassword,
        first_name: firstName,
        last_name: lastName,
      });

      setTokens(response.tokens.access, response.tokens.refresh);
      router.push("/");
    } catch (err) {
      if (err instanceof ApiClientError && err.errors) {
        const errorMessages = Object.entries(err.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("; ");
        setError(errorMessages);
      } else if (err instanceof ApiClientError) {
        setError(
          err.message ||
            t("auth.register.error", "Registration failed. Please try again."),
        );
      } else {
        setError(
          t("auth.register.error", "Registration failed. Please try again."),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-3xl font-bold">{t("auth.register.title")}</h1>
        <p className="text-sm text-gray-500">{t("auth.register.subtitle")}</p>
      </div>

      {error && (
        <div className="rounded-lg p-3 text-sm bg-red-50 text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <div className="relative">
        <User
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("authCard.placeholders.name", "Full name")}
          required
          disabled={isLoading}
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      <div className="relative">
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("authCard.placeholders.email", "Email")}
          required
          disabled={isLoading}
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t(
            "auth.register.password",
            "Password (min 8 characters)",
          )}
          required
          minLength={8}
          disabled={isLoading}
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t("auth.register.confirmPassword", "Confirm password")}
          required
          disabled={isLoading}
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-4 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading
          ? t("auth.register.creating", "Creating account...")
          : t("auth.register.cta", "Create account")}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">
          {t("auth.register.or", "or")}
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium hover:bg-gray-50"
      >
        <GoogleIcon />
        {t("auth.register.google", "Continue with Google")}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t("auth.register.haveAccount", "Already have an account?")}{" "}
        <Link href="/login" className="underline underline-offset-4">
          {t("auth.register.login", "Sign in")}
        </Link>
      </p>
    </form>
  );
}

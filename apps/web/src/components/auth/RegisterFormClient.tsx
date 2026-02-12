"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { User, Mail, Lock } from "lucide-react";

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

  const [name, setName] = useState(initialName ?? "");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("REGISTER:", { name, email, password });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-3xl font-bold">{t("auth.register.title")}</h1>
        <p className="text-sm text-gray-500">{t("auth.register.subtitle")}</p>
      </div>

      <div className="relative">
        <User
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("authCard.placeholders.name")}
          required
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
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
          placeholder={t("authCard.placeholders.email")}
          required
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
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
          placeholder={t("auth.register.password")}
          required
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-black px-4 text-sm font-medium text-white hover:opacity-90"
      >
        {t("auth.register.cta")}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">{t("auth.register.or")}</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium hover:bg-gray-50"
      >
        <GoogleIcon />
        {t("auth.register.google")}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t("auth.register.haveAccount")}{" "}
        <Link href="/login" className="underline underline-offset-4">
          {t("auth.register.login")}
        </Link>
      </p>
    </form>
  );
}

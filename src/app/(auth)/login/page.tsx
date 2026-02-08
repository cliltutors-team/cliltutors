import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { getServerLocale } from "@/src/lib/locale";
import { createT } from "@/src/lib/i18n/server";
import { createMetadataForPage } from "@/src/lib/i18n/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadataForPage("login");
}

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

function LoginForm({ t }: { t: (k: string, fb?: string) => string }) {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-3xl font-bold">{t("auth.login.title")}</h1>
        <p className="text-sm text-gray-500">{t("auth.login.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          {t("auth.login.email")}
        </label>
        <input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <label htmlFor="password" className="text-sm font-medium">
            {t("auth.login.password")}
          </label>
          <a
            href="#"
            className="ml-auto text-sm text-gray-600 underline-offset-4 hover:underline"
          >
            {t("auth.login.forgot")}
          </a>
        </div>

        <input
          id="password"
          type="password"
          required
          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>

      <button
        type="submit"
        className="bg-vitality inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
      >
        {t("auth.login.cta")}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">{t("auth.login.or")}</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium hover:bg-gray-50 cursor-pointer"
      >
        <GoogleIcon />
        {t("auth.login.google")}
      </button>

      <p className="text-center text-sm text-gray-600">
        {t("auth.login.noAccount")}{" "}
        <Link href="/register" className="underline underline-offset-4">
          {t("auth.login.signup")}
        </Link>
      </p>
    </form>
  );
}

export default async function LoginPage() {
  const locale = await getServerLocale();
  const t = await createT(locale);

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
          <div className="w-full max-w-xs">
            <LoginForm t={t} />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-gray-100 lg:block">
        <Image
          src="/placeholder.svg"
          alt={t("auth.login.imageAlt")}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

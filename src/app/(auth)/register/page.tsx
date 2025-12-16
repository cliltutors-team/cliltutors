import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createMetadataForPage } from "@/src/lib/i18n/metadata";
import RegisterFormClient from "@/src/components/auth/RegisterFormClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadataForPage("register");
}

type SearchParams = Record<string, string | string[] | undefined>;

export default async function RegisterPage({
  searchParams,
}: {
  // ✅ Next 15 puede tipar esto como Promise en algunos setups
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const sp = await Promise.resolve(searchParams);

  const initialNameRaw = sp?.name;
  const initialEmailRaw = sp?.email;

  const initialName =
    typeof initialNameRaw === "string"
      ? initialNameRaw
      : Array.isArray(initialNameRaw)
      ? initialNameRaw[0] ?? ""
      : "";

  const initialEmail =
    typeof initialEmailRaw === "string"
      ? initialEmailRaw
      : Array.isArray(initialEmailRaw)
      ? initialEmailRaw[0] ?? ""
      : "";

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
            <RegisterFormClient
              initialName={decodeURIComponent(initialName)}
              initialEmail={decodeURIComponent(initialEmail)}
            />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-gray-100 lg:block">
        <Image
          src="/placeholder.svg"
          alt="Cliltutors register"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createMetadataForPage } from "@/src/lib/i18n/metadata";

import RegisterFormClient from "@/src/components/auth/RegisterFormClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadataForPage("register");
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: { name?: string; email?: string };
}) {
  const initialName =
    typeof searchParams?.name === "string" ? searchParams.name : "";
  const initialEmail =
    typeof searchParams?.email === "string" ? searchParams.email : "";

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
              initialName={initialName}
              initialEmail={initialEmail}
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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pickLocale, DEFAULT_LOCALE } from "@/src/lib/getMeta";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const cookies = req.cookies.get("locale")?.value;

  if (!cookies) {
    const accept = req.headers.get("accept-language") || "";
    const locale = pickLocale(accept) || DEFAULT_LOCALE;

    res.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 año
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

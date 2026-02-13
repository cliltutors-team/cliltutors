// src/app/actions.ts
"use server";

import { cookies } from "next/headers";

// Definimos la acción de servidor para establecer el idioma
export async function setLocaleCookie(locale: string) {
  // 🚨 CORRECCIÓN: Aplicar 'await' a cookies() para obtener el objeto mutable.
  const cookieStore = await cookies();

  // 1. Establecer la cookie de idioma que lee el Server Component
  cookieStore.set("locale", locale, {
    // Ya no sale el error porque cookieStore tiene .set()
    path: "/",
    maxAge: 365 * 24 * 60 * 60, // 1 año
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

"use client";

import { useTranslation } from "react-i18next";
import Hero from "../components/hero";
import Testimonials from "@/src/components/Testimonials";

export default function HomePage() {
  // ❗ i18n ya maneja fallback internamente. No bloquees el render.
  useTranslation();

  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
}

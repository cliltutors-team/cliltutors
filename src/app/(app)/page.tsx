"use client";

import { useTranslation } from "react-i18next";
import Hero from "../../components/hero";
import Testimonials from "@/src/components/Testimonials";
import Login from "../../components/Login";
import TeamSection from "../../components/TeamSection";

export default function HomePage() {
  // ❗ i18n ya maneja fallback internamente. No bloquees el render.
  useTranslation();

  return (
    <>
      <Hero />
      <Login />
      <TeamSection />
      <Testimonials />
    </>
  );
}

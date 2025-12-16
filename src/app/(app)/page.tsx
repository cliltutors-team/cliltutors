"use client";

import { useTranslation } from "react-i18next";
import Hero from "../../components/hero";
import Testimonials from "@/src/components/Testimonials";
import Services from "../../components/services";
import PlanSection from "../../components/PlanSection";
import About from "../../components/about";
import Login from "../../components/Login";
import TeamSection from "../../components/TeamSection";

export default function HomePage() {
  // ❗ i18n ya maneja fallback internamente. No bloquees el render.
  useTranslation();

  return (
    <>
      <Hero />
      <Services />
      <Login />
      <TeamSection />
      <Testimonials />
      <PlanSection />
    </>
  );
}

"use client";

import { useTranslation, Trans } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="w-full">
      <div
        className="
          mx-auto w-full max-w-[1100px]
          px-4 sm:px-6 md:px-10 lg:px-16
          pt-20 sm:pt-24 md:pt-28
          pb-14 sm:pb-16
          text-center
        "
      >
        {/* Eyebrow */}
        <div className="mb-6 flex justify-center">
          <span
            className="
            rounded-full
            border border-[#34354f]/10
            px-4 py-2
            text-xs sm:text-sm
            font-semibold
            text-[#34354f]
          "
          >
            Idiomas + STEM • Aprendizaje práctico
          </span>
        </div>

        {/* TÍTULO */}
        <h1
          className="
            mx-auto max-w-4xl
            text-[#34354f] font-semibold
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            leading-[1.08] sm:leading-[1.05]
            tracking-[-0.02em]
          "
        >
          {t("hero.title")}
        </h1>

        {/* DESCRIPCIÓN */}
        <p
          className="
            mx-auto mt-6 max-w-2xl
            text-[#202020]/80
            font-poppins
            text-base sm:text-lg md:text-xl
            leading-relaxed
          "
        >
          <Trans
            i18nKey="hero.description"
            components={{
              b: <strong className="font-semibold text-[#202020]" />,
            }}
          />
        </p>

        {/* Separador sutil */}
        <div className="mx-auto mt-10 h-px w-24 bg-[#34354f]/10" />
      </div>
    </section>
  );
}

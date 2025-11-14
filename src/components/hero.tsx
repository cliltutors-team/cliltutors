"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative w-full
        mt-12 md:mt-16
        flex items-center justify-center overflow-hidden
      "
    >
      {/* 👉 mismo padding lateral que el Header */}
      <div
        className="
          relative z-10
          flex flex-col md:flex-row items-center justify-between gap-5
          w-full max-w-[1600px] mx-auto
          px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[260px]
        "
      >
        {/* COLUMNA DE TEXTO */}
        <div className="flex flex-col items-start justify-center text-left flex-1">
          {/* TÍTULO – sin aplastarse */}
          <h1
            className="text-[#34354f] text-4xl md:text-6xl font-bold"
            style={{
              letterSpacing: "0.012em",
              lineHeight: "1.05",
              marginBottom: "90px",
            }}
          >
            Método <br />
            <span className="text-[#34354f]">simples, humano</span> <br />e
            eficaz.
          </h1>

          {/* SOLO EL PÁRRAFO ES MÁS ANGOSTO */}
          <div className="max-w-[340px] md:max-w-[320px]">
            <p
              className="text-[#202020] text-lg mb-8 font-poppins"
              style={{
                letterSpacing: "-0.003em",
                lineHeight: "1.21",
              }}
            >
              Aprenda o que vai te impulsionar com aulas ao vivo, professores
              nativos e o <span className="font-bold">método CLIL.</span>
            </p>
          </div>

          {/* BOTÓN VERDE */}
          <Link href="/contact">
            <button
              className="
      bg-[#36DE6B] hover:bg-[#27b956] text-white font-poppins font-semibold
      flex items-center gap-3 transition-all shadow-md
      rounded-full text-left leading-tight cursor-pointer
    "
              style={{
                width: "245px",
                height: "65px",
                paddingLeft: "18px",
                paddingRight: "18px",
              }}
            >
              {/* Círculo blanco con flecha */}
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <ArrowRight size={20} stroke="#36DE6B" strokeWidth={3} />
              </span>

              {/* Texto en dos líneas naturales */}
              <span
                className="text-xl"
                style={{
                  lineHeight: "0.98",
                }}
              >
                Agende sua <br /> aula gratuita
              </span>
            </button>
          </Link>
        </div>

        {/* IMAGEN */}
        <div className="relative w-full md:w-[50%] flex justify-center items-center">
          <Image
            src="/images/Girl-hero.svg"
            alt="Aluna estudando com tablet"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

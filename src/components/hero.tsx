"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative w-full
        mt-16 md:mt-24
        flex items-center justify-center
        overflow-hidden pb-14
      "
    >
      {/* 👉 mismo padding lateral que el Header */}
      <div
        className="
          relative z-10
          flex flex-col md:flex-row items-center justify-between 
          gap-10 md:gap-5
          w-full max-w-[1600px] mx-auto 
          px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[260px]
        "
      >
        {/* COLUMNA DE TEXTO */}
        <div className="flex flex-col items-start justify-center text-left flex-1 w-full">
          <h1
            className="text-[#34354f] font-bold
              text-4xl sm:text-5xl md:text-6xl
            "
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

          {/* PÁRRAFO ANGOSTO */}
          <div className="max-w-[340px] md:max-w-[320px] w-full">
            <p
              className="text-[#202020] text-base sm:text-lg mb-8 font-poppins"
              style={{
                letterSpacing: "-0.003em",
                lineHeight: "1.21",
              }}
            >
              Aprenda o que vai te impulsionar com aulas ao vivo, professores
              nativos e o <span className="font-bold">método CLIL.</span>
            </p>
          </div>

          {/* BOTÓN + SELLO - RESPONSIVE */}
          <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
            {/* BOTÓN VERDE */}
            <Link href="/contact">
              <button
                className="
                  bg-[#36DE6B] hover:bg-[#27b956] text-white font-poppins font-semibold
                  flex items-center gap-3 transition-all shadow-md
                  rounded-full leading-tight cursor-pointer
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

                {/* Texto en dos líneas */}
                <span
                  className="flex flex-col text-left leading-tight text-lg sm:text-xl"
                  style={{ lineHeight: "1.05" }}
                >
                  Agende sua
                  <br />
                  aula gratuita
                </span>
              </button>
            </Link>

            {/* 🔵 SELLO CIRCULAR RESPONSIVE */}
            <div className="relative flex items-center justify-center select-none mx-auto sm:mx-0">
              <svg
                width="105"
                height="105"
                viewBox="0 0 200 200"
                className="
                  text-[#34354f] 
                  select-none 
                  animate-spin 
                  [animation-duration:16s]
                "
                style={{ userSelect: "none" }}
              >
                <defs>
                  <path
                    id="circlePathSmall"
                    d="
                      M 100, 100
                      m -75, 0
                      a 75, 75 0 1, 1 150, 0
                      a 75, 75 0 1, 1 -150, 0
                    "
                  />
                </defs>

                <text
                  fontSize="15"
                  fontFamily="Poppins"
                  fontWeight="700"
                  fill="#34354f"
                  letterSpacing="1.5"
                >
                  <textPath
                    href="#circlePathSmall"
                    startOffset="0"
                    textLength="480"
                  >
                    100% AO VIVO · ENCONTROS 100% AO VIVO · ENCONTROS
                  </textPath>
                </text>
              </svg>

              {/* Ícono central */}
              <div className="absolute w-10 h-10 flex items-center justify-center">
                <Image
                  src="/images/icon_hero.svg"
                  alt="Video icon"
                  width={40}
                  height={40}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* IMAGEN — full responsive */}
        <div
          className="hidden md:flex relative w-full justify-center items-center"
          style={{ width: "47%" }}
        >
          <Image
            src="/images/Girl-hero.svg"
            alt="Aluna estudando com tablet"
            width={600}
            height={600}
            className="object-contain w-full select-none"
            priority
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}

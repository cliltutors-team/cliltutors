"use client";
import { useTranslation } from "react-i18next";

import Image from "next/image";

const services = [
  {
    title: "Mentoria em Ciências e Exatas (STEM)",
    description:
      "Professores especializados em Matemática, Física, Química e Biologia que tornam o aprendizado mais leve e eficiente.",
    img: "/images/first_sec.webp",
    bg: "bg-[#FDD122]", // Amarillo
  },
  {
    title: "Idiomas com o Método CLIL",
    description:
      "Aprenda inglês, espanhol ou português enquanto explora temas reais — tecnologia, viagens, negócios ou cultura.",
    img: "/images/second_sec.webp",
    bg: "bg-[#36DE6B]", // Verde
  },
  {
    title: "Coaching Profissional",
    description:
      "Encontros que ajudam você a construir um plano claro e motivador para o futuro.",
    img: "/images/third_sec.webp",
    bg: "bg-[#E55B78]", // Rosado
    tag: "NOVO",
  },
];

export default function Services() {
  const { t } = useTranslation();
  return (
    <section className="w-full py-16 flex flex-col items-center max-w-[1600px] mx-auto">
      {/* Título */}
      <div className="text-center max-w-[1000px] mx-auto px-4">
        <h2 className="text-[56px] font-bold text-[#2D2D2D] mb-1">
          {t("services.title")}
        </h2>
        <p
          className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
          style={{ lineHeight: "1.1" }}
        >
          {t("services.description")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl w-full px-4">
        {services.map((item, i) => (
          <div key={i} className="flex flex-col items-center relative">
            {/* CÍRCULO DECORATIVO — Primera card */}`
            {i === 0 && (
              <Image
                src="/images/clil_circle.webp"
                alt="Decor circle"
                width={220}
                height={220}
                className="hidden md:block absolute -left-16 top-40 z-[-1] rotate-45"
              />
            )}
            {/* CÍRCULO DECORATIVO — Tercera card */}
            {i === 2 && (
              <Image
                src="/images/clil_circle.webp"
                alt="Decor circle"
                width={150}
                height={150}
                className="hidden md:block absolute -right-10 -top-10 z-[-1] rotate-45"
              />
            )}
            {/* Card */}
            <div
              className={`${item.bg} rounded-[40px] px-6 pt-6 pb-0 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 justify-between relative h-auto lg:h-[455px] lg:w-[310px]`}
            >
              {item.tag && (
                <span className="absolute top-4 right-4 text-[#36de6b] font-bold text-sm px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              )}

              <h3 className="font-poppins text-xl text-white text-center mt-1 leading-tight max-w-[210px] mx-auto">
                {item.title}
              </h3>

              {/* Badges — SOLO segunda card */}
              {item.title === "Idiomas com o Método CLIL" && (
                <>
                  <span
                    className="font-poppins absolute left-4 bottom-35 rounded-full px-4 py-1.5 text-xs font-bold"
                    style={{ backgroundColor: "#4df181", color: "#54577c" }}
                  >
                    PORTUGUÊS
                  </span>

                  <span
                    className="font-poppins absolute right-7 bottom-55 rounded-full px-4 py-1.5 text-xs font-bold"
                    style={{ backgroundColor: "#fdb81b", color: "#e55b78" }}
                  >
                    ESPANHOL
                  </span>

                  <span
                    className="font-poppins absolute right-6 bottom-18 rounded-full px-4 py-1.5 text-xs font-bold"
                    style={{ backgroundColor: "#e55b78", color: "#fafaff" }}
                  >
                    INGLÊS
                  </span>
                </>
              )}

              <div className="mt-auto flex items-end justify-center h-[340px]">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={250}
                  height={340}
                  className="object-contain object-bottom"
                  priority
                  quality={100}
                />
              </div>
            </div>
            <p
              className="text-gray-700 text-center mt-4 text-sm leading-relaxed max-w-[260px]"
              style={{ lineHeight: "1.18" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Botón */}
      <button className="mt-12 bg-[#FDD122] text-[#34354f] px-10 py-4 text-lg font-poppins font-semibold rounded-full transition hover:scale-105 cursor-pointer">
        Comece a aprender
      </button>
    </section>
  );
}

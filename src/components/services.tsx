"use client";

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
  return (
    <section className="w-full py-16 flex flex-col items-center max-w-[1600px] mx-auto">
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2D2D2D] mb-4">
          Comece pela sua necessidade
        </h2>
        <p className="text-gray-600">
          Cada pessoa aprende de um jeito. Por isso, oferecemos aulas e
          mentorias feitas sob medida para o que você precisa agora — seja
          dominar um idioma, reforçar matérias de exatas ou desenvolver novas
          habilidades profissionais.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl w-full px-4">
        {services.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
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

              {/* Contenedor de la imagen con altura fija */}
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

            {/* Descripción debajo */}
            <p
              className="text-gray-700 text-center mt-4 text-sm leading-relaxed max-w-[260px]"
              style={{
                lineHeight: "1.18",
              }}
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

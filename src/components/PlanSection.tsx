import React from "react";

export default function PlanSection() {
  const plans = [
    {
      name: "Plan Básico",
      color: "#E45876",
      lessons: "4 aulas/mês",
      monthly: "R$ 220,00 mensal",
      semester: "R$ 1320,00 semestral",
      description: "Ideal para manter o idiomaativo com regularidade",
    },
    {
      name: "Plan Semi-Intensivo",
      color: "#FDB81B",
      lessons: "8 aulas/mês",
      monthly: "R$ 440,00 mensal",
      semester: "R$ 2640,00 semestral",
      description: "Evolução consistente com foco em conversação",
    },
    {
      name: "Plan Intensivo",
      color: "#36DE6B",
      lessons: "16 aulas/mês",
      monthly: "R$ 700,00 mensal",
      semester: "R$ 4200,00 semestral",
      description: "Fluência acelerada para metas profissionais ou exames",
    },
  ];

  return (
    <section
      className="relative w-screen bg-[#FBFAFF] py-20 px-6 flex flex-col items-center text-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg_difuminado.webp')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 1,
      }}
    >
      {/* Overlay translúcido blanco para suavizar el degradado */}
      <div className="absolute inset-0 bg-[#FBFAFF]/10 pointer-events-none"></div>

      {/* Contenido */}
      <div className="relative z-10 w-full">
        {/* Título y descripción */}
        <p className="text-xl md:text-1xl font-montserrat-alt text-[#E45876] mb-2 font-semibold">
          PLANOS ALUNOS INDIVIDUAIS
        </p>
        <h2 className="text-4xl md:text-5xl font-subjectivity text-[#444665] mb-6 font-semibold">
          Comece hoje. Conheça nossos planos.
        </h2>
        <p className="md:text-sm font-montserrat-alt text-[#444665] mb-16">
          Oferecemos planos acessíveis e personalizados para quem busca
          desenvolver <br />
          fluência prática com aulas ao vivo e acompanhamento contínuo.
        </p>

        {/* Tarjetas de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white border rounded-4xl px-8 py-6 text-left min-h-[310px] shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ borderColor: `${plan.color}20` }}
            >
              <button
                className="font-subjectivity w-64 text-[#444665] py-3 rounded-4xl transition-colors font-inter font-bold text-lg mb-8 text-left px-6 hover:opacity-90"
                style={{ backgroundColor: plan.color }}
              >
                {plan.name}
              </button>

              <div className="flex items-start mb-2 text-xl">
                <span
                  className="text-[#444665] mr-2 text-4xl"
                  style={{ lineHeight: "0.8" }}
                >
                  •
                </span>
                <p className="font-inter text-[#444665] font-semibold">
                  {plan.lessons}
                </p>
              </div>

              <div className="flex items-start mb-2 text-xl">
                <span
                  className="text-[#444665] mr-2 text-4xl"
                  style={{ lineHeight: "0.8" }}
                >
                  •
                </span>
                <div>
                  <p className="font-inter text-[#444665] font-semibold">
                    {plan.monthly}
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-2 text-xl">
                <span
                  className="text-[#444665] mr-2 text-4xl"
                  style={{ lineHeight: "0.8" }}
                >
                  •
                </span>
                <div>
                  <p className="font-inter text-[#444665] font-semibold">
                    {plan.semester}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-300">
                <p className="font-inter text-gray-500 text-sm">
                  {plan.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Textos informativos debajo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto text-center">
          {/* Izquierda */}
          <div className="text-center text-sm">
            <p className="font-inter text-[#444665]">
              Turmas com até 4 alunos <br />
              ou opção VIP individual
            </p>
          </div>

          {/* Centro */}
          <div className="text-center text-sm">
            <p className="font-inter text-[#444665]">
              Plataforma Google Workspace for Education <br />
              Organização via Google Classroom
            </p>
          </div>

          {/* Derecha */}
          <div className="text-center text-sm">
            <p className="font-inter text-[#444665]">
              5% de desconto via Pix <br />
              ou transferência
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  country: string;
  countryCode: string;
  languageTag: "Español" | "Inglés" | "Portugués";
}

export default function TeamSection() {
  const [showAll, setShowAll] = useState(false);

  const team: TeamMember[] = useMemo(
    () => [
      {
        id: 1,
        name: "Cristian Ramirez",
        role: "Tutor Multidisciplinario",
        description:
          "Soy un Cliltutor apasionado por la educación. Enseño ciencias, matemáticas e idiomas con un enfoque práctico. Certificado en CLIL y TEFL/TESOL. ¡Aprende en contexto y sin complicaciones!",
        image: "/images/Cristian.png",
        country: "Colombia",
        countryCode: "co",
        languageTag: "Español",
      },
      {
        id: 2,
        name: "Laura Gómez",
        role: "Profesora de Portugués",
        description:
          "¡Hola! Soy profesora de portugués para extranjeros en cliltutors. Con amplia experiencia en pedagogía, utilizo un enfoque dinámico que integra escucha, escritura, lectura y conversación.",
        image: "/images/Laura.png",
        country: "Brasil",
        countryCode: "br",
        languageTag: "Portugués",
      },
      {
        id: 3,
        name: "Alissa Lechleitner",
        role: "Profesora de Inglés",
        description:
          "¡Hola! Soy profesora nativa de inglés de Estados Unidos en cliltutors. Con amabilidad y profesionalismo, te ayudaré a aprender con confianza y fluidez en clases dinámicas y cercanas.",
        image: "/images/Alissa.png",
        country: "Estados Unidos",
        countryCode: "us",
        languageTag: "Inglés",
      },
      {
        id: 4,
        name: "Thayline Candatti",
        role: "Profesora de Portugués",
        description:
          "¡Hola! Profesora de portugués en cliltutors. Amo la música, la diversión y los juegos, y los incluyo en mis clases para que aprendas de forma ligera y entretenida.",
        image: "/images/Thayline.png",
        country: "Brasil",
        countryCode: "br",
        languageTag: "Portugués",
      },
      {
        id: 5,
        name: "Jimmy Ramirez",
        role: "Tutor de Español",
        description:
          "¡Qué coincidencia verte aquí! Soy tutor en Cliltutors y creo que aprender nos hace crecer. He enseñado matemáticas y ahora ayudo adultos a aprender español.",
        image: "/images/Jimmy.png",
        country: "Colombia",
        countryCode: "co",
        languageTag: "Español",
      },
      {
        id: 6,
        name: "Xiomara Ramírez",
        role: "Profesora de Español",
        description:
          "¡Hola! Soy profesora de español en cliltutors. Mis clases son dinámicas, alegres y llenas de conversación, porque creo que aprender un idioma es también hacer amigos en el camino.",
        image: "/images/Xiomara.png",
        country: "Colombia",
        countryCode: "co",
        languageTag: "Español",
      },
    ],
    []
  );

  const displayedTeam = showAll ? team : team.slice(0, 4);

  const getFlagUrl = (countryCode: string) =>
    `https://flagcdn.com/w40/${countryCode}.png`;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-vitality bg-vitality/10 font-montserrat">
              Nuestro equipo
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-deep mb-4 font-montserrat">
            Aprende de nuestros expertos
          </h2>

          <p className="text-lg text-deep/70 max-w-2xl mx-auto font-montserrat-alt">
            Conoce a nuestro equipo de profesionales con años de experiencia en
            la industria.
          </p>
        </div>

        {/* GRID */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
          style={{ gridAutoRows: "1fr" }}
        >
          {displayedTeam.map((member) => (
            <div key={member.id} className="h-full">
              {/* CARD */}
              <div className="h-full flex flex-col rounded-2xl p-6 bg-white border border-gray-200">
                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border border-human/30">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      {/* Name + flag */}
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-deep font-montserrat-alt">
                          {member.name}
                        </h3>

                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
                            <img
                              src={getFlagUrl(member.countryCode)}
                              alt={member.country}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-human font-medium">
                            {member.country}
                          </span>
                        </div>
                      </div>

                      <p className="text-vitality text-sm font-medium mt-1">
                        {member.role}
                      </p>

                      <p className="mt-4 text-deep/70 text-sm leading-relaxed font-montserrat-alt">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-auto pt-5">
                  <span className="inline-block text-xs px-3 py-1.5 rounded-full border bg-vitality/10 text-vitality border-vitality/20 font-medium">
                    {member.languageTag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-8 py-3 rounded-full border-2 border-vitality text-vitality bg-white font-semibold text-sm hover:bg-vitality/10 transition-colors"
          >
            {showAll ? "Ver menos" : "Ver más expertos"}
          </button>
        </div>
      </div>
    </section>
  );
}

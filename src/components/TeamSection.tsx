'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  country: string;
  countryCode: string;
}

export default function TeamSection() {
  const [showAll, setShowAll] = useState(false);

  const initialTeam: TeamMember[] = [
    {
      id: 1,
      name: "Cristian Ramirez",
      role: "Tutor Multidisciplinario",
      description: "Soy un Cliltutor apasionado por la educación. Enseño ciencias, matemáticas e idiomas con un enfoque práctico. Certificado en CLIL y TEFL/TESOL. ¡Aprende en contexto y sin complicaciones!",
      image: "/images/Cristian.png",
      country: "Colombia",
      countryCode: "co"
    },
    {
      id: 2,
      name: "Laura Gómez",
      role: "Profesora de Portugués",
      description: "¡Hola! Soy profesora de portugués para extranjeros en cliltutors. Con amplia experiencia en pedagogía, utilizo un enfoque dinámico que integra escucha, escritura, lectura y conversación.",
      image: "/images/Laura.png",
      country: "Brasil",
      countryCode: "br"
    },
    {
      id: 3,
      name: "Alissa Lechleitner",
      role: "Profesora de Inglés",
      description: "¡Hola! Soy profesora nativa de inglés de Estados Unidos en cliltutors. Con amabilidad y profesionalismo, te ayudaré a aprender con confianza y fluidez en clases dinámicas y cercanas.",
      image: "/images/Alissa.png",
      country: "Estados Unidos",
      countryCode: "us"
    },
    {
      id: 4,
      name: "Thayline Candatti",
      role: "Profesora de Portugués",
      description: "¡Hola! Profesora de portugués en cliltutors. Amo la música, la diversión y los juegos, y los incluyo en mis clases para que aprendas de forma ligera y entretenida.",
      image: "/images/Thayline.png",
      country: "Brasil",
      countryCode: "br"
    },
    {
      id: 5,
      name: "Jimmy Ramirez",
      role: "Tutor de Español",
      description: "¡Qué coincidencia verte aquí! Soy tutor en Cliltutors y creo que aprender nos hace crecer. He enseñado matemáticas y ahora ayudo adultos a aprender español.",
      image: "/images/Jimmy.png",
      country: "Colombia",
      countryCode: "co"
    },
    {
      id: 6,
      name: "Xiomara Ramírez",
      role: "Profesora de Español",
      description: "¡Hola! Soy profesora de español en cliltutors. Mis clases son dinámicas, alegres y llenas de conversación, porque creo que aprender un idioma es también hacer amigos en el camino.",
      image: "/images/Xiomara.png",
      country: "Colombia",
      countryCode: "co"
    },
  ];

  const displayedTeam = showAll ? initialTeam : initialTeam.slice(0, 4);

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w40/${countryCode}.png`;
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
        <p className="text-vitality font-mono text-sm mb-2 font-montserrat">
            Nuestro equipo
        </p>
        
        <h2 className="text-4xl md:text-5xl font-bold text-deep mb-4 font-montserrat">
            Aprende de nuestros expertos
        </h2>
        
        {/* Cambiamos el p por un h3 y ajustamos el estilo */}
        <h3 className="text-2xl md:text-3xl font-semibold text-deep max-w-2xl mx-auto font-montserrat">
            Conoce a nuestro equipo de profesionales con años de experiencia en la industria.
        </h3>
        </div>

        {/* Grid de tutores con nuevo diseño claro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {displayedTeam.map((member) => (
            <div 
              key={member.id}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:duration-300"
            >
              {/* Card principal con fondo claro */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 
                           group-hover:border-vitality/30 group-hover:shadow-2xl group-hover:shadow-vitality/10
                           transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-vitality/5 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative flex flex-col md:flex-row gap-6 z-10">
                  {/* Avatar con imagen real */}
                  <div className="shrink-0">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-white 
                                 shadow-lg group-hover:border-vitality/50 group-hover:shadow-vitality/30
                                 transition-all duration-500">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="96px"
                      />
                      {/* Overlay sutil */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    </div>
                  </div>

                  {/* Información */}
                  <div className="flex-1">
                    {/* Nombre y bandera */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-vitality 
                                    transition-colors duration-300 font-montserrat-alt">
                          {member.name}
                        </h3>
                        <p className="text-vitality text-sm font-medium mt-1">
                          {member.role}
                        </p>
                      </div>
                      
                      {/* Bandera del país */}
                      <div className="flex flex-col items-end">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 
                                     group-hover:border-vitality/50 flex items-center justify-center
                                     transition-all duration-300 shadow-sm">
                          <img
                            src={getFlagUrl(member.countryCode)}
                            alt={`Bandera de ${member.country}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-vitality">${member.countryCode.toUpperCase()}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="mt-1 text-xs text-gray-500 font-medium">
                          {member.country}
                        </span>
                      </div>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 font-montserrat-alt">
                      {member.description}
                    </p>

                    {/* Tags de idioma */}
                    <div className="flex flex-wrap gap-2">
                      {member.countryCode === 'co' && (
                        <span className="text-xs bg-vitality/15 text-vitality px-3 py-1.5 rounded-full 
                                      font-medium border border-vitality/20 group-hover:bg-vitality/25
                                      transition-all duration-300">
                          Español
                        </span>
                      )}
                      {member.countryCode === 'us' && (
                        <span className="text-xs bg-vitality/15 text-vitality px-3 py-1.5 rounded-full 
                                      font-medium border border-vitality/20 group-hover:bg-vitality/25
                                      transition-all duration-300">
                          Inglés
                        </span>
                      )}
                      {member.countryCode === 'br' && (
                        <span className="text-xs bg-vitality/15 text-vitality px-3 py-1.5 rounded-full 
                                      font-medium border border-vitality/20 group-hover:bg-vitality/25
                                      transition-all duration-300">
                          Portugués
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Efecto de borde animado en hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                             group-hover:border-vitality/20 pointer-events-none transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver más" */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="relative overflow-hidden bg-white text-vitality px-8 py-3.5 rounded-full 
                     border-2 border-vitality font-medium text-sm whitespace-nowrap
                     hover:text-white hover:shadow-xl hover:shadow-vitality/20
                     transition-all duration-300 group"
          >
            <span className="relative z-10">
              {showAll ? 'Ver menos' : 'Ver más expertos'}
            </span>
            <div className="absolute inset-0 bg-vitality transform scale-x-0 group-hover:scale-x-100 
                         origin-left transition-transform duration-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
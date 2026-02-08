"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, GraduationCap, Users } from "lucide-react";

export default function About() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showMobileControls, setShowMobileControls] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMobileTap = () => {
    setShowMobileControls(true);
    setTimeout(() => setShowMobileControls(false), 3000);
  };

  return (
    <section className="relative w-full mt-10 md:mt-14 overflow-hidden py-10 sm:py-12 md:py-16 flex justify-center">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[260px]">
        {/* ENCABEZADO */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 md:mb-8">
          <span className="text-[#34354f] text-base sm:text-lg md:text-xl font-normal">
            Sobre a
          </span>
          <Image
            src="/Logo-ClilTutors.svg"
            alt="Cliltutors logo"
            width={140}
            height={40}
            priority
            quality={100}
            className="select-none w-[100px] sm:w-[130px] md:w-[140px] h-auto"
          />
        </div>

        {/* VIDEO + TEXTO SOBRE EL VIDEO */}
        <div className="relative w-full aspect-video md:aspect-16/8">
          <div
            className="
              relative w-full h-full
              rounded-3xl overflow-hidden shadow-lg
              group
            "
            onClick={handleMobileTap}
          >
            {/* VIDEO */}
            <video
              ref={videoRef}
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="
                absolute inset-0 w-full h-full
                object-cover
                scale-[1.05] sm:scale-[1.08] md:scale-[1.15]
                origin-center
                will-change-transform
              "
            />

            {/* BOTÓN PLAY/PAUSE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className={`
                absolute inset-0 flex items-center justify-center
                cursor-pointer transition-opacity duration-300 ease-in-out

                md:opacity-0 md:group-hover:opacity-100
                ${showMobileControls ? "opacity-100" : "opacity-0 md:opacity-0"}
              `}
            >
              <div
                className="
                  bg-white/90 backdrop-blur-md
                  rounded-full shadow-lg
                  p-3 sm:p-4 md:p-5
                  flex items-center justify-center
                "
              >
                {isPlaying ? (
                  <Pause
                    size={24}
                    className="sm:w-7 sm:h-7 text-[#54577f]"
                    strokeWidth={3}
                  />
                ) : (
                  <Play
                    size={24}
                    className="sm:w-7 sm:h-7 text-[#54577f]"
                    strokeWidth={3}
                  />
                )}
              </div>
            </button>
          </div>

          {/* TEXTO SOBRE EL VIDEO */}
          <div
            className="
              pointer-events-none absolute left-0 bottom-0 z-20
              px-4 sm:px-6 md:px-10 lg:px-14
              pb-4 sm:pb-6 md:pb-8
            "
          >
            <p
              className="
                text-white font-extrabold
                text-xl sm:text-2xl md:text-3xl lg:text-[56px]
                max-w-[320px] sm:max-w-[420px] md:max-w-[520px]
              "
              style={{ lineHeight: 0.9 }}
            >
              Uma experiência global de aprendizado.
            </p>
          </div>
        </div>

        {/* SECCIÓN DEBAJO DEL VIDEO */}
        <div
          className="
            w-full mt-12 md:mt-16
            grid grid-cols-1 md:grid-cols-2
            gap-10 md:gap-20
          "
        >
          {/* IZQUIERDA */}
          <div className="font-poppins text-center md:text-left">
            <h3 className="text-[#54577f] text-xl sm:text-2xl md:text-3xl leading-snug font-extrabold mb-4">
              Desde 2020, a Cliltutors conecta alunos e professores do mundo
              todo.
            </h3>

            <p className="text-[#54577f] text-sm sm:text-base md:text-lg leading-relaxed max-w-[550px] mx-auto md:mx-0">
              Nosso propósito é transformar o aprendizado em algo vivo e
              contextual — uma jornada leve, com resultados reais desde as
              primeiras aulas.
            </p>
          </div>

          {/* DERECHA */}
          <div className="flex flex-col gap-8 md:gap-10 font-poppins">
            {/* MISSÃO */}
            <div className="flex items-start gap-4 text-left">
              <div className="mt-1 shrink-0">
                <GraduationCap
                  size={36}
                  className="sm:w-10 sm:h-10"
                  stroke="#36DE6B"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <h4 className="text-[#54577f] text-lg sm:text-xl font-extrabold mb-1">
                  MISSÃO
                </h4>
                <p className="text-[#54577f] text-sm sm:text-base leading-relaxed max-w-[500px]">
                  Transformar o aprendizado em uma experiência humana e global,
                  onde o idioma é a ferramenta para viver novas histórias, não
                  apenas estudá-las.
                </p>
              </div>
            </div>

            {/* VISÃO */}
            <div className="flex items-start gap-4 text-left">
              <div className="mt-1 shrink-0">
                <Users
                  size={36}
                  className="sm:w-10 sm:h-10"
                  stroke="#E55B78"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <h4 className="text-[#54577f] text-lg sm:text-xl font-extrabold mb-1">
                  VISÃO
                </h4>
                <p className="text-[#54577f] text-sm sm:text-base leading-relaxed max-w-[500px]">
                  Ser uma ponte entre pessoas e culturas, tornando o aprendizado
                  algo vivo, acessível e cheio de significado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

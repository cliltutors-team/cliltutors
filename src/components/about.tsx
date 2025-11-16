"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

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
    <section className="relative w-full mt-10 md:mt-16 overflow-hidden py-12 md:py-16 flex justify-center">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[260px]">
        {/* Texto + logo arriba */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 md:mb-8">
          <span className="text-[#34354f] text-lg sm:text-xl font-normal">
            Sobre a
          </span>
          <Image
            src="/Logo-ClilTutors.svg"
            alt="Cliltutors logo"
            width={140}
            height={40}
            priority
            quality={100}
            className="select-none w-[110px] sm:w-[140px] h-auto"
          />
        </div>

        {/* WRAPPER PARA VIDEO + TEXTO */}
        <div
          className="
            relative w-full
            aspect-[16/9] md:aspect-[16/8]
          "
        >
          {/* BLOQUE DEL VIDEO (con controls) */}
          <div
            className="
              relative w-full h-full
              rounded-3xl overflow-hidden shadow-lg
              group
            "
            onClick={handleMobileTap}
          >
            {/* 🎥 Video */}
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
                scale-[1.08] md:scale-[1.15]
                origin-center
                will-change-transform
              "
            />

            {/* Controles personalizados */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className={`
                absolute inset-0 flex items-center justify-center
                cursor-pointer
                transition-opacity duration-300 ease-in-out

                /* Desktop: aparece en hover */
                md:opacity-0 md:group-hover:opacity-100

                /* Móvil: según estado */
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
                  <Pause size={26} className="sm:w-7 sm:h-7" strokeWidth={3} />
                ) : (
                  <Play size={26} className="sm:w-7 sm:h-7" strokeWidth={3} />
                )}
              </div>
            </button>
          </div>

          {/* TEXTO – CAPA TOTALMENTE SEPARADA */}
          <div
            className="
              pointer-events-none
              absolute left-0 bottom-0
              z-20
              px-4 sm:px-6 md:px-10 lg:px-14
              pb-4 sm:pb-6 md:pb-8
            "
          >
            <p
              className="
                text-white font-extrabold
                text-2xl sm:text-3xl md:text-4xl lg:text-[56px]
                max-w-[420px] sm:max-w-[480px] md:max-w-[520px]
              "
              style={{ lineHeight: 0.9 }}
            >
              Uma experiência global de aprendizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

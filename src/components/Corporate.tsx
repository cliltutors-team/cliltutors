export default function HeroCorporate() {
  return (
    <section className="relative w-full bg-[#313347] pt-20 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">  
        {/* TEXT */}
        <div className="order-2 lg:order-1 ml-8 lg:ml-24">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/images/Logo_Cliltutors_corporate.svg" 
              alt="Cliltutors Corporate"
              className="h-8 w-auto scale-150 ml-7"
            />
          </div>

          <p className="mt-24 text-white/80 uppercase tracking-tight leading-none text-sm font-inter">
            Conheça nossa <br />
            solução de inglês <br />
            corporativo
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-normal text-white leading-none font-poppins tracking-tight">
            Idiomas <br />
            estratégicos para{" "}
            <span className="mt-1 block text-[#C9CAE9] font-semibold tracking-tight">
              equipes de alta performance
            </span>
          </h1>

          <button className="mt-16 bg-[#C9CAE9] text-[#222] px-7 py-3 rounded-full text-lg font-medium shadow-lg hover:opacity-90 transition font-inter">
            Conheça nossos planos
          </button>
        </div>

        {/* IMAGE CON SELLO */}
        <div className="flex justify-start order-1 lg:order-2 items-end self-end relative">
          {/* Sello circular - ARRIBA A LA DERECHA DE LA IMAGEN */}
          <div className="absolute -top-12 right-24 z-10 w-[105px] h-[105px]">
              <svg
                width="105"
                height="105"
                viewBox="0 0 200 200"
                className="absolute top-0 left-0 text-white select-none animate-spin [animation-duration:16s]"
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
                fontSize="12"
                fontFamily="Poppins"
                fontWeight="700"
                fill="#ffffff"
                letterSpacing="1.5"
                >
                <textPath
                    href="#circlePathSmall"
                    startOffset="0"
                    textLength="480"
                >
                    · CLILTUTORS · CLILTUTORS · CLILTUTORS ·
                </textPath>
                </text>
            </svg>

            {/* SVG estático - solo el texto interior */}
            <svg
                width="105"
                height="105"
                viewBox="0 0 200 200"
                className="absolute top-0 left-0 text-white select-none"
                style={{ userSelect: "none" }}
            >
                <text
                x="100"
                y="105"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="15"
                fontFamily="Poppins"
                fontWeight="600"
                fill="#ffffff"
                >
                <tspan x="100" dy="-20">METODOLOGIA</tspan>
                <tspan x="100" dy="12">CLIL ADAPTADA</tspan>
                <tspan x="100" dy="12">A ÁREA DA</tspan>
                <tspan x="100" dy="12">EMPRESA</tspan>
                </text>
            </svg>
          </div>

          <img
            src="/images/Corporate_Hero.webp"  
            alt="Corporate Hero"
            className="w-full max-w-[680px] object-contain scale-110 -mb-14 -ml-24"
          />
        </div>
      </div>
    </section>
  );
}
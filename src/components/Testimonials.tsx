import Image from "next/image";
import { useState } from "react";
import testimonialsData from "@/src/data/testimonials.json";
import { useTranslation } from "react-i18next";

type TestimonialType = {
  id: number;
  name: string;
  text: string;
  rating: number;
};

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = (testimonialsData as { testimonials: TestimonialType[] })
    .testimonials;

  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 8;

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  return (
    <section className="relative -mx-4 -my-4">
      {/* Fondo optimizado */}
      <div className="absolute inset-0 z-0 w-screen">
        <Image
          src="/images/testimonials_bg.webp"
          alt=""
          fill
          className="object-cover w-screen"
          priority
        />
        {/* Overlay para mejor legibilidad del texto */}
        <div className="absolute inset-0 bg-black/7 w-screen"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-base md:text-lg text-[#303149] font-montserrat mb-4 font-bold">
            {t("testimonials.subtitle")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-subjectivity tracking-tight ">
            {t("testimonials.title")}
          </h2>
        </div>

        {/* Mostrar solo los testimonios de la página actual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-8 font-inter">
          {currentTestimonials.map((testimonial: TestimonialType) => (
            <div
              key={testimonial.id}
              className="bg-[#FBFAFF] rounded-2xl p-4 md:p-5 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col min-h-[180px] md:min-h-[200px]"
            >
              {/* Header con Avatar y Rating */}
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {testimonial.name.charAt(0)}
                </div>

                {/* Rating en esquina superior derecha */}
                <div className="flex text-yellow-400 text-xs md:text-sm">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
              </div>

              {/* Texto alineado a la izquierda */}
              <blockquote className="text-[#444665] text-xs leading-relaxed text-left grow mb-3 md:mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Nombre en esquina inferior derecha */}
              <div className="mt-auto text-right">
                <h3 className="text-[#444665] text-xs md:text-sm text-right font-bold">
                  {testimonial.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* INDICADORES - Solo mostrar si hay más de una página */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  currentPage === index ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

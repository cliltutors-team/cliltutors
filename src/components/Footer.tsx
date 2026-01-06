"use client";

import React, { FormEvent } from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    console.log("Email suscrito:", email);
    alert("¡Gracias por suscribirte! Te mantendremos informado.");
    form.reset();
  };

  return (
    <footer className="bg-deep text-white">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Izquierda */}
          <div>
            <Image
              src="/Logo-ClilTutors.svg"
              alt="Cliltutors Logo"
              width={180}
              height={70}
              className="h-12 w-auto filter brightness-0 invert mb-6"
            />

            <h3 className="font-bold text-xl mb-3">
              {t("footer.newsletter.title")}
            </h3>

            <p className="text-white/70 mb-6">
              {t("footer.newsletter.description")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                required
                placeholder={t("footer.newsletter.placeholder")}
                className="w-full px-5 py-3 rounded-full bg-white text-gray-800
              placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-vitality/40"
              />

              <button
                type="submit"
                className="bg-white text-vitality font-semibold px-8 py-3
              rounded-full shadow-md hover:shadow-lg transition"
              >
                {t("footer.newsletter.button")}
              </button>
            </form>

            <p className="text-white/50 text-sm mt-4">
              {t("footer.newsletter.privacy")}
            </p>
          </div>

          {/* Derecha */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Menú",
                items: [
                  "Inicio",
                  "Mentores",
                  "Contáctenos",
                  "Acerca de nosotros",
                ],
              },
              {
                title: "Cursos",
                items: ["Idiomas", "Académico"],
              },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-xl mb-5">{section.title}</h3>
                <ul className="space-y-3 text-white/70">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-vitality transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* App */}
            <div>
              <h3 className="font-bold text-xl mb-4">
                {t("footer.app.title")}
              </h3>
              <p className="text-white/70 mb-6">
                {t("footer.app.description")}
              </p>
              <button
                className="
    inline-flex items-center justify-center
    min-w-[180px]
    px-6 py-3
    rounded-full
    bg-white text-vitality
    font-semibold text-sm sm:text-base
    whitespace-nowrap
    shadow-md
    transition-colors
  "
              >
                {t("footer.app.button")}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-illumination/30 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2026 Cliltutors. Todos los derechos reservados.
          </p>

          {/* Redes */}
          <div className="flex gap-6 mt-4 sm:mt-0 text-human">
            {[FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp].map(
              (Icon, i) => (
                <Icon
                  key={i}
                  className="w-6 h-6 cursor-pointer hover:text-vitality transition-colors"
                />
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

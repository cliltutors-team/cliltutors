'use client';

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
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    console.log("Email suscrito:", email);
    alert("¡Gracias por suscribirte! Te mantendremos informado.");
    form.reset();
  };

  return (
    <footer className="bg-vitality text-white">
      {/* Contenedor principal con padding responsive */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Grid principal - 1 columna en móvil, 2 en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sección izquierda - Formulario */}
          <div>
            <div className="mb-8 lg:mb-10">
              <div className="mb-6">
                <Image
                  src="/Logo-ClilTutors.svg"
                  alt="Cliltutors Logo"
                  width={180}
                  height={70}
                  className="h-10 sm:h-12 lg:h-14 w-auto filter brightness-0 invert"
                />
              </div>
              
              <div>
                <h3 className="font-bold text-lg sm:text-xl lg:text-xl mb-3 sm:mb-4">
                  {t('footer.newsletter.title', 'Suscríbete a nuestro newsletter')}
                </h3>
                <p className="text-green-100 text-sm sm:text-base mb-4 sm:mb-6">
                  {t('footer.newsletter.description', 'Recibe las últimas noticias, ofertas y actualizaciones directamente en tu email.')}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t('footer.newsletter.placeholder', 'Tu dirección de email')}
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-full bg-white text-gray-800 placeholder-green-300 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent shadow-sm text-left"
                    />
                  </div>
                  <div className="text-left">
                    <button
                      type="submit"
                      className= "text-vitality bg-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
                    >
                      {t('footer.newsletter.button', 'Suscribirse')}
                    </button>
                  </div>
                </form>
                
                <p className="text-green-200 text-xs sm:text-sm mt-3 sm:mt-4">
                  {t('footer.newsletter.privacy', 'Al suscribirte aceptas nuestra política de privacidad.')}
                </p>
              </div>
            </div>
          </div>

          {/* Sección derecha - Menús */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {/* Menú */}
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  {t('footer.menu.title', 'Menú')}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {['footer.menu.home', 'footer.menu.mentors', 'footer.menu.contact', 'footer.menu.about'].map((key, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-green-200 transition-colors block py-1 sm:py-2 text-base sm:text-lg"
                      >
                        {t(key, ['Inicio', 'Mentores', 'Contáctenos', 'Acerca de nosotros'][index])}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cursos */}
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  {t('footer.courses.title', 'Cursos')}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {['footer.courses.languages', 'footer.courses.academic'].map((key, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-green-200 transition-colors block py-1 sm:py-2 text-base sm:text-lg"
                      >
                        {t(key, ['Idiomas', 'Académico'][index])}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Descarga nuestra app */}
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  {t('footer.app.title', 'Descarga nuestra app')}
                </h3>
                <p className="text-green-100 text-sm sm:text-base mb-4 sm:mb-6">
                  {t('footer.app.description', 'Próximamente disponible en App Store y Google Play')}
                </p>
                <button className= "text-vitality bg-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg w-full whitespace-nowrap text-sm sm:text-base">
                  {t('footer.app.button', 'En desarrollo')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright y redes sociales */}
        <div className="border-t border-green-300 mt-8 sm:mt-10 lg:mt-16 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Izquierda: Copyright */}
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="text-green-100 text-sm sm:text-base lg:text-lg">
                {t('footer.copyright', '© 2025 Cliltutors. Todos los derechos reservados.')}
              </p>
            </div>

            {/* Derecha: Redes sociales */}
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const footerData = {
    about: {
      title: "Sobre nós",
      links: ["Quem somos", "Cliltutores", "Blog", "Contato"]
    },
    products: {
      title: "Produtos",
      sections: [
        {
          title: "Mentoria em Ciências e Exatas",
          items: ["Matemática", "Física", "Química", "Biologia"]
        },
        {
          title: "Idiomas com o Método CLIL", 
          items: ["Inglês", "Espanhol", "Português"]
        },
        {
          title: "Coaching Profissional",
          items: ["Saber"]
        }
      ]
    },
    support: {
      title: "Ajuda e suporte", 
      links: ["Perguntas frequentes"]
    },
    classes: {
      title: "Entrar nas aulas",
      links: ["Classroom", "Cursos"]
    }
  };

  return (
    <footer className="bg-[#36DE6B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con logo y redes */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-green-500">
          <div className="flex items-center">
            <Image 
              src="/Logo-ClilTutors.svg" 
              alt="Cliltutors Logo"
              width={120}
              height={40}
              className="h-8 w-auto filter brightness-0 invert"
            />
          </div>

          <div className="flex space-x-4">
            <a href="#"><FaFacebook className="w-6 h-6 hover:opacity-80" /></a>
            <a href="#"><FaInstagram className="w-6 h-6 hover:opacity-80" /></a>
            <a href="#"><FaYoutube className="w-6 h-6 hover:opacity-80" /></a>
            <a href="#"><FaLinkedin className="w-6 h-6 hover:opacity-80" /></a>
            <a href="#"><FaWhatsapp className="w-6 h-6 hover:opacity-80" /></a>
          </div>
        </div>

        {/* 4 Columnas - SIN TEXTO HARCODEADO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          
          {/* Columna 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">{footerData.about.title}</h3>
            <ul className="space-y-2">
              {footerData.about.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-green-200 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">{footerData.products.title}</h3>
            {footerData.products.sections.map((section, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold mb-2">{section.title}</h4>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="hover:text-green-200 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">{footerData.support.title}</h3>
            <ul className="space-y-2">
              {footerData.support.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-green-200 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h3 className="font-bold text-lg mb-4">{footerData.classes.title}</h3>
            <ul className="space-y-2">
              {footerData.classes.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-green-200 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-green-500 mt-8 pt-6 text-center">
          <p>&copy; 2025 Cliltutors.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
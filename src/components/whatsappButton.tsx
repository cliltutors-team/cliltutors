import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => {
  // Reemplaza con tu número (incluye el código de país sin el +)
  const phoneNumber = "5519982940286";
  const message =
    "Hola, me gustaría obtener más información sobre sus servicios.";

  // Codificamos el mensaje para URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      aria-label="Chatear por WhatsApp"
    >
      {/* Icono */}
      <FaWhatsapp className="text-white text-4xl" />
    </a>
  );
};

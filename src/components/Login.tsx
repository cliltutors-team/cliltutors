'use client';

import React, { FormEvent, useState } from "react";

const LoginCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Datos del formulario:", { name, email });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("¡Cuenta creada exitosamente! Revisa tu email para confirmar.");
    setName("");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
     <div className="w-full flex justify-center">
        <div className="w-fit bg-vitality rounded-xl shadow-lg p-6 md:p-8 flex justify-center">
            <div className="max-w-6xl mx-auto">
                {/* Grid para dos columnas en lg, una en móvil */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Columna izquierda: Texto */}
                <div className="flex flex-col justify-center text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Crea tu cuenta en Cliltutors
                    </h2>
                    <p className="text-green-100 text-base md:text-lg">
                    ¡Únete a Cliltutors para acceder a cursos, guía de profesionales y mucho más!
                    </p>
                </div>

                {/* Columna derecha: Formulario */}
                <div className=" backdrop-blur-sm rounded-xl p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-left">
                        <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Your name
                        </label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingresa tu nombre completo"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 border border-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-sm"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                        Email address
                        </label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu dirección de email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 border border-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-sm"
                        />
                    </div>

                    <div className="text-left">
                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-[#36DE6B] font-semibold py-3 px-8 rounded-full hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                        </button>
                    </div>
                    </form>

                    <div className="mt-6 text-left">
                    <p className="text-green-100 text-sm">
                        Al crear tu cuenta, aceptas nuestros{" "}
                        <a href="#" className="text-white underline hover:text-green-200">
                        Términos de Servicio
                        </a>{" "}
                        y{" "}
                        <a href="#" className="text-white underline hover:text-green-200">
                        Política de Privacidad
                        </a>
                        .
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginCard;
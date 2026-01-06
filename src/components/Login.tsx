"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { User, Mail } from "lucide-react";

const LoginCard = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const params = new URLSearchParams();
    params.set("name", name.trim());
    params.set("email", email.trim());

    router.push(`/register?${params.toString()}`);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex justify-center">
      {/* Banner */}
      <section
        className="
          w-full max-w-6xl
          min-h-[360px] sm:min-h-[420px]
          rounded-4xl
          bg-deep text-white
          shadow-lg
          flex items-center
        "
      >
        <div className="w-full px-8 py-14 sm:px-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                {t("authCard.title", "Create your account")}
              </h2>

              <p className="mt-6 text-white/75 text-base sm:text-lg max-w-xl">
                {t(
                  "authCard.subtitle",
                  "Únete para acceder a cursos, mentores y acompañamiento personalizado."
                )}
              </p>

              {/* Accent line */}
              <div className="mt-8 h-[3px] w-24 rounded-full bg-vitality" />
            </div>

            {/* Right form */}
            <div className="lg:justify-self-end w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* NAME */}
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("authCard.placeholders.name", "Tu nombre")}
                    required
                    className="
                      w-full rounded-xl px-4 py-3.5 pl-11
                      bg-white/10 text-white placeholder-white/60
                      border border-white/15
                      focus:outline-none focus:ring-2 focus:ring-vitality/35
                      focus:border-white/25
                    "
                  />
                </div>

                {/* EMAIL */}
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t(
                      "authCard.placeholders.email",
                      "Correo electrónico"
                    )}
                    required
                    className="
                      w-full rounded-xl px-4 py-3.5 pl-11
                      bg-white/10 text-white placeholder-white/60
                      border border-white/15
                      focus:outline-none focus:ring-2 focus:ring-vitality/35
                      focus:border-white/25
                    "
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    inline-flex items-center justify-center
                    rounded-full px-8 py-3.5
                    bg-white text-deep font-semibold
                    shadow-sm
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting
                    ? t("authCard.buttonLoading", "Enviando...")
                    : t("authCard.button", "Enviar")}
                </button>

                {/* Terms */}
                <p className="pt-2 text-xs text-white/65 leading-relaxed">
                  {t("authCard.terms.prefix", "Al continuar aceptas los")}{" "}
                  <a
                    href="#"
                    className="text-human underline underline-offset-4 hover:text-vitality transition-colors"
                  >
                    {t("authCard.terms.terms", "Términos")}
                  </a>{" "}
                  {t("authCard.terms.and", "y la")}{" "}
                  <a
                    href="#"
                    className="text-human underline underline-offset-4 hover:text-vitality transition-colors"
                  >
                    {t("authCard.terms.privacy", "Privacidad")}
                  </a>
                  {t("authCard.terms.suffix", ".")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginCard;

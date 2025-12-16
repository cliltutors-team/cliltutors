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
      <div className="w-fit bg-vitality rounded-4xl shadow-lg p-6 md:p-8 flex justify-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* TEXTO */}
            <div className="flex flex-col justify-center text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("authCard.title")}
              </h2>
              <p className="text-green-100 text-base md:text-lg">
                {t("authCard.subtitle")}
              </p>
            </div>

            {/* FORM */}
            <div className="backdrop-blur-sm rounded-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("authCard.placeholders.name")}
                    required
                    className="
                      w-full px-4 py-3 pl-11 rounded-lg bg-white
                      text-gray-800 placeholder-gray-500
                      border border-green-300
                      focus:outline-none focus:ring-2 focus:ring-white
                      focus:border-transparent shadow-sm
                    "
                  />
                </div>

                {/* EMAIL */}
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("authCard.placeholders.email")}
                    required
                    className="
                      w-full px-4 py-3 pl-11 rounded-lg bg-white
                      text-gray-800 placeholder-gray-500
                      border border-green-300
                      focus:outline-none focus:ring-2 focus:ring-white
                      focus:border-transparent shadow-sm
                    "
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    bg-white text-[#36DE6B] font-semibold
                    py-3 px-8 rounded-full hover:bg-green-50
                    transition-all duration-300 shadow-md hover:shadow-lg
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting
                    ? t("authCard.buttonLoading")
                    : t("authCard.button")}
                </button>
              </form>

              {/* TERMS */}
              <div className="mt-6 text-left">
                <p className="text-green-100 text-sm">
                  {t("authCard.terms.prefix")}{" "}
                  <a
                    href="#"
                    className="text-white underline hover:text-green-200"
                  >
                    {t("authCard.terms.terms")}
                  </a>{" "}
                  {t("authCard.terms.and")}{" "}
                  <a
                    href="#"
                    className="text-white underline hover:text-green-200"
                  >
                    {t("authCard.terms.privacy")}
                  </a>
                  {t("authCard.terms.suffix")}
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

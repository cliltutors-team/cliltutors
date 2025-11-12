import localFont from "next/font/local";

export const montserratAlt = localFont({
  src: [
    {
      path: "./MontserratAlt-Regular.ttf", // Ajusta la ruta a tu archivo de fuente
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-montserrat-alt", // Define la variable CSS
  display: "swap",
});

export const subjectivity = localFont({
  src: "./Subjectivity-Regular.otf", // Ajusta la ruta a tu archivo de fuente
  variable: "--font-subjectivity", // Define la variable CSS
  display: "swap",
});

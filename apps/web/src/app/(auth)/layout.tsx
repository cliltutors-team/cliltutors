import LanguageSwitcher from "@/src/components/languageSwitcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh">
      {/* Contenido de login / register */}
      {children}

      {/* 🌍 Language switcher – abajo a la izquierda */}
      <div className="fixed bottom-6 left-6 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}

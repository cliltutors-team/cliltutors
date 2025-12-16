import Header from "@/src/components/header";
import Footer from "@/src/components/Footer";
import { WhatsAppButton } from "@/src/components/whatsappButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

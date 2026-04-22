import Sidebar from "@/src/components/layout/Sidebar";
import TopBar from "@/src/components/layout/TopBar";
import MobileNav from "@/src/components/layout/MobileNav";
import { BookingProvider } from "@/src/lib/hooks/useBooking";
import { QueryProvider } from "@/src/lib/providers/QueryProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <BookingProvider>
        <Sidebar />
        <div className="app-content">
          <TopBar />
          <main className="page-content">{children}</main>
        </div>
        <MobileNav />
      </BookingProvider>
    </QueryProvider>
  );
}

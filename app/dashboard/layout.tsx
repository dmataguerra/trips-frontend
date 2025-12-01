import DashboardHeader from "./_components/Header";
import DashboardFooter from "./_components/Footer";

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
}

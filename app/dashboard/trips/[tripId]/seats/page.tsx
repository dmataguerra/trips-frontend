import DashboardHeader from "../../../_components/Header";
import DashboardFooter from "../../../_components/Footer";
import dynamic from "next/dynamic";
const SeatsLoader = dynamic(() => import("./_components/SeatsLoader"), { ssr: false });

export default function TripSeatsPage({ params }: { params: { tripId: string } }) {
  const { tripId } = params;
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <SeatsLoader tripId={tripId} />
      </main>
      <DashboardFooter />
    </div>
  );
}

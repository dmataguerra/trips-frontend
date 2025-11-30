import dynamic from "next/dynamic";
const SeatsLoader = dynamic(() => import("./_components/SeatsLoader"), { ssr: false });

export default function TripSeatsPage({ params }: { params: { tripId: string } }) {
  const { tripId } = params;
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full p-6">
      <SeatsLoader tripId={tripId} />
    </main>
  );
}

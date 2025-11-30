import dynamic from "next/dynamic";

const ReservationClient = dynamic(() => import("./ReservationClient"), { ssr: false });

export default function ReservationPage({ searchParams }: { searchParams: { reservationId?: string } }) {
  const { reservationId } = searchParams || {};
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <ReservationClient reservationId={reservationId} />
      </main>
    </div>
  );
}

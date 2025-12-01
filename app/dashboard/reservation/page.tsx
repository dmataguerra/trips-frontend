import dynamic from "next/dynamic";
const ReservationClient = dynamic(() => import("./_components/ReservationClient"), { ssr: false });

export default function ReservationPage({ searchParams }: { searchParams: { reservationId?: string } }) {
  const { reservationId } = searchParams || {};
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full p-6">
      <section className="bg-white/90 dark:bg-hero_bg rounded-lg shadow-md p-6">
        <ReservationClient reservationId={reservationId} />
      </section>
    </main>
  );
}

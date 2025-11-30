
import dynamic from "next/dynamic";
const BookingClient = dynamic(() => import("./_components/BookingClient"), { ssr: false });

export default function BookingPage({ searchParams }: { searchParams: { reservationId?: string } }) {
	const { reservationId } = searchParams || {};
	return (
		<main className="flex-1 max-w-5xl mx-auto w-full p-6">
			<section className="bg-white/90 dark:bg-hero_bg rounded-lg shadow-md p-6">
				<BookingClient reservationId={reservationId} />
			</section>
		</main>
	);
}


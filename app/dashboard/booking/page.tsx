
import dynamic from "next/dynamic";
import DashboardFooter from "./_components/Footer";
import DashboardHeader from "./_components/Header";

const BookingClient = dynamic(() => import("./_components/BookingClient"), { ssr: false });

export default function BookingPage({ searchParams }: { searchParams: { reservationId?: string } }) {
	const { reservationId } = searchParams || {};
	return (
                <>
				<DashboardHeader />
				<BookingClient reservationId={reservationId} />
				<DashboardFooter />
                </>
	);
}


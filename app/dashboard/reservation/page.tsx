import dynamic from "next/dynamic";
import DashboardFooter from "./_components/Footer";
import DashboardHeader from "./_components/Header";
const ReservationClient = dynamic(() => import("./_components/ReservationClient"), { ssr: false });

export default function ReservationPage({ searchParams }: { searchParams: { reservationId?: string } }) {
  const { reservationId } = searchParams || {};
  return (
    <>
          <DashboardHeader />
          <ReservationClient reservationId={reservationId} />
          <DashboardFooter />
    </>
  );
}

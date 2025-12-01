import { Card, CardBody } from "@nextui-org/react";

export default function BookingCard({ booking }: any) {
  const trip = booking.tripSeat?.trip;
  const seat = booking.tripSeat?.busSeat;

  return (
    <Card shadow="sm" className="border border-gray-200">
      <CardBody className="space-y-1 text-sm">
        <p>
          <b>Ruta:</b> {trip?.route?.routeOrigin} a {trip?.route?.routeDestination}
        </p>

        <p>
          <b>Fecha:</b> {trip?.tripDate} &nbsp; <b>Hora:</b> {trip?.tripTime}
        </p>

        <p>
          <b>Camión:</b> {trip?.bus?.busName}
        </p>

        <p>
          <b>Asiento:</b> {seat?.seatNumber}
        </p>

        <p>
          <b>Precio:</b> ${trip?.tripPrice}
        </p>
      </CardBody>
    </Card>
  );
}
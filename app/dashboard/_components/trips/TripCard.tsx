import { Trip } from "@/entities";
import { Card, CardBody } from "@nextui-org/react";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Card className="border border-green-300 shadow-md">
      <CardBody>
        <h3 className="text-xl font-bold text-green-700">
          {trip.route.routeOrigin} - {trip.route.routeDestination}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Fecha: {trip.tripDate.toLocaleDateString()}
        </p>

        <p className="text-sm text-gray-600">
          Hora: {trip.tripTime}
        </p>

        <p className="text-lg font-semibold text-green-800 mt-2">
          ${trip.tripPrice}
        </p>
      </CardBody>
    </Card>
  );
}
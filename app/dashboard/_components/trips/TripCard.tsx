import { Trip } from "@/entities";
import { Card, CardBody, Button } from "@nextui-org/react";

export default function TripCard({ trip }: { trip: Trip }) {

  const [year, month, day] = trip.tripDate.split("-");
  const tripDate = new Date(Number(year), Number(month) - 1, Number(day));

  return (
    <Card className="border shadow-md">
      <CardBody>
        <h3 className="text-xl font-bold text-green-700">
          {trip.route.routeOrigin} - {trip.route.routeDestination}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Fecha: {tripDate.toLocaleDateString("es-MX")}
        </p>

        <p className="text-sm text-gray-600">
          Hora: {trip.tripTime}
        </p>

        <p className="text-lg font-semibold text-green-800 mt-2">
          ${trip.tripPrice}
        </p>

        <div className="mt-4 flex justify-end">
          <Button
            className="bg-green-600 text-white"
            size="sm"
            onClick={() => {
              /* Accin pendiente: navegacion o modal para elegir asientos */
            }}
          >
            Elegir Asientos
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
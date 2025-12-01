import { Trip } from "@/entities";
import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function TripCard({ trip }: { trip: Trip }) {
  const router = useRouter();

  const [year, month, day] = trip.tripDate.split("-");
  const tripDate = new Date(Number(year), Number(month) - 1, Number(day));

  const imgSrc = trip.route?.image ? (trip.route.image as string) : "/images/trip_match.jpg";

  return (
    <Card className="border shadow-md">
      <div className="w-full h-40 relative overflow-hidden rounded-t-md bg-gray-100">
        <Image removeWrapper src={imgSrc} classNames={{ img: "object-cover w-full h-full" }} />
      </div>
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
            onClick={() => router.push(`/dashboard/trips/${trip.tripId}/seats`)}
          >
            Elegir Asientos
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
import { useEffect, useState } from "react";
import { searchTrips } from "../../api/trips";
import TripCard from "./TripCard";

interface Props {
  filters: any;
  searchTrigger: number;
}

export default function TripList({ filters, searchTrigger }: Props) {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    if (searchTrigger === 0) return;
    searchTrips(filters).then((data) => setTrips(data));
  }, [searchTrigger]);

  return (
    <div>
      <h2 className="text-4xl text-center font-bold text-green-700 mb-4">Resultados</h2>

      {trips.length === 0 ? (
        <p className="text-gray-500 text-center">No hay viajes disponibles.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto py-4">
          {trips.map((trip) => (
            <div className="flex-shrink-0 w-[320px]" key={trip.tripId}>
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { API_URL } from "@/constants";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TripsListB() {
  const { id } = useParams();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API_URL}/trips/by-bus/${id}`);
      const data = await res.json();

      setTrips(Array.isArray(data) ? data : (data ? [data] : []));
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner label="Cargando viajes..." />
      </div>
    );
  }

  return (
    <div className="h-[80vh] overflow-y-auto space-y-4">
      <h1 className="text-center text-2xl font-bold text-green-800">Viajes asignados</h1>

      {trips.length > 0 &&
        trips.map((trip) => (
          <Card key={trip.tripId} shadow="sm" className="border border-gray-200">
            <Link href={`/dashboardSales/trips/${trip.tripId}`}>
              <CardBody className="space-y-1 text-sm">
                <p><b>Ruta:</b> {trip.route?.routeOrigin} - {trip.route?.routeDestination}</p>
                <p><b>Fecha:</b> {trip.tripDate}</p>
                <p><b>Hora:</b> {trip.tripTime}</p>
                <p><b>Precio:</b> ${trip.tripPrice}</p>
              </CardBody>
            </Link>
          </Card>
        ))}

      {trips.length === 0 && (
        <p className="text-center text-gray-500 py-10">No hay viajes para este camión.</p>
      )}
    </div>
  );
}
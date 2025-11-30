"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { API_URL } from "@/constants";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TripsListR() {
  const { id } = useParams();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API_URL}/trips/by-route/${id}`);
      const data = await res.json();

      console.log("DATA RECIBIDA =>", data);

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
      {trips.length > 0 &&
        trips.map((trip) => (
          <Card key={trip.tripId} shadow="sm" className="border border-gray-200">
            <Link href={`/dashboardSales/trips/${trip.tripId}`}>
              <CardBody className="space-y-1 text-sm">
                <p>
                  <b>Ruta:</b> {trip.route?.routeOrigin} - {trip.route?.routeDestination}
                </p>
                <p><b>Camión:</b> {trip.bus?.busName}</p>
                <p><b>Fecha:</b> {trip.tripDate}</p>
                <p><b>Hora:</b> {trip.tripTime}</p>
                <p><b>Precio:</b> ${trip.tripPrice}</p>
              </CardBody>
            </Link>
          </Card>
        ))
      }

      {trips.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No hay viajes registrados para esta ruta.
        </p>
      )}
    </div>
  );
}
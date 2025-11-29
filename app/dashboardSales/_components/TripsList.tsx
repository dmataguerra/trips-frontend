"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { API_URL } from "@/constants";

export default function TripsList() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API_URL}/trips`);
      const data = await res.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner label="Cargando viajes..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card key={trip.tripId} shadow="sm" className="border border-gray-200">
          <CardBody className="space-y-1 text-sm">
            <p><b>Ruta:</b> {trip.route?.routeOrigin} - {trip.route?.routeDestination}</p>
            <p><b>Camión:</b> {trip.bus?.busName}</p>
            <p><b>Fecha:</b> {trip.tripDate}</p>
            <p><b>Hora:</b> {trip.tripTime}</p>
            <p><b>Precio:</b> ${trip.tripPrice}</p>
          </CardBody>
        </Card>
      ))}

      {trips.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No hay viajes registrados.
        </p>
      )}
    </div>
  );
}
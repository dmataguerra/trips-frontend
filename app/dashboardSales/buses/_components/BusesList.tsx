"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { API_URL } from "@/constants";
import Link from "next/link";

export default function BusesList() {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBuses = async () => {
    try {
      const res = await fetch(`${API_URL}/buses`);
      const data = await res.json();
      setBuses(data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner label="Cargando camiones..." />
      </div>
    );
  }

  return (
    <div className="h-[80vh] overflow-y-auto space-y-4">
      <h1 className="text-center text-2xl font-bold text-green-800">Todos los camiones</h1>

      {buses.map((bus) => (
        <Card key={bus.busId} shadow="sm" className="border border-gray-200">
          <Link href={`/dashboardSales/buses/${bus.busId}`}>
            <CardBody className="space-y-2 text-sm">
              <p><b>Nombre:</b> {bus.busName}</p>
              <p><b>Viajes asignados:</b> {bus.trips?.length || 0}</p>
            </CardBody>
          </Link>
        </Card>
      ))}

      {buses.length === 0 && (
        <p className="text-center text-gray-500 py-10">No hay camiones registrados.</p>
      )}
    </div>
  );
}
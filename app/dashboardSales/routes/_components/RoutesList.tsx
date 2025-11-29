"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { API_URL } from "@/constants";

export default function RoutesList() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const res = await fetch(`${API_URL}/routes`);
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner label="Cargando rutas..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {routes.map((route) => (
        <Card key={route.routeId} shadow="sm" className="border border-gray-200">
          <CardBody className="space-y-1 text-sm">
            <p><b>Origen:</b> {route.routeOrigin}</p>
            <p><b>Destino:</b> {route.routeDestination}</p>
          </CardBody>
        </Card>
      ))}

      {routes.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No hay rutas registradas.
        </p>
      )}
    </div>
  );
}
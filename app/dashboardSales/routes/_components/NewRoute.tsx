"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { API_URL } from "@/constants";

export default function NewRoute() {
  const [routeOrigin, setRouteOrigin] = useState("");
  const [routeDestination, setRouteDestination] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      routeOrigin,
      routeDestination,
    };

    await fetch(`${API_URL}/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(payload);
    alert("Ruta registrada");
  };

  return (
    <Card className="max-w-xl p-4">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Lugar de origen"
            type="text"
            value={routeOrigin}
            onChange={(e) => setRouteOrigin(e.target.value)}
          />
          
          <Input
            label="Lugar de destino"
            type="text"
            value={routeDestination}
            onChange={(e) => setRouteDestination(e.target.value)}
          />


          <Button type="submit" color="primary" className="w-full">
            Registrar Ruta
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { API_URL } from "@/constants";

export default function NewRoute() {
  const [routeOrigin, setRouteOrigin] = useState("");
  const [routeDestination, setRouteDestination] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('routeOrigin', routeOrigin);
    formData.append('routeDestination', routeDestination);
    if (image) {
      formData.append('image', image);
    }

    await fetch(`${API_URL}/routes`, {
      method: "POST",
      body: formData,
    });

    console.log({ routeOrigin, routeDestination, image });
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

          <Input
            label="Imagen (opcional)"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />


          <Button type="submit" color="primary" className="w-full">
            Registrar Ruta
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
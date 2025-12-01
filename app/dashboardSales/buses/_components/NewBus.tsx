"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { API_URL } from "@/constants";

export default function NewBus() {
  const [busName, setBusName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { busName };

    await fetch(`${API_URL}/buses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Camión registrado");
    setBusName("");
  };

  return (
    <Card className="max-w-xl p-4">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre del camión"
            type="text"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />

          <Button type="submit" color="primary" className="w-full">
            Registrar Camión
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
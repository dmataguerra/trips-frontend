"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import SelectBus from "./buses/SelectBus";
import SelectRoute from "./routes/SelectRoute";
import DatePicker from "./date/DatePicker";
import { API_URL } from "@/constants";

export default function NewTrip() {
  const [routeId, setRouteId] = useState("");
  const [busId, setBusId] = useState("");
  const [tripDate, setDate] = useState("");
  const [tripTime, setTripTime] = useState("");
  const [tripPrice, setTripPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      routeId,
      busId,
      tripDate,
      tripTime,
      tripPrice,
    };

    await fetch(`${API_URL}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(payload);
    alert("Viaje registrado");
  };

  return (
    <Card className="max-w-xl p-4">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectRoute value={routeId} onChange={setRouteId} />
          <SelectBus value={busId} onChange={setBusId} />
          <DatePicker value={tripDate} onChange={setDate} />

          <Input
            label="Hora del viaje"
            type="time"
            value={tripTime}
            onChange={(e) => setTripTime(e.target.value)}
          />

          <Input
            label="Precio del viaje"
            type="number"
            placeholder="Ej. 50"
            value={tripPrice}
            onChange={(e) => setTripPrice(e.target.value)}
          />

          <Button type="submit" color="primary" className="w-full">
            Registrar Viaje
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
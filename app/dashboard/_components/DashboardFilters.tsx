"use client";

import { Button, Input } from "@nextui-org/react";
import SelectDestination from "./filters/SelectDestination";
import SelectOrigin from "./filters/SelectOrigin";
import { useState } from "react";

interface Props {
  filters: any;
  setFilters: (f: any) => void;
  setSearchTrigger: (n: number) => void;
}

export default function DashboardFilters({ filters, setFilters, setSearchTrigger }: Props) {
  const handleChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFilters({
      year: "",
      month: "",
      day: "",
      origin: "",
      destination: "",
      tripDate: "",
      tripTime: "",
    });
    setSearchTrigger(Date.now());
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-center">Elige tu destino</h1>

      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center gap-3 md:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SelectOrigin origin={filters.origin} onChange={(v) => handleChange("origin", v)} />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SelectDestination destination={filters.destination} onChange={(v) => handleChange("destination", v)} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-72">
          <Input
            label="Fecha"
            type="date"
            value={filters.tripDate || ""}
            onChange={(e) => handleChange("tripDate", e.target.value)}
            className="flex-1"
          />
          <Input
            label="Hora"
            type="time"
            step={1}
            value={filters.tripTime || ""}
            onChange={(e) => handleChange("tripTime", e.target.value)}
            className="w-36 ml-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleClear} className="bg-white text-black border border-gray-200">Limpiar</Button>
          <Button onClick={() => setSearchTrigger(Date.now())} className="bg-green-700">Buscar</Button>
        </div>
      </div>
    </div>
  );
}

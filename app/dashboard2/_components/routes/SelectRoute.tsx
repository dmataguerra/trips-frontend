"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Route } from "@/entities";
import { API_URL } from "@/constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectRoute({ value, onChange }: Props) {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then((res) => res.json())
      .then((data) => setRoutes(data))
      .catch((err) => console.error("Error fetching routes:", err));
  }, []);

  return (
    <Select
      label="Seleccione una ruta"
      selectedKeys={[value]}
      onChange={(e) => onChange(e.target.value)}
    >
      {routes.map((r) => {
        const text = `${r.routeOrigin} - ${r.routeDestination}`;
        return (
          <SelectItem
            key={r.routeId}
            textValue={text}
          >
            {text}
          </SelectItem>
        );
      })}
    </Select>
  );
}
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Route } from "@/entities";
import { API_URL } from "@/constants";

export default function RouteSelect({ value, onChange }) {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  return (
    <Select
      label="Seleccione una ruta"
      selectedKeys={[value]}
      onChange={(e) => onChange(e.target.value)}
    >
      {routes.map((route) => (
        <SelectItem key={route.routeId}>
          {route.routeOrigin} - {route.routeDestination}
        </SelectItem>
      ))}
    </Select>
  );
}
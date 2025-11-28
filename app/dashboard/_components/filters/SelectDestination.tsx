import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { getRoutes } from "../../api/routes";

interface Props {
  destination: string;
  onChange: (value: string) => void;
}

export default function SelectDestination({ destination, onChange }: Props) {
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    getRoutes().then((routes) => {
      const unique = Array.from(
        new Set(routes.map((r: any) => r.routeDestination))
      );
      setDestinations(unique);
    });
  }, []);

  return (
    <Select
      label="Destino"
      selectedKeys={[destination]}
      onChange={(e) => onChange(e.target.value)}
    >
      {destinations.map((d) => (
        <SelectItem key={d}>{d}</SelectItem>
      ))}
    </Select>
  );
}
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { getRoutes } from "../../api/routes";

interface Props {
  origin: string;
  onChange: (value: string) => void;
}

export default function SelectOrigin({ origin, onChange }: Props) {
  const [origins, setOrigins] = useState<string[]>([]);

  useEffect(() => {
    getRoutes().then((routes) => {
      const unique = Array.from(
        new Set(routes.map((r: any) => r.routeOrigin))
      );
      setOrigins(unique);
    });
  }, []);

  return (
    <Select
      label="Origen"
      selectedKeys={[origin]}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4"
    >
      {origins.map((o) => (
        <SelectItem key={o}>{o}</SelectItem>
      ))}
    </Select>
  );
}
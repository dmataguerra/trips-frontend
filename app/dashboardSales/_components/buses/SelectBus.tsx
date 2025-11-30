"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Bus } from "@/entities";
import { API_URL } from "@/constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectBus({ value, onChange }: Props) {
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/buses`)
      .then((res) => res.json())
      .then((data) => setBuses(data));
  }, []);

  return (
    <Select
      label="Seleccione un autobús"
      selectedKeys={[value]}
      onChange={(e) => onChange(e.target.value)}
    >
      {buses.map((bus) => (
        <SelectItem key={bus.busId}>{bus.busName}</SelectItem>
      ))}
    </Select>
  );
}
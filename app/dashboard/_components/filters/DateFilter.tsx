import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  filters: any;
  onChange: (key: string, value: string) => void;
}

export default function DateFilter({ filters, onChange }: Props) {
  const years = ["2025", "2026", "2027"];
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <Select
        label="Día"
        selectedKeys={[filters.day]}
        onChange={(e) => onChange("day", e.target.value)}
      >
        {days.map((d) => (
          <SelectItem key={d}>{d}</SelectItem>
        ))}
      </Select>

      <Select
        label="Mes"
        selectedKeys={[filters.month]}
        onChange={(e) => onChange("month", e.target.value)}
      >
        {months.map((m) => (
          <SelectItem key={m}>{m}</SelectItem>
        ))}
      </Select>

      <Select
        label="Año"
        selectedKeys={[filters.year]}
        onChange={(e) => onChange("year", e.target.value)}
      >
        {years.map((y) => (
          <SelectItem key={y}>{y}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
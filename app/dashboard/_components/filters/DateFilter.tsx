import { Calendar } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
  filters: any;
  onChange: (key: string, value: string) => void;
}

export default function DateFilter({ filters, onChange }: Props) {
  const [selected, setSelected] = useState<Date | null | undefined>(
    filters?.tripDate ? new Date(filters.tripDate) : undefined
  );

  useEffect(() => {
    setSelected(filters?.tripDate ? new Date(filters.tripDate) : undefined);
  }, [filters?.tripDate]);

  const handleDateChange = (value: any) => {
    let date: Date | undefined;

    if (!value) {
      date = undefined;
    } else if (value instanceof Date) {
      date = isNaN(value.getTime()) ? undefined : value;
    } else if (Array.isArray(value)) {
      const valid = value.filter((v) => v instanceof Date && !isNaN(v.getTime()));
      date = valid.length > 0 ? valid[0] : undefined;
    } else if (typeof value === "string") {
      const d = new Date(value);
      date = isNaN(d.getTime()) ? undefined : d;
    } else if (value && typeof value === "object") {
      const candidate = (value.start && value.start instanceof Date && !isNaN(value.start.getTime()))
        ? value.start
        : (value.end && value.end instanceof Date && !isNaN(value.end.getTime()))
        ? value.end
        : undefined;
      date = candidate;
    }

    if (date) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const formatted = `${yyyy}-${mm}-${dd}`;
      setSelected(date);
      onChange("tripDate", formatted);
    } else {
      setSelected(undefined);
      onChange("tripDate", "");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
      <Calendar
        showMonthAndYearPickers
        aria-label="Fecha (selección rápida de mes y año)"
        className="w-80%"
        onChange={(v: any) => handleDateChange(v)}
        // pass undefined instead of null when no selection to avoid
        // internal range-formatting errors in the calendar
        value={selected as any}
      />
    </div>
  );
}
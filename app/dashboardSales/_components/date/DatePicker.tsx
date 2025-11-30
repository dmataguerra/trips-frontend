"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Fecha del viaje</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded"
      />
    </div>
  );
}
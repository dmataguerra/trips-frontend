"use client";
import { Select, SelectItem } from "@nextui-org/react";

export default function UserTypeSelector({ userType, setUserType }: any) {
  const options = [
    { label: "Cliente", value: "cliente" },
    { label: "Empleado", value: "empleado" },
  ];

  return (
    <Select
      label="Entrar como"
      selectedKeys={[userType]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0] as string;
        setUserType(value);
      }}
      className="text-white"
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
import { Card, CardBody, Button } from "@nextui-org/react";
import DateFilter from "./DateFilter";
import SelectOrigin from "./SelectOrigin";
import SelectDestination from "./SelectDestination";

interface Props {
  filters: any;
  setFilters: (f: any) => void;
  setSearchTrigger: (n: number) => void;
}

export default function FilterPanel({ filters, setFilters, setSearchTrigger }: Props) {
  const handleChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-4 shadow bg-white">
      <CardBody>
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
          Busca tu mejor opción
        </h2>

        <DateFilter filters={filters} onChange={handleChange} />

        <SelectOrigin
          origin={filters.origin}
          onChange={(v) => handleChange("origin", v)}
        />

        <SelectDestination
          destination={filters.destination}
          onChange={(v) => handleChange("destination", v)}
        />

        <Button
          className="mt-4 bg-green-600 text-white"
          onClick={() => setSearchTrigger(Date.now())}
        >
          Buscar
        </Button>
      </CardBody>
    </Card>
  );
}
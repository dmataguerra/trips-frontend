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

  const handleClear = () => {
    setFilters({
      year: "",
      month: "",
      day: "",
      origin: "",
      destination: "",
      tripDate: "",
    });
  };

  return (
    <Card className="p-4 shadow bg-white">
      <CardBody>
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
          Busca tu mejor opción
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-3/5">
            <DateFilter filters={filters} onChange={handleChange} />
          </div>

          <div className="md:w-2/5 flex flex-col gap-4 pt-6 md:pt-10">
            <SelectOrigin
              origin={filters.origin}
              onChange={(v) => handleChange("origin", v)}
            />

            <SelectDestination
              destination={filters.destination}
              onChange={(v) => handleChange("destination", v)}
            />

            <div className="mt-2 md:mt-4 md:self-end flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-50"
                onClick={handleClear}
              >
                Limpiar
              </button>

              <Button
                className="bg-green-600 text-white"
                onClick={() => setSearchTrigger(Date.now())}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
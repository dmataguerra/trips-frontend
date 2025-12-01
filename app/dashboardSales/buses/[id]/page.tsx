import Header from "../../_components/Header";
import FormUpdateBus from "./_components/FormUpdateBus";
import TripsListB from "./_components/TrpsListB";

export default function BusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-6 gap-6">
        <div className="w-1/3 min-w-[300px]">
          <FormUpdateBus />
        </div>

        <div className="flex-1 overflow-y-auto">
          <TripsListB />
        </div>
      </div>
    </div>
  );
}
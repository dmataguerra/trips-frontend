import Header from "../_components/Header";
import NewBus from "./_components/NewBus";
import BusesList from "./_components/BusesList";

export default function BusesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-6 gap-6">
        <div className="w-1/3 min-w-[300px]">
          <NewBus />
        </div>

        <div className="flex-1 overflow-y-auto">
          <BusesList />
        </div>
      </div>
    </div>
  );
}
import Header from "./_components/Header";
import NewTrip from "./_components/NewTrip";
import TripsList from "./_components/TripsList";

export default function DashboardSales() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-6 gap-6">
        <div className="w-1/3 min-w-[300px]">
          <NewTrip />
        </div>

        <div className="flex-1 overflow-y-auto">
          <TripsList />
        </div>
      </div>
    </div>
  );
}
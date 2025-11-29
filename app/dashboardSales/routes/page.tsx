import Header from "../_components/Header";
import NewRoute from "./_components/NewRoute";
import RoutesList from "./_components/RoutesList";


export default function RoutesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-6 gap-6">
        <div className="w-1/3 min-w-[300px]">
          <NewRoute />
        </div>

        <div className="flex-1 overflow-y-auto">
          <RoutesList />
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import FilterPanel from "./_components/filters/FilterPanel";
import TripList from "./_components/trips/TripList";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    day: "",
    origin: "",
    destination: "",
  });
  
  const [searchTrigger, setSearchTrigger] = useState(0);

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-6 border-r bg-green-50">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          setSearchTrigger={setSearchTrigger}
        />
      </div>

      <div className="w-1/2 p-6">
        <TripList filters={filters} searchTrigger={searchTrigger} />
      </div>
    </div>
  );
}
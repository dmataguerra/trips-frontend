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
    <>
      <div className="rounded-lg bg-gray-100/60 p-6 mb-6">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          setSearchTrigger={setSearchTrigger}
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Trip Results</h2>

      <div className="rounded-lg bg-gray-100/60 p-6">
        <TripList filters={filters} searchTrigger={searchTrigger} />
      </div>
    </>
  );
}
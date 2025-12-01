"use client";
import { useState } from "react";
import TripList from "./_components/trips/TripList";
import DashboardFilters from "./_components/DashboardFilters";
import BenefitsSection from "./_components/BenefitsSection";

export default function Dashboard() {
  const [filters, setFilters] = useState<any>({
    year: "",
    month: "",
    day: "",
    origin: "",
    destination: "",
  });
  
  const [searchTrigger, setSearchTrigger] = useState(0);

  return (
    <>
      <section className="mb-8">
        <DashboardFilters
          filters={filters}
          setFilters={setFilters}
          setSearchTrigger={(n) => setSearchTrigger(n)}
        />
      </section>

      <section className="mb-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Resultados</h2>
          <TripList filters={filters} searchTrigger={searchTrigger} />
        </div>
      </section>

      <section className="mb-8">
        <div className="max-w-5xl mx-auto px-4">
          <BenefitsSection />
        </div>
      </section>

      {/* Bottom trip list removed — using TripList in center section */}
    </>
  );
}
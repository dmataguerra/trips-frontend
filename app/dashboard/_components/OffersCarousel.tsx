"use client";

import React, { useEffect, useRef, useState } from "react";
import RouteCard from "@/app/(landing)/_components/RouteCard";
import { API_URL } from "@/constants";

export default function OffersCarousel() {
  const [slides, setSlides] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch(`${API_URL}/routes`);
        const data = await res.json();
        const withImage = data.filter((r: any) => r.image);
        const mapped = withImage.slice(0, 5).map((route: any) => ({
          id: route.routeId,
          origin: route.routeOrigin,
          destination: route.routeDestination,
          image: route.image,
        }));
        setSlides(mapped);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 overflow-x-auto py-6" ref={containerRef}>
        {slides.map((s, idx) => (
          <div key={s.id} className={`flex-shrink-0 w-72 ${selected === idx ? "ring-4 ring-green-400" : ""}`}>
            <div onClick={() => setSelected(idx)}>
              <RouteCard route={s} />
            </div>
          </div>
        ))}

        {slides.length === 0 && (
          <div className="text-center w-full py-12">No hay ofertas de última hora disponibles.</div>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Card, CardFooter, Button } from "@nextui-org/react";

type Route = {
  id: string;
  origin: string;
  destination: string;
  image?: string;
  duration?: string;
  priceExample?: string;
};

export default function RouteCard({ route }: { route: Route }) {
  const src = route.image ? encodeURI(route.image) : `/images/${encodeURIComponent(route.destination)}.jpg`;

  return (
    <Card isFooterBlurred className="border-none relative overflow-hidden max-w-[320px] mx-auto h-[320px] md:h-[380px]" radius="lg">
      <div className="absolute inset-0">
        <Image
          alt={`${route.origin} a ${route.destination}`}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 420px"
          src={src}
        />
      </div>

      <CardFooter className="justify-between before:bg-white/10 border-white/20 border overflow-hidden py-2 absolute before:rounded-xl rounded-lg bottom-3 left-3 right-3 shadow-sm z-20 backdrop-blur-sm bg-white/10">
        <div>
          <p className="text-xs text-white/90">{route.origin} — {route.destination}</p>
          {route.duration && (
            <p className="text-2xs text-white/80">{route.duration} • {route.priceExample}</p>
          )}
        </div>

        <Button
          className="text-xs text-white bg-black/20 backdrop-blur-sm z-30"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Ver ruta
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { Card, CardBody } from "@nextui-org/react";

const benefits = [
  { title: "Reserva rápida", subtitle: "Reserva en segundos", text: "Encuentra y reserva rápido con nuestros flujos optimizados." },
  { title: "Boletos flexibles", subtitle: "Cambia tus planes fácilmente", text: "Gestiona reservas y cambios sin complicaciones." },
  { title: "Servicio confiable", subtitle: "Seguro y confiable", text: "Colaboramos con transportistas verificados para viajes seguros." },
];

export default function BenefitsSection() {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">¿Por qué elegir Chihuahueños?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <Card key={b.title} className="p-4 rounded-lg shadow-sm">
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-700 rounded-md p-2">✓</div>
                <div>
                  <h4 className="text-lg font-semibold">{b.title}</h4>
                  <p className="text-sm text-gray-600">{b.subtitle}</p>
                  <p className="text-sm mt-2 text-gray-500">{b.text}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

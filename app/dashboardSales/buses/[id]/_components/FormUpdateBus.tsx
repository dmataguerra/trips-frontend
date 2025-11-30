"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/constants";

export default function FormUpdateBus() {
  const { id } = useParams();
  const router = useRouter();

  const [busName, setBusName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBus = async () => {
      const res = await fetch(`${API_URL}/buses/${id}`);
      const bus = await res.json();

      setBusName(bus.busName);
      setLoading(false);
    };

    fetchBus();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { busName };

    await fetch(`${API_URL}/buses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Camión actualizado");
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que deseas eliminar este camión?")) return;

    await fetch(`${API_URL}/buses/${id}`, { method: "DELETE" });

    alert("Camión eliminado");
    router.push("/dashboardSales/buses");
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <Card className="max-w-xl p-4">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre del camión"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />

          <Button type="submit" color="primary" className="w-full">
            Guardar cambios
          </Button>

          <Button color="danger" className="w-full" onPress={handleDelete}>
            Eliminar camión
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import SelectBus from "../../../_components/buses/SelectBus";
import SelectRoute from "../../../_components/routes/SelectRoute";
import DatePicker from "../../../_components/date/DatePicker";
import { API_URL } from "@/constants";
import { useParams, useRouter } from "next/navigation";

export default function FormUpdateTrip() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [routeId, setRouteId] = useState("");
    const [busId, setBusId] = useState("");
    const [tripDate, setDate] = useState("");
    const [tripTime, setTripTime] = useState("");
    const [tripPrice, setTripPrice] = useState("");

    useEffect(() => {
        const fetchTrip = async () => {
            const res = await fetch(`${API_URL}/trips/${id}`);
            const trip = await res.json();

            setRouteId(trip.routeId);
            setBusId(trip.busId);
            setDate(trip.tripDate.split("T")[0]);
            setTripTime(trip.tripTime);
            setTripPrice(trip.tripPrice);

            setLoading(false);
        };

        fetchTrip();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            routeId,
            busId,
            tripDate,
            tripTime,
            tripPrice,
        };

        await fetch(`${API_URL}/trips/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        alert("Viaje actualizado");
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("¿Seguro que deseas eliminar este viaje?");
        if (!confirmDelete) return;

        await fetch(`${API_URL}/trips/${id}`, {
            method: "DELETE",
        });

        alert("Viaje eliminado");

        router.push("/dashboardSales");
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <Card className="w-full p-4">
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <SelectRoute value={routeId} onChange={setRouteId} />
                    <SelectBus value={busId} onChange={setBusId} />
                    <DatePicker value={tripDate} onChange={setDate} />

                    <Input
                        label="Hora del viaje"
                        type="time"
                        value={tripTime}
                        onChange={(e) => setTripTime(e.target.value)}
                    />

                    <Input
                        label="Precio del viaje"
                        type="number"
                        value={tripPrice}
                        onChange={(e) => setTripPrice(e.target.value)}
                    />

                    <Button type="submit" color="primary" className="w-full">
                        Guardar cambios
                    </Button>

                    <Button color="danger" className="w-full" onPress={handleDelete}>
                    Eliminar viaje
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
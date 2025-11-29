"use client";

import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { API_URL } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function FormUpdateRoute() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [routeOrigin, setRouteOrigin] = useState("");
    const [routeDestination, setRouteDestination] = useState("");

    useEffect(() => {
        const fetchRoute = async () => {
            const res = await fetch(`${API_URL}/routes/${id}`);
            const route = await res.json();

            setRouteOrigin(route.routeOrigin);
            setRouteDestination(route.routeDestination);

            setLoading(false);
        };

        fetchRoute();
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            routeOrigin,
            routeDestination,
        };

        await fetch(`${API_URL}/routes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        console.log(payload);
        alert("Ruta actualizada");
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <Card className="max-w-xl p-4">
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Lugar de origen"
                        type="text"
                        value={routeOrigin}
                        onChange={(e) => setRouteOrigin(e.target.value)}
                    />

                    <Input
                        label="Lugar de destino"
                        type="text"
                        value={routeDestination}
                        onChange={(e) => setRouteDestination(e.target.value)}
                    />


                    <Button type="submit" color="primary" className="w-full">
                        Guardar cambios
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
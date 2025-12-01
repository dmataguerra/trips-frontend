"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import { Booking } from "@/entities";
import BookingCard from "./BookingCard";

export default function BookingsList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${API_URL}/bookings/my-bookings`, {
                credentials: "include",
            });

            if (!res.ok) throw new Error("Error fetching bookings");

            const data: Booking[] = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) return <p>Cargando tus reservas...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    if (bookings.length === 0)
        return <p className="text-gray-600">No hay reservas registradas</p>;

    return (
        <div className="space-y-4">
            <h1 className="text-center text-2xl font-bold text-green-800">Compras</h1>
            {bookings.map((b) => (
                <BookingCard key={b.bookingId} booking={b} />
            ))}
        </div>
    );
}
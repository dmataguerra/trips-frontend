"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";

type Reservation = {
  reservationId: string;
  tripId: string;
  tripSeatId: string;
  status: string; // held | confirmed | cancelled
  expiresAt?: string; // ISO
};

export default function BookingClient({ reservationId }: { reservationId?: string }) {
  const router = useRouter();
  const resolvedReservationId = reservationId ?? (typeof window !== 'undefined' ? localStorage.getItem('reservationId') || undefined : undefined);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!resolvedReservationId) {
      setLoading(false);
      return;
    }
    let mounted = true;
    const fetchReservation = async () => {
      setLoading(true);
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      const token = localStorage.getItem('token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_URL}/reservations/${resolvedReservationId}`, { credentials: 'include', headers });
      if (res.ok) {
        const data = await res.json();
        if (mounted && data) setReservation(data as Reservation);
      }
      if (mounted) setLoading(false);
    };

    fetchReservation();
    return () => {
      mounted = false;
    };
  }, [resolvedReservationId]);

  const handleBook = async () => {
    if (!resolvedReservationId || !reservation?.tripSeatId) return;
    setConfirming(true);
    const headers: Record<string,string> = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const bookUrl = `${API_URL}/tripseats/${reservation.tripSeatId}/book`;
    const userId = localStorage.getItem('userId') || undefined;
    const bookBody: any = {};
    if (userId) bookBody.userId = userId;
    const bookRes = await fetch(bookUrl, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(bookBody),
    });
    if (bookRes.ok) {
      router.push('/dashboard/bookings');
    } else {
      router.push('/dashboard');
    }
    setConfirming(false);
  };

  if (loading) return <div>Cargando información de reserva...</div>;
  if (!reservation) return <div>No se encontró la reserva.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Confirmar compra</h2>
      <p className="mb-2">Reserva: {reservation.reservationId}</p>
      <p className="mb-2">Trip: {reservation.tripId}</p>
      <p className="mb-2">Asiento: {reservation.tripSeatId}</p>

      <div className="flex gap-3 mt-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={handleBook}
          disabled={confirming}
        >
          {confirming ? "Procesando..." : "Pagar y confirmar compra"}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md"
          onClick={() => router.push('/dashboard')}
          disabled={confirming}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

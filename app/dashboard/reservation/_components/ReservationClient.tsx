"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";

//Utilizamos un tipo reservation debido a la complicación de no tener una entidad como tal de reservations.
type Reservation = {
  reservationId: string;
  tripId: string;
  tripSeatId: string;
  status: string;
  expiresAt?: string;
};

export default function ReservationClient({ reservationId }: { reservationId?: string }) {
  const router = useRouter();
  const resolvedReservationId = reservationId ?? (typeof window !== 'undefined' ? localStorage.getItem('reservationId') || undefined : undefined);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!resolvedReservationId) {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('lastReservation') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        const reservationFromLocal: Reservation = {
          reservationId: parsed?.reservationId || `local-${parsed?.tripSeatId ?? Date.now()}`,
          tripId: parsed?.tripId,
          tripSeatId: parsed?.tripSeatId || parsed?.tripSeatId,
          status: parsed?.status || 'reserved',
          expiresAt: parsed?.expiresAt || (parsed?.reservedAt ? new Date(new Date(parsed.reservedAt).getTime() + 5 * 60 * 1000).toISOString() : undefined),
        };
        setReservation(reservationFromLocal);
      }
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchReservation = async () => {
      setLoading(true);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
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

  useEffect(() => {
    if (!reservation?.expiresAt) return;
    const update = () => {
      const expires = new Date(reservation.expiresAt!).getTime();
      const diff = expires - Date.now();
      if (diff <= 0) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        setRemaining(0);
        router.push('/dashboard');
      } else {
        setRemaining(diff);
      }
    };
    update();
    timerRef.current = window.setInterval(update, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [reservation, router]);

  const handleConfirm = async () => {
    const id = reservationId ?? resolvedReservationId;
    if (!id || !reservation?.tripSeatId) return;
    if (remaining !== null && remaining <= 0) {
      alert('El tiempo de reserva expiró');
      router.push('/dashboard');
      return;
    }
    router.push(`/dashboard/booking?reservationId=${encodeURIComponent(id)}`);
  };

  const formatRemaining = (ms: number | null) => {
    if (ms == null) return "--:--";
    const total = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (loading) return <div>Cargando reserva...</div>;
  if (!reservation) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Completar compra</h2>
      <p className="mb-2">Reserva: {reservation.reservationId}</p>
      <p className="mb-2">Trip: {reservation.tripId}</p>
      <p className="mb-2">Asiento: {reservation.tripSeatId}</p>
      <p className="mb-4">Tiempo restante: {formatRemaining(remaining)}</p>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={handleConfirm}
          disabled={confirming}
        >
          {confirming ? "Confirmando..." : "Confirmar compra"}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md"
          onClick={() => router.push("/dashboard")}
          disabled={confirming}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

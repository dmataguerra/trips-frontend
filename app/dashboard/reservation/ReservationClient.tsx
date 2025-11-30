"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Reservation = {
  reservationId: string;
  tripId: string;
  tripSeatId: string;
  status: string; // held | confirmed | cancelled
  expiresAt?: string; // ISO
};

export default function ReservationClient({ reservationId }: { reservationId?: string }) {
  const router = useRouter();
  // fallback: if reservationId not provided via searchParams, try localStorage
  const resolvedReservationId = reservationId ?? (typeof window !== 'undefined' ? localStorage.getItem('reservationId') || undefined : undefined);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // If we don't have a reservation id, try to load a fallback from localStorage
    if (!resolvedReservationId) {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('lastReservation') : null;
        if (raw) {
          const parsed = JSON.parse(raw);
          // if backend returned tripSeat-like object, build a Reservation object
          const reservationFromLocal: Reservation = {
            reservationId: parsed?.reservationId || `local-${parsed?.tripSeatId ?? Date.now()}`,
            tripId: parsed?.tripId,
            tripSeatId: parsed?.tripSeatId || parsed?.tripSeatId,
            status: parsed?.status || 'reserved',
            expiresAt: parsed?.expiresAt || (parsed?.reservedAt ? new Date(new Date(parsed.reservedAt).getTime() + 5 * 60 * 1000).toISOString() : undefined),
          };
          setReservation(reservationFromLocal);
          setLoading(false);
        } else {
          console.warn("ReservationClient: missing reservationId (no query param and no localStorage)");
          // leave loading true so UI shows loading state until user navigates or data available
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('ReservationClient: error reading lastReservation from localStorage', e);
        setLoading(false);
        return;
      }
    }

    let mounted = true;
    const fetchReservation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/reservations/${resolvedReservationId}`);
        if (!res.ok) throw new Error("No se encontró la reserva");
        const data = await res.json();
        if (mounted) setReservation(data as Reservation);
      } catch (e) {
        // keep user on page for debugging instead of redirecting
        console.warn("ReservationClient: fetchReservation error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReservation();
    return () => {
      mounted = false;
    };
  }, [resolvedReservationId, router]);

  useEffect(() => {
    if (!reservation?.expiresAt) return;
    const update = () => {
      const expires = new Date(reservation.expiresAt!).getTime();
      const diff = expires - Date.now();
      if (diff <= 0) {
        // expired: clear timer, set remaining to 0 and redirect to dashboard
        if (timerRef.current) window.clearInterval(timerRef.current);
        setRemaining(0);
        router.push("/dashboard");
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
    if (!(reservationId ?? resolvedReservationId) || !reservation?.tripSeatId) return;
    // disable if expired
    if (remaining !== null && remaining <= 0) {
      alert('El tiempo de reserva expiró');
      router.push('/dashboard');
      return;
    }
    setConfirming(true);
    try {
      // prepare headers (include token if present)
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      try {
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
      } catch (e) {
        console.warn('ReservationClient: cannot read token', e);
      }
      // Call backend book endpoint which atomically creates Booking and marks seat as BOOKED
      const bookUrl = `http://localhost:4000/tripseats/${reservation.tripSeatId}/book`;
      // attempt to include userId from localStorage as body (backend can also extract from token)
      let userId: string | undefined = undefined;
      try {
        userId = localStorage.getItem('userId') || undefined;
      } catch (e) {
        console.warn('ReservationClient: cannot read userId from localStorage', e);
      }
      const bookBody: any = {};
      if (userId) bookBody.userId = userId;

      const bookRes = await fetch(bookUrl, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(bookBody),
      });

      if (bookRes.status === 409) {
        const t = await bookRes.text().catch(() => '');
        throw new Error('El asiento ya está reservado o booked. ' + t);
      }
      if (bookRes.status === 404) {
        const t = await bookRes.text().catch(() => '');
        throw new Error('Asiento o usuario no encontrado. ' + t);
      }
      if (!bookRes.ok) {
        const t = await bookRes.text().catch(() => '');
        throw new Error(`Error al reservar: ${bookRes.status} ${t}`);
      }

      const booking = await bookRes.json().catch(() => null);
      console.log('ReservationClient: booking created', booking);
      // success: navigate to dashboard bookings
      router.push('/dashboard/bookings');
    } catch (e) {
      alert((e as any)?.message || 'Error al confirmar la compra');
    } finally {
      setConfirming(false);
    }
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

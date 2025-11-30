"use client";

import { useEffect, useState } from "react";
import SelectSeat from "./SelectSeat";
import { Tripseat } from "@/entities";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";

export default function SeatsLoader({ tripId }: { tripId: string }) {
  const [seats, setSeats] = useState<Tripseat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<string | undefined>(undefined);
  const [reserving, setReserving] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    let mounted = true;
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const url = `${API_URL}/tripseats/trip/${tripId}`;
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) {
          throw new Error("Error fetching seats");
        }
        const data = await res.json().catch(() => null);
        // Support responses like { seats: [...] } or direct array
        if (Array.isArray(data)) {
          if (mounted) setSeats(data as any);
        } else if (data && Array.isArray((data as any).seats)) {
          if (mounted) setSeats((data as any).seats);
        } else {
          if (mounted) setSeats([]);
        }
      } catch (e) {
        // ignore fetch error; show empty list
        if (mounted) setSeats([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSeats();
    return () => {
      mounted = false;
    };
  }, [tripId]);

  if (loading) return <div>Cargando asientos...</div>;
  const handleProceed = async () => {
    if (!selectedSeat) return;
    setReserving(true);
    try {
      // Obtain current userId from backend (if available) or require it in the body
      let userId: string | undefined = undefined;
      try {
        // Helpful debug: check cookies and localStorage before calling /auth/me

        // check cookies/localStorage silently

        // If we have a cached userId in localStorage use it as a fast path
        try {
          const cached = localStorage.getItem("userId");
          if (cached) {
            userId = cached;
          }
        } catch (_e) {
          // ignore
        }

        if (!userId) {
          const meRes = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
          try {
            // try to read text for richer debug (in case backend returns non-json)
            const meText = await meRes.text().catch(() => null);
            let meBody: any = null;
            try {
              meBody = meText ? JSON.parse(meText) : null;
            } catch (e) {
              meBody = { raw: meText };
            }
            // ignore me body for debug
            if (meRes.ok && meBody) {
              userId = meBody?.userId || meBody?.id || meBody?.user?.id || meBody?.userId;
              if (userId) {
                try { localStorage.setItem('userId', userId); } catch (_e) { }
              }
            }
          } catch (_inner) {
            // ignore
          }
        }
      } catch (err) {
        // ignore
      }

      if (!userId) {
        // userId not found
        alert("No se encontró usuario autenticado. Inicia sesión o proporciona userId. Revisa que las cookies se estén enviando y que el backend exponga /auth/me.");
        setReserving(false);
        return;
      }

      const url = `${API_URL}/tripseats/${selectedSeat}/reserve`;
      const payload = { userId };
      
      // Include Authorization header from localStorage token if present (backend may accept it)
      const headers: Record<string,string> = { "Content-Type": "application/json" };
      try {
        const token = localStorage.getItem('token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (_e) {
        // ignore
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const text = await res.text().catch(() => "");
      let body: any = null;
      try {
        body = text ? JSON.parse(text) : null;
      } catch (_e) {
        body = { raw: text };
      }

      if (res.status === 200 || res.status === 201) {
        // success
        setSeats((prev) => prev?.map((s) => (s.tripSeatId === selectedSeat ? { ...s, status: "reserved" } : s)) ?? []);
        // try to extract reservationId from response body under common keys
        const reservationId = body?.reservationId || body?.id || body?.reservation?.id || body?.reservationId;
        try {
          localStorage.setItem('lastReservation', JSON.stringify(body ?? {}));
          if (reservationId) localStorage.setItem('reservationId', reservationId);
        } catch (_e) {
          // ignore
        }
        // navigate to reservation page; include query param when we have id
        router.push(`/dashboard/reservation${reservationId ? `?reservationId=${reservationId}` : ""}`);
        return;
      }

      if (res.status === 409) {
        // conflict: seat already taken
        alert(body?.error || "El asiento ya no está disponible");
        // reload seats to reflect current state
        setLoading(true);
        try {
          const reloadUrl = `${API_URL}/tripseats/trip/${tripId}`;
          const r = await fetch(reloadUrl, { credentials: "include" });
          const d = await r.json().catch(() => []);
          setSeats(Array.isArray(d) ? d : d?.seats ?? []);
        } catch (inner) {
          // ignore reload error
        } finally {
          setLoading(false);
        }
        return;
      }

      // other errors
      throw new Error(body?.error || "No se pudo reservar");
    } catch (e) {
      alert((e as any)?.message || "Error reservando asiento");
    } finally {
      setReserving(false);
    }
  };

  return (
    <div>
      <SelectSeat seats={seats ?? []} selected={selectedSeat} onSelectionChange={(id) => setSelectedSeat(id)} />
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
          disabled={!selectedSeat || reserving}
          onClick={handleProceed}
        >
          {reserving ? "Reservando..." : "Proceder a la compra"}
        </button>
      </div>
    </div>
  );
}

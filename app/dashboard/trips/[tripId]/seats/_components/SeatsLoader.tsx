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
        console.log("SeatsLoader: fetching seats", url);
        const res = await fetch(url, { credentials: "include" });
        console.log("SeatsLoader: fetch status", res.status);
        if (!res.ok) {
          console.error("SeatsLoader: fetch failed", res.status);
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
        console.error("SeatsLoader: error fetching seats", e);
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
        try {
          console.log("SeatsLoader: document.cookie ->", document.cookie);
        } catch (cErr) {
          console.warn("SeatsLoader: cannot read document.cookie", cErr);
        }
        try {
          console.log("SeatsLoader: localStorage token ->", localStorage.getItem("token"));
          console.log("SeatsLoader: localStorage userId ->", localStorage.getItem("userId"));
        } catch (sErr) {
          console.warn("SeatsLoader: cannot read localStorage", sErr);
        }

        // If we have a cached userId in localStorage use it as a fast path
        try {
          const cached = localStorage.getItem("userId");
          if (cached) {
            userId = cached;
            console.log("SeatsLoader.handleProceed: using cached userId", userId);
          }
        } catch (e) {
          console.warn("SeatsLoader: error reading cached userId", e);
        }

        if (!userId) {
          console.log(`SeatsLoader.handleProceed: calling ${API_URL}/auth/me with credentials`);
          const meRes = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
          console.log("SeatsLoader.handleProceed: /auth/me status", meRes.status);
          try {
            // try to read text for richer debug (in case backend returns non-json)
            const meText = await meRes.text().catch(() => null);
            let meBody: any = null;
            try {
              meBody = meText ? JSON.parse(meText) : null;
            } catch (e) {
              meBody = { raw: meText };
            }
            console.log("SeatsLoader.handleProceed: /auth/me body", meBody);
            if (meRes.ok && meBody) {
              userId = meBody?.userId || meBody?.id || meBody?.user?.id || meBody?.userId;
              if (userId) {
                try { localStorage.setItem('userId', userId); } catch (e) { console.warn('Cannot write localStorage userId', e) }
              }
            }
          } catch (inner) {
            console.warn("SeatsLoader.handleProceed: error parsing /auth/me response", inner);
          }
        }
      } catch (err) {
        console.warn("SeatsLoader.handleProceed: error fetching /auth/me", err);
      }

      if (!userId) {
        console.warn("SeatsLoader.handleProceed: userId not found. Cookies and /auth/me might be misconfigured.");
        alert("No se encontró usuario autenticado. Inicia sesión o proporciona userId. Revisa que las cookies se estén enviando y que el backend exponga /auth/me.");
        setReserving(false);
        return;
      }

      const url = `${API_URL}/tripseats/${selectedSeat}/reserve`;
      const payload = { userId };
      console.log("SeatsLoader.handleProceed: POST", url, payload);
      // Include Authorization header from localStorage token if present (backend may accept it)
      const headers: Record<string,string> = { "Content-Type": "application/json" };
      try {
        const token = localStorage.getItem('token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          console.log('SeatsLoader: using token from localStorage for Authorization header');
        }
      } catch (e) {
        console.warn('SeatsLoader: cannot read token from localStorage', e);
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(payload),
      });
      console.log("SeatsLoader.handleProceed: status", res.status);
      const text = await res.text().catch(() => "");
      let body: any = null;
      try {
        body = text ? JSON.parse(text) : null;
      } catch (e) {
        body = { raw: text };
      }
      console.log("SeatsLoader.handleProceed: body", body);

      if (res.status === 200 || res.status === 201) {
        // success
        setSeats((prev) => prev?.map((s) => (s.tripSeatId === selectedSeat ? { ...s, status: "reserved" } : s)) ?? []);
        // try to extract reservationId from response body under common keys
        const reservationId = body?.reservationId || body?.id || body?.reservation?.id || body?.reservationId;
        try {
          // store raw reservation body and id to localStorage as a fallback
          localStorage.setItem('lastReservation', JSON.stringify(body ?? {}));
          if (reservationId) localStorage.setItem('reservationId', reservationId);
        } catch (e) {
          console.warn('SeatsLoader: cannot write reservation to localStorage', e);
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
          console.error("SeatsLoader.handleProceed: reload error", inner);
        } finally {
          setLoading(false);
        }
        return;
      }

      // other errors
      throw new Error(body?.error || "No se pudo reservar");
    } catch (e) {
      console.error("SeatsLoader.handleProceed: error", e);
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

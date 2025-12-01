"use client";

import React, { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import { Button } from "@nextui-org/react";

export default function VerifyComponent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchMe = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json().catch(() => null);
          if (mounted) setUser(data);
        }
      } catch (_e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMe();
    return () => { mounted = false; };
  }, []);

  const handleOpen = () => {
    setMessage(null);
    setFile(null);
    setOpen(true);
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Selecciona un archivo");
    const id = user?.userId || user?.id;
    if (!id) return setMessage("No se pudo determinar el usuario autenticado");
    setSubmitting(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append("document", file);

      const headers: Record<string,string> = {};
      try {
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
      } catch (_e) {}

      const res = await fetch(`${API_URL}/auth/${id}`, {
        method: "PATCH",
        body: form,
        credentials: "include",
        headers,
      });

      if (res.ok) {
        const body = await res.json().catch(() => null);
        if (body?.userDocument) {
          try { localStorage.setItem("userDocument", body.userDocument); } catch (_e) {}
        }
        setMessage("Documento subido correctamente.");
        setOpen(false);
        // refresh local state
        setUser((prev:any) => ({ ...(prev || {}), userDocument: body?.userDocument ?? prev?.userDocument }));
      } else {
        const text = await res.text().catch(() => "");
        let body: any = null;
        try { body = text ? JSON.parse(text) : null; } catch (_e) { body = { raw: text }; }
        setMessage(body?.message || body?.error || "Error subiendo el documento");
      }
    } catch (e: any) {
      setMessage(e?.message || "Error de red");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  // If user has userDocument show a simple message
  const already = user?.userDocument;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Verificar usuario</h2>
      {already ? (
        <div className="mb-4">
          <p className="mb-2">Tu cuenta ya está verificada.</p>
          <a href={already} target="_blank" rel="noreferrer" className="text-indigo-600 underline">Ver documento</a>
        </div>
      ) : (
        <div className="mb-4">
          <p className="mb-2">Aún no has subido un documento de verificación.</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" onClick={handleOpen}>Verificate</button>
        </div>
      )}

      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}

      {/* Simple custom modal implemented with Tailwind to avoid NextUI incompatibilities */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sube tu documento</h3>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mb-4 w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => { setOpen(false); setFile(null); setMessage(null); }}
                disabled={submitting}
              >
                Cancelar
              </button>
              <Button
                onClick={handleUpload}
                disabled={submitting}
              >
                {submitting ? 'Subiendo...' : 'Subir y verificar'}
              </Button>
            </div>
            {message && <div className="mt-4 text-sm text-red-600">{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { API_URL } from "@/constants";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitting(true);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let authData: any = {}
        authData.userEmail = formData.get("userEmail")
        authData.userPassword = formData.get("userPassword")

        try {
                setError(null)
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(authData),
                    credentials: "include",
                })
                console.log('Login response status', response.status)
                if (response.status === 401) {
                    setError('Credenciales incorrectas')
                    return;
                }
                if (!response.ok) {
                    setError('Error en el servidor')
                    return;
                }

                // Backend sets httpOnly cookie "token". Try to fetch /auth/me to get userId.
                // Try to parse token and userId from the login response body (if backend returns it)
                try {
                    const maybeJson = await response.clone().text().catch(() => null);
                    let parsed: any = null;
                    try {
                        parsed = maybeJson ? JSON.parse(maybeJson) : null;
                    } catch (e) {
                        parsed = { raw: maybeJson };
                    }
                    console.log('Login response body (parsed)', parsed);
                    const tokenFromBody = parsed?.token || parsed?.accessToken || parsed?.data?.token;
                    const userIdFromBody = parsed?.userId || parsed?.id || parsed?.user?.id;
                    if (tokenFromBody) {
                        try { localStorage.setItem('token', tokenFromBody); } catch (e) { console.warn('Cannot write token to localStorage', e); }
                    }
                    if (userIdFromBody) {
                        try { localStorage.setItem('userId', userIdFromBody); } catch (e) { console.warn('Cannot write userId to localStorage', e); }
                    }
                } catch (parseErr) {
                    console.warn('Error parsing login response body', parseErr);
                }

                // Fallback: call /auth/me to obtain userId if not returned in login body
                try {
                    const meRes = await fetch(`${API_URL}/auth/me`, { credentials: 'include' })
                    console.log('/auth/me status', meRes.status)
                    if (meRes.ok) {
                        const me = await meRes.json().catch(() => null)
                        const userId = me?.userId || me?.id || me?.user?.id || me?.userId
                        if (userId) {
                            try { localStorage.setItem('userId', userId) } catch (e) { console.warn('Cannot write localStorage', e) }
                        }
                    }
                } catch (meErr) {
                    console.warn('Error fetching /auth/me after login', meErr)
                }

                router.push(`/dashboard`)
        } catch (e) {
            console.error('Login error', e)
            setError('Error de red')
        } finally {
            setSubmitting(false);
        }
        return;
    }
    return (
        <div className="flex flex-col justify-center bg-primary_dark shadow-md w-[60vh] h-[50vh] px-10 py-2 rounded-lg text-text_primary">
            <form onSubmit={handleSubmit}>
                <p className="text-2xl my-4 text-center text-white">
                    <b>Iniciar sesión</b>
                </p>

                <div className="flex flex-col gap-2 my-4 items-center">
                    <Input label="Email" name="userEmail" type="email" isRequired size="md" />
                    <Input label="Contraseña" name="userPassword" type="password" isRequired size="md" />
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <Button
                        className="bg-primary hover:bg-accent active:bg-primary_dark text-white"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? <Spinner size="md" /> : "Entrar"}
                    </Button>
                    {error && <div className="text-red-400 mt-2">{error}</div>}
                </div>
            </form>
        </div>
    );
}
"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/users/create";

export default function SignupPage() {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const result = await createUser(formData);

            if (result.success) {
                router.push("/dashboard");
            } else {
                console.error(result.message);
            }
        } catch (err) {
            console.error("Signup error:", err);
        }

        setSubmitting(false);
    };

    return (
        <div className="flex flex-col justify-center bg-surface w-[60vh] h-[60vh] px-10 py-2 rounded-lg text-text_primary">
            <form onSubmit={handleSubmit}>
                <p className="text-2xl my-4 text-center">
                    <b>Crear cuenta</b>
                </p>

                <div className="flex flex-col gap-3 my-4 items-center">

                    <Input 
                        label="Nombre" 
                        name="userName" 
                        type="text" 
                        isRequired 
                    />

                    <Input 
                        label="Email" 
                        name="userEmail" 
                        type="email" 
                        isRequired 
                    />

                    <Input 
                        label="Contraseña" 
                        name="userPassword" 
                        type="password" 
                        isRequired 
                    />

                    <Input 
                        label="Documento" 
                        name="userDocument" 
                        type="text" 
                    />
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <Button 
                        className="bg-primary hover:bg-accent active:bg-primary_dark text-white"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? <Spinner size="md" /> : "Registrarme"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
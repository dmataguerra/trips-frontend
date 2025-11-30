"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function HeroSection() {
    const words = ["Monterrey", "Guadalajara", "Ciudad de México"];
    const TYPING_SPEED = 80; 
    const DELETING_SPEED = 40; 
    const PAUSE_AFTER_WORD = 1200; 

    const [display, setDisplay] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            if (charIndex < currentWord.length) {
                timeout = setTimeout(() => {
                    setDisplay((d) => d + currentWord.charAt(charIndex));
                    setCharIndex((i) => i + 1);
                }, TYPING_SPEED);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_WORD);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplay((d) => d.slice(0, -1));
                    setCharIndex((i) => i - 1);
                }, DELETING_SPEED);
            } else {
                setIsDeleting(false);
                setWordIndex((w) => (w + 1) % words.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex]);

    useEffect(() => {
        setCharIndex(0);
    }, [wordIndex]);

    return (
        <section id="hero" className="bg-gradient-to-r from-white to-gradient_max min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-text_primary leading-tight">
                        Viaja fácilmente, entre los principales destinos: <span className="text-primary">{" "}</span>
                        <span className="inline">
                            <span className="text-primary_darker font-semibold" aria-live="polite">{display}</span>
                            <span className="ml-1 inline-block w-0.5 h-[1.25em] bg-primary_darker animate-pulse" aria-hidden="true" />
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-text_primary/90 max-w-lg">
                        Compra tus boletos en segundos para rutas como Oaxaca-Puebla, Chihuahua-Nuevo León,
                        Chihuahua-CDMX y más.
                    </p>

                    <div className="mt-8 flex items-center gap-6">
                        <Link href="/login" className="inline-block">
                            <Button color="primary">Comprar Boletos</Button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end hover:scale-105 transition-transform">
                        <Image
                            src="/images/hero-image.svg"
                            alt="Imagen ilustrativa de la plataforma"
                            width={560}
                            height={420}
                            className="object-contain"
                        />
                </div>
            </div>
        </section>
    );
}
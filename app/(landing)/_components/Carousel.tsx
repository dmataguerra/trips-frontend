"use client";

import React, { useEffect, useRef, useState } from "react";
import RouteCard from "./RouteCard";
import { ROUTES } from "../../../data/mock/routes";
import { API_URL } from "@/constants";

export default function Carousel() {
	const [slides, setSlides] = useState(ROUTES);

	const trackRef = useRef<HTMLDivElement | null>(null);
	const slideRef = useRef<HTMLDivElement | null>(null);
	const [index, setIndex] = useState<number>(0);
	const [slideWidth, setSlideWidth] = useState<number>(0);
	const [visible, setVisible] = useState<number>(1);
	const [maxIndex, setMaxIndex] = useState<number>(0);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

	useEffect(() => {
		const fetchRoutes = async () => {
			try {
				const res = await fetch(`${API_URL}/routes`);
				const data = await res.json();
				const withImage = data.filter((route: any) => route.image);
				if (withImage.length >= 5) {
					const mapped = withImage.slice(0, 10).map((route: any) => ({
						id: route.routeId,
						origin: route.routeOrigin,
						destination: route.routeDestination,
						image: route.image,
					}));
					setSlides(mapped);
				}
			} catch (error) {
				console.error("Error fetching routes:", error);
			}
		};
		fetchRoutes();
	}, []);

	useEffect(() => {
		function updateMeasurements() {
			const slideEl = slideRef.current;
			const container = trackRef.current?.parentElement as HTMLElement | null;
			if (!slideEl || !container) return;
			const sWidth = slideEl.offsetWidth;
			const cWidth = container.offsetWidth;
			setSlideWidth(sWidth);
			const visibleCount = Math.max(1, Math.floor(cWidth / sWidth));
			setVisible(visibleCount);
			setMaxIndex(Math.max(0, slides.length - visibleCount));
			setIndex((i) => Math.min(i, Math.max(0, slides.length - visibleCount)));
		}

		updateMeasurements();
		const ro = new ResizeObserver(() => updateMeasurements());
		if (trackRef.current?.parentElement) ro.observe(trackRef.current.parentElement);
		window.addEventListener("resize", updateMeasurements);
		return () => {
			try {
				ro.disconnect();
			} catch (e) {}
			window.removeEventListener("resize", updateMeasurements);
		};
	}, [slides.length]);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		const x = -index * slideWidth;
		track.style.transition = isTransitioning ? "transform 450ms cubic-bezier(.2,.9,.2,1)" : "none";
		track.style.transform = `translate3d(${x}px,0,0)`;
	}, [index, slideWidth, isTransitioning]);

	function goNext() {
		setIsTransitioning(true);
		setIndex((i) => Math.min(i + 1, maxIndex));
	}
	function goPrev() {
		setIsTransitioning(true);
		setIndex((i) => Math.max(i - 1, 0));
	}

	return (
		<section id="destinations" className="py-12 bg-neutral-100">
			<div className="max-w-7xl mx-auto px-4">
				<div className="bg-gray-100 rounded-xl p-6 relative">
					<h2 className="text-center font-semibold text-lg md:text-2xl">A dónde te gustaría viajar?</h2>
					<div className="mt-6 overflow-hidden">
						<div ref={trackRef} className="flex will-change-transform" onTransitionEnd={() => setIsTransitioning(false)}>
							{slides.map((s, idx) => (
								<div
									key={`${s.id}-${idx}`}
									ref={idx === 0 ? slideRef : undefined}
									className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 pt-6"
								>
									<div className="max-w-[320px] mx-auto">
										<RouteCard route={s} />
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="absolute left-4 top-1/2 -translate-y-1/2">
						<button
							aria-label="Anterior"
							className={`p-2 rounded-full bg-white/80 hover:bg-white ${index <= 0 ? "opacity-40 pointer-events-none" : ""}`}
							onClick={goPrev}
							disabled={index <= 0}
						>
							‹
						</button>
					</div>
					<div className="absolute right-4 top-1/2 -translate-y-1/2">
						<button
							aria-label="Siguiente"
							className={`p-2 rounded-full bg-white/80 hover:bg-white ${index >= maxIndex ? "opacity-40 pointer-events-none" : ""}`}
							onClick={goNext}
							disabled={index >= maxIndex}
						>
							›
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}


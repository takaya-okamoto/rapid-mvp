"use client";

import type React from "react";

import { debounce, lerp } from "@/utils/animation";
import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
	children: React.ReactNode;
	className?: string;
	speed?: number;
}

export function ParallaxSection({
	children,
	className = "",
	speed = 0.1,
}: ParallaxSectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState(0);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		let currentOffset = 0;
		let targetOffset = 0;
		let rafId: number;

		const handleScroll = () => {
			if (!section || !isInView) return;

			const rect = section.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Calculate how far the section is from the center of the viewport
			const sectionCenter = rect.top + rect.height / 2;
			const viewportCenter = windowHeight / 2;
			const distanceFromCenter = sectionCenter - viewportCenter;

			// Set target offset based on distance from center
			targetOffset = distanceFromCenter * speed;
		};

		const debouncedHandleScroll = debounce(handleScroll, 10);

		const animate = () => {
			// Smoothly interpolate between current and target offset
			currentOffset = lerp(currentOffset, targetOffset, 0.1);

			if (Math.abs(currentOffset - targetOffset) > 0.01) {
				setOffset(currentOffset);
			}

			rafId = requestAnimationFrame(animate);
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{
				rootMargin: "100px 0px",
				threshold: 0,
			},
		);

		if (section) {
			observer.observe(section);
		}

		window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
		rafId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("scroll", debouncedHandleScroll);
			cancelAnimationFrame(rafId);
			observer.disconnect();
		};
	}, [speed, isInView]);

	return (
		<div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
			<div
				style={{
					transform: `translateY(${offset}px)`,
					willChange: "transform",
				}}
			>
				{children}
			</div>
		</div>
	);
}

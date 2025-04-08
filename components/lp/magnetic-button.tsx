"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface MagneticButtonProps extends React.ComponentProps<typeof Button> {
	strength?: number;
}

export function MagneticButton({
	children,
	strength = 4,
	className = "",
	...props
}: MagneticButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!buttonRef.current) return;

		const rect = buttonRef.current.getBoundingClientRect();

		// Calculate the center of the button
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// Calculate the distance from the mouse to the center
		const distanceX = e.clientX - centerX;
		const distanceY = e.clientY - centerY;

		// Calculate the movement (stronger when closer to center)
		const x = (distanceX / (rect.width / 2)) * strength;
		const y = (distanceY / (rect.height / 2)) * strength;

		setPosition({ x, y });
	};

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 });
	};

	return (
		<Button
			ref={buttonRef}
			className={`transition-transform duration-200 ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
			}}
			{...props}
		>
			{children}
		</Button>
	);
}

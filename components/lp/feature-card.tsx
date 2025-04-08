"use client";

import type React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
	style?: React.CSSProperties;
}

export function FeatureCard({
	icon,
	title,
	description,
	className = "",
	style = {},
}: FeatureCardProps) {
	const [isVisible, setIsVisible] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{
				threshold: 0.1,
			},
		);

		if (cardRef.current) {
			observer.observe(cardRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<Card
			ref={cardRef}
			className={`overflow-hidden transition-all duration-700 ${
				isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
			} ${className}`}
			style={style}
		>
			<CardHeader className="pb-2">
				<div className="mb-2 text-[#2F3EFF]">{icon}</div>
				<CardTitle className="text-gray-900">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-gray-600">
					{description}
				</CardDescription>
			</CardContent>
		</Card>
	);
}

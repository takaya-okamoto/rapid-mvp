"use client";

import { type Variants, motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
	text: string;
	className?: string;
	delay?: number;
	duration?: number;
	once?: boolean;
}

export function AnimatedText({
	text,
	className = "",
	delay = 0,
	duration = 0.05,
	once = false,
}: AnimatedTextProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once });

	// テキストを単語に分割
	const words = text.split(" ");

	// アニメーションバリアント定義
	const container: Variants = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: duration, delayChildren: delay * i },
		}),
	};

	const child: Variants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			ref={ref}
			className={className}
			aria-label={text}
			variants={container}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
		>
			<span className="sr-only">{text}</span>
			{words.map((word) => (
				<motion.span key={word} className="inline-block mr-1" variants={child}>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
}

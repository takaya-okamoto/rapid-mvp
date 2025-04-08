"use client";

import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
	className?: string;
}

export function AnimatedGradientBackground({
	className = "",
}: AnimatedGradientBackgroundProps) {
	// グラデーションブロブ用のバリアント
	const blobVariants = {
		initial: { scale: 0.8, opacity: 0.5 },
		animate: {
			scale: [0.8, 1.2, 0.9, 1.1, 1],
			opacity: [0.5, 0.8, 0.6, 0.9, 0.7],
			transition: {
				duration: 8,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "reverse" as const,
				ease: "easeInOut",
			},
		},
	};

	// ブロブの位置とサイズのバリエーション
	const blobs = [
		{
			top: "10%",
			left: "15%",
			bg: "bg-[#2F3EFF]/15",
			size: "w-[600px] h-[600px]",
			delay: 0,
		},
		{
			top: "50%",
			left: "70%",
			bg: "bg-[#7A80FF]/10",
			size: "w-[500px] h-[500px]",
			delay: 1.5,
		},
		{
			top: "75%",
			left: "20%",
			bg: "bg-[#005792]/12",
			size: "w-[550px] h-[550px]",
			delay: 3,
		},
		{
			top: "30%",
			left: "40%",
			bg: "bg-[#505AFF]/8",
			size: "w-[650px] h-[650px]",
			delay: 2,
		},
		{
			top: "60%",
			left: "50%",
			bg: "bg-[#1446B4]/10",
			size: "w-[580px] h-[580px]",
			delay: 0.8,
		},
	];

	return (
		<div
			className={`fixed inset-0 -z-10 overflow-hidden bg-white ${className}`}
		>
			{blobs.map((blob) => (
				<motion.div
					key={blob.bg}
					className={`absolute rounded-full blur-3xl ${blob.bg} ${blob.size}`}
					style={{
						top: blob.top,
						left: blob.left,
						transform: "translate(-50%, -50%)",
					}}
					variants={blobVariants}
					initial="initial"
					animate="animate"
					transition={{
						delay: blob.delay,
					}}
				/>
			))}
		</div>
	);
}

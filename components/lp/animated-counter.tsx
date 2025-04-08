"use client";

import {
	motion,
	useInView,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
	end: number;
	duration?: number;
	className?: string;
	prefix?: string;
	suffix?: string;
}

export function AnimatedCounter({
	end,
	duration = 2,
	className = "",
	prefix = "",
	suffix = "",
}: AnimatedCounterProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	// モーション値を作成
	const count = useMotionValue(0);

	// 表示用のモーション値を変換
	const rounded = useTransform(count, (latest) => Math.round(latest));

	// スプリングアニメーションを適用
	const springCount = useSpring(rounded, {
		stiffness: 100,
		damping: 30,
		duration: duration * 1000,
	});

	// 表示用に整形
	const displayCount = useTransform(springCount, (latest) => {
		return Math.floor(latest).toLocaleString();
	});

	// isInViewの変更を監視してアニメーションを開始
	useEffect(() => {
		if (isInView) {
			count.set(0); // 一度0に設定してからアニメーション開始
			setTimeout(() => {
				count.set(end);
			}, 10);
		}
	}, [isInView, count, end]);

	return (
		<motion.div ref={ref} className={className}>
			{prefix}
			<motion.span>{displayCount}</motion.span>
			{suffix}
		</motion.div>
	);
}

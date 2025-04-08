import { type MotionValue, useSpring, useTransform } from "framer-motion";

export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			func(...args);
		};

		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(later, wait);
	};
}

// framer-motionを使用した補間関数
export function useLerp(
	inputValue: MotionValue<number>,
	outputRange: [number, number],
	options = { stiffness: 100, damping: 20 },
) {
	// inputValueの範囲を0-1と仮定し、outputRangeに変換
	const output = useTransform(inputValue, [0, 1], outputRange);

	// スプリングアニメーションを適用
	return useSpring(output, options);
}

// 通常のlerp関数も残しておく（単純な計算用）
export function lerp(start: number, end: number, t: number): number {
	return start * (1 - t) + end * t;
}

"use client";

import { AnimatedText } from "@/components/lp/animated-text";
import { MagneticButton } from "@/components/lp/magnetic-button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
export function CTASection() {
	const router = useRouter();
	const ctaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ctaRef.current) return;

		const currentRef = ctaRef.current;

		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			const rect = currentRef.getBoundingClientRect();
			const { left, top, width, height } = rect;

			const x = (clientX - left) / width;
			const y = (clientY - top) / height;

			// Update the gradient position based on mouse movement
			currentRef.style.setProperty("--x", `${x * 100}%`);
			currentRef.style.setProperty("--y", `${y * 100}%`);
		};

		currentRef.addEventListener("mousemove", handleMouseMove);

		return () => {
			currentRef.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<section className="py-24">
			<div className="container mx-auto px-4">
				<div
					ref={ctaRef}
					className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#005792] to-[#2F3EFF] p-8 md:p-12 light-effect"
					style={{
						backgroundImage:
							"radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
						transition: "background-position 0.3s ease",
					}}
				>
					<div className="relative z-10 mx-auto max-w-3xl text-center text-gray-900">
						<AnimatedText
							text="Ready to Validate Your Business Idea?"
							className="text-3xl font-bold tracking-tight sm:text-4xl"
							delay={0.1}
							duration={0.05}
						/>
						<AnimatedText
							text="Join thousands of entrepreneurs who have successfully validated their ideas with RapidMVP."
							className="mt-4 text-lg text-gray-900"
							delay={0.4}
							duration={0.02}
						/>

						<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<MagneticButton
								size="lg"
								className="bg-white text-[#2F3EFF] hover:bg-white/90 gap-2 shadow-lg"
								strength={30}
								onClick={() => router.push("/dashboard")}
							>
								Get Started <ArrowRight className="h-4 w-4" />
							</MagneticButton>
						</div>
					</div>

					{/* Decorative elements - 新しいカラーパレット */}
					<div className="absolute top-0 left-0 h-full w-full bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat opacity-3" />
					<div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#7A80FF]/20 blur-3xl" />
					<div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#7A80FF]/20 blur-3xl" />

					{/* キラキラエフェクト */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
						<div className="shimmer w-full h-20 absolute top-1/3 opacity-20" />
						<div
							className="shimmer w-full h-10 absolute top-2/3 opacity-10"
							style={{ animationDelay: "1s" }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

"use client";

import { AnimatedText } from "@/components/lp/animated-text";
import { MagneticButton } from "@/components/lp/magnetic-button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection() {
	const router = useRouter();

	return (
		<section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-5">
			<div className="container relative z-10 mx-auto px-4 py-10 text-center transition-transform duration-200 ease-out">
				<div className="mx-auto ">
					<div className="mb-6 flex justify-center">
						<div className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#2F3EFF] shadow-lg">
							<Sparkles className="mr-2 h-4 w-4" />
							<span>Validate ideas faster than ever before</span>
						</div>
					</div>

					<AnimatedText
						text="Turn Your Ideas Into Reality"
						className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
						delay={0.2}
						duration={0.03}
						once
					/>

					<AnimatedText
						text="RapidMVP helps entrepreneurs validate business concepts through structured testing and actionable feedback."
						className="mt-6 text-xl text-gray-700"
						delay={0.8}
						duration={0.01}
						once
					/>

					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<MagneticButton
							size="lg"
							className="bg-[#2F3EFF] text-white hover:bg-[#2F3EFF]/90 gap-2 shadow-lg"
							strength={30}
							onClick={() => router.push("/dashboard")}
						>
							Get Started <ArrowRight className="h-4 w-4" />
						</MagneticButton>
					</div>

					<div className="mt-16 grid grid-cols-2 gap-8 text-gray-800 md:grid-cols-4">
						{[
							{ value: "3k+", label: "Entrepreneurs" },
							{ value: "10k+", label: "Ideas Validated" },
							{ value: "87%", label: "Success Rate" },
							{ value: "24h", label: "Avg. Validation Time" },
						].map((stat) => (
							<div
								key={stat.value}
								className="flex flex-col items-center justify-center"
							>
								<span className="text-3xl font-bold text-[#005792]">
									{stat.value}
								</span>
								<span className="text-sm text-gray-500">{stat.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Decorative elements - 新しいカラーパレット */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
			<div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#7A80FF]/10 blur-3xl" />
			<div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#2F3EFF]/10 blur-3xl" />

			{/* 光の効果 - 新しいカラーパレット */}
			<div className="absolute top-1/4 right-1/4 h-40 w-40 rounded-full bg-[#7A80FF]/10 blur-3xl" />
			<div className="absolute bottom-1/3 left-1/3 h-32 w-32 rounded-full bg-[#2F3EFF]/10 blur-3xl" />
		</section>
	);
}

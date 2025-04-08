"use client";

import { AnimatedText } from "@/components/lp/animated-text";
import { FeatureCard } from "@/components/lp/feature-card";
import { ParallaxSection } from "@/components/lp/parallax-section";
import {
	BarChart,
	Lightbulb,
	Sparkles,
	Target,
	Users,
	Zap,
} from "lucide-react";

export function FeaturesSection() {
	const features = [
		{
			icon: <Lightbulb className="h-8 w-8" />,
			title: "Idea Validation",
			description:
				"Test your business concepts with real users before investing significant resources.",
		},
		{
			icon: <BarChart className="h-8 w-8" />,
			title: "Market Analysis",
			description:
				"Get AI-powered insights on market needs, existing solutions, and competitive landscape.",
		},
		{
			icon: <Zap className="h-8 w-8" />,
			title: "Rapid Prototyping",
			description:
				"Create functional MVPs in days, not months, with our guided templates and tools.",
		},
		{
			icon: <Users className="h-8 w-8" />,
			title: "User Feedback",
			description:
				"Collect and analyze customer feedback to refine your product and business model.",
		},
		{
			icon: <Target className="h-8 w-8" />,
			title: "Action Plans",
			description:
				"Get step-by-step guidance on how to validate and improve your business idea.",
		},
		{
			icon: <Sparkles className="h-8 w-8" />,
			title: "AI Recommendations",
			description:
				"Receive personalized suggestions based on your specific business idea and goals.",
		},
	];

	return (
		<section id="features" className="relative py-24 bg-white">
			<div className="container mx-auto px-4">
				<ParallaxSection speed={0.05}>
					<div className="text-center mb-16">
						<AnimatedText
							text="Powerful Features"
							className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
							delay={0.1}
							duration={0.05}
						/>
						<AnimatedText
							text="Everything you need to validate your business idea"
							className="mt-4 text-xl text-[#005792]"
							delay={0.3}
							duration={0.02}
						/>
					</div>
				</ParallaxSection>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<FeatureCard
							key={feature.title}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							className="h-full bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow"
							// Stagger the animation of cards
							style={{ transitionDelay: `${index * 0.1}s` }}
						/>
					))}
				</div>
			</div>

			{/* Decorative elements */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

			{/* 光の効果 - 新しいカラーパレット */}
			<div className="absolute top-1/4 right-10 h-40 w-40 rounded-full bg-[#7A80FF]/10 blur-3xl" />
			<div className="absolute bottom-1/4 left-10 h-32 w-32 rounded-full bg-[#2F3EFF]/10 blur-3xl" />
		</section>
	);
}

"use client";

import { AnimatedCounter } from "@/components/lp/animated-counter";
import { AnimatedText } from "@/components/lp/animated-text";
import { ParallaxSection } from "@/components/lp/parallax-section";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function HowItWorksSection() {
	const [activeTab, setActiveTab] = useState("step1");

	const steps = [
		{
			id: "step1",
			title: "Input Your Idea",
			description:
				"Describe your service concept, target customers, and the problem you're solving.",
			image: "/placeholder.svg?height=400&width=400",
			stats: [
				{ value: 5, suffix: " min", label: "Average Time" },
				{ value: 92, suffix: "%", label: "Completion Rate" },
			],
			features: [
				"Simple registration process",
				"Guided idea input form",
				"Store multiple business ideas",
			],
		},
		{
			id: "step2",
			title: "AI Analysis",
			description:
				"Our AI analyzes market needs, existing solutions, and competitive landscape.",
			image: "/placeholder.svg?height=400&width=400",
			stats: [
				{ value: 500, suffix: "+", label: "Data Sources" },
				{ value: 98, suffix: "%", label: "Accuracy Rate" },
			],
			features: [
				"Comprehensive market research",
				"Competitive analysis",
				"Customer pain point identification",
			],
		},
		{
			id: "step3",
			title: "Validation Plan",
			description:
				"Get a customized MVP testing plan with concrete steps to validate your idea.",
			image: "/placeholder.svg?height=400&width=400",
			stats: [
				{ value: 3, label: "Validation Methods" },
				{ value: 14, suffix: " days", label: "Avg. Validation Time" },
			],
			features: [
				"Personalized action steps",
				"Resource recommendations",
				"Timeline and milestones",
			],
		},
		{
			id: "step4",
			title: "Feedback Collection",
			description: "Gather and analyze customer feedback to refine your idea.",
			image: "/placeholder.svg?height=400&width=400",
			stats: [
				{ value: 25, suffix: "+", label: "Feedback Templates" },
				{ value: 87, suffix: "%", label: "Response Rate" },
			],
			features: [
				"Automated feedback collection",
				"AI-powered sentiment analysis",
				"Actionable insights",
			],
		},
	];

	return (
		<section
			id="how-it-works"
			className="relative py-24 bg-gradient-to-b from-white to-gray-50"
		>
			<div className="container mx-auto px-4">
				<ParallaxSection speed={0.05}>
					<div className="text-center mb-16">
						<AnimatedText
							text="How RapidMVP Works"
							className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
							delay={0.1}
							duration={0.05}
						/>
						<AnimatedText
							text="Our step-by-step process helps you validate your business ideas"
							className="mt-4 text-xl text-[#005792]"
							delay={0.3}
							duration={0.02}
						/>
					</div>
				</ParallaxSection>

				<Tabs
					defaultValue="step1"
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-gray-100">
						{steps.map((step) => (
							<TabsTrigger
								key={step.id}
								value={step.id}
								className="data-[state=active]:bg-[#2F3EFF] data-[state=active]:text-white"
							>
								{step.title}
							</TabsTrigger>
						))}
					</TabsList>

					{steps.map((step) => (
						<TabsContent key={step.id} value={step.id} className="mt-0">
							<div className="grid gap-8 md:grid-cols-2 items-center">
								<div className="order-2 md:order-1">
									<h3 className="text-2xl font-bold mb-4 text-gray-900">
										{step.title}
									</h3>
									<p className="text-gray-700 mb-6">{step.description}</p>

									<div className="grid grid-cols-2 gap-4 mb-8">
										{step.stats.map((stat) => (
											<Card key={stat.value} className="bg-gray-50 border-none">
												<CardContent className="p-4 text-center">
													<AnimatedCounter
														end={stat.value}
														suffix={stat.suffix || ""}
														className="text-3xl font-bold text-[#2F3EFF]"
													/>
													<p className="text-sm text-gray-600">{stat.label}</p>
												</CardContent>
											</Card>
										))}
									</div>

									<ul className="space-y-2">
										{step.features.map((feature) => (
											<li key={feature} className="flex items-center gap-2">
												<CheckCircle2 className="h-5 w-5 text-[#2F3EFF]" />
												<span className="text-gray-700">{feature}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="order-1 md:order-2 flex justify-center">
									<div className="relative">
										<div className="absolute -inset-4 rounded-full bg-[#7A80FF]/20 blur-xl" />
										<Image
											src={step.image || "/placeholder.svg"}
											alt={step.title}
											width={400}
											height={400}
											className="relative rounded-lg object-cover shadow-xl"
										/>
									</div>
								</div>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>

			{/* Decorative elements */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

			{/* 光の効果 - 新しいカラーパレット */}
			<div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-[#7A80FF]/10 blur-3xl" />
			<div className="absolute bottom-1/3 left-1/4 h-32 w-32 rounded-full bg-[#2F3EFF]/10 blur-3xl" />
		</section>
	);
}

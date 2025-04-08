import { AnimatedGradientBackground } from "@/components/lp/animated-gradient-background";
import { CTASection } from "@/components/lp/cta-section";
import { FeaturesSection } from "@/components/lp/features-section";
import { Footer } from "@/components/lp/footer";
import { HeroSection } from "@/components/lp/hero-section";
import { HowItWorksSection } from "@/components/lp/how-it-works-section";
import { Navbar } from "@/components/lp/navbar";

export default function Home() {
	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Animated gradient background */}
			<AnimatedGradientBackground />

			{/* Light overlay for better text readability - 透明度を下げて明るく */}
			<div className="absolute inset-0 bg-white/5 z-0" />

			<Navbar />
			<main>
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<CTASection />
			</main>
			<Footer />
		</div>
	);
}

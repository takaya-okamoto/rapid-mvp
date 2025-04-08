"use client";

import { MagneticButton } from "@/components/lp/magnetic-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrolled]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-white/90 backdrop-blur-md py-3 shadow-md"
					: "bg-transparent py-5"
			}`}
		>
			<div className="w-full flex items-center justify-between px-8">
				<Link href="/" className="flex items-center gap-2">
					<div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-[#2F3EFF] to-[#7A80FF]">
						<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
							R
						</div>
					</div>
					<span className={"text-xl font-bold transition-colors text-gray-900"}>
						RapidMVP
					</span>
				</Link>

				<nav className="hidden md:flex items-center gap-8">
					{["Features", "How It Works", "Pricing", "About"].map((item) => (
						<Link
							key={item}
							href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
							className={
								"text-sm font-medium transition-colors hover:text-[#2F3EFF] text-gray-700"
							}
						>
							{item}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						className={
							"hidden sm:inline-flex transition-colors text-gray-700 hover:bg-gray-100/80"
						}
						onClick={() => router.push("/dashboard")}
					>
						Log In
					</Button>
					<MagneticButton
						onClick={() => router.push("/dashboard")}
						className="bg-[#2F3EFF] hover:bg-[#2F3EFF]/90 text-white shadow-md"
					>
						Get Started
					</MagneticButton>
				</div>
			</div>
		</header>
	);
}

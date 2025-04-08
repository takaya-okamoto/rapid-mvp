import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-white border-t py-12">
			<div className="container mx-auto px-4">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<Link href="/" className="flex items-center gap-2">
							<div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-[#2F3EFF] to-[#7A80FF]">
								<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
									R
								</div>
							</div>
							<span className="text-xl font-bold text-gray-900">RapidMVP</span>
						</Link>
						<p className="mt-4 text-sm text-gray-600">
							Helping entrepreneurs validate business ideas through structured
							MVP testing and actionable feedback.
						</p>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-gray-900">Product</h3>
						<ul className="space-y-2">
							{[
								"Features",
								"How It Works",
								"Pricing",
								"Case Studies",
								"Testimonials",
							].map((item) => (
								<li key={item}>
									<Link
										href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
										className="text-sm text-gray-600 hover:text-[#2F3EFF] transition-colors"
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-gray-900">Resources</h3>
						<ul className="space-y-2">
							{["Blog", "Guides", "Help Center", "API", "Community"].map(
								(item) => (
									<li key={item}>
										<Link
											href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
											className="text-sm text-gray-600 hover:text-[#2F3EFF] transition-colors"
										>
											{item}
										</Link>
									</li>
								),
							)}
						</ul>
					</div>

					<div>
						<h3 className="font-medium mb-4 text-gray-900">Company</h3>
						<ul className="space-y-2">
							{["About", "Careers", "Contact", "Privacy", "Terms"].map(
								(item) => (
									<li key={item}>
										<Link
											href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
											className="text-sm text-gray-600 hover:text-[#2F3EFF] transition-colors"
										>
											{item}
										</Link>
									</li>
								),
							)}
						</ul>
					</div>
				</div>

				<div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-gray-500">
						© {new Date().getFullYear()} RapidMVP. All rights reserved.
					</p>
					<div className="flex gap-4 mt-4 md:mt-0">
						{["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social) => (
							<Link
								key={social}
								href="#"
								className="text-sm text-gray-500 hover:text-[#2F3EFF] transition-colors"
							>
								{social}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

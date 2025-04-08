import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Rapid MVP",
	description:
		"RapidMVP is an AI-powered platform designed for solopreneurs and digital entrepreneurs to swiftly transform their innovative ideas into market-ready prototypes. By automating the process from idea validation to MVP generation, RapidMVP eliminates the inefficiencies of fragmented traditional tools. This unified solution significantly reduces development time and accelerates market entry, ensuring that your groundbreaking ideas retain their competitive edge.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
				<GoogleAnalytics gaId="G-3EYJR7M5Z0" />
			</html>
		</ClerkProvider>
	);
}
